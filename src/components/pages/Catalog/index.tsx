import { FC, useState } from 'react'
import Product from './components/Product'
import { Wrapper, Title, Content, ButtonWrap } from './styled'
import { useMutation } from '@apollo/react-hooks'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { CREATE_CART } from 'src/api/graphql/cart/mutations/createCart'
import { UPDATE_CART } from 'src/api/graphql/cart/mutations/updateCart'
import { ICart, IProduct } from 'src/types/product'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IUser } from 'src/types/me'

interface ICatalogProps {
  products: IProduct[]
  loading: boolean
  user: IUser
  cart: ICart
  noTitle: boolean
  catalog: any
  refetchCart: any
  brand: any
}

const Catalog: FC<ICatalogProps> = ({
  products,
  loading,
  user,
  noTitle,
  catalog = false,
  brand,
}) => {
  const { cart } = useBaseStore(getStoreData)
  const { setCart } = useBaseStore(getStoreEvent)
  const [openPopup, setOpenPopup] = useState(false)

  const [createCart, { loading: createCartLoading }] = useMutation(
    CREATE_CART,
    {
      onCompleted: res => {
        if (res?.createCart?.data) {
          setCart(flattenStrapiResponse(res.createCart.data))
        }
      },
    },
  )

  const [updateCart, { loading: updateCartLoading }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: res => {
        if (res?.updateCart?.data) {
          setCart(flattenStrapiResponse(res.updateCart.data))
        }
      },
    },
  )

  const addToCart = (item, quantity) => {
    if (!cart) {
      createCart({
        variables: {
          data: {
            user: user?.info?.id,
            cartContent: [{ product: item.id, quantity }],
          },
        },
      })
    } else {
      const itemInCart = cart?.cartContent?.find(
        el => el?.product?.id === item.id,
      )
      if (!itemInCart) {
        updateCart({
          variables: {
            data: {
              cartContent: [
                ...cart?.cartContent.map(el => ({
                  product: el?.product?.id,
                  quantity: el?.quantity,
                })),
                { product: item.id, quantity },
              ],
            },
            id: cart?.id,
          },
        })
      } else {
        updateCart({
          variables: {
            data: {
              cartContent: cart?.cartContent?.map(el => {
                if (el?.product?.id === item.id) {
                  return {
                    product: el?.product?.id,
                    quantity: el?.quantity + quantity,
                  }
                }
                return {
                  product: el?.product?.id,
                  quantity: el?.quantity,
                }
              }),
            },
            id: cart?.id,
          },
        })
      }
    }
  }

  const deleteFromCart = item => {
    const itemInCart = cart?.cartContent?.find(
      el => el?.product?.id === item.product.id,
    )
    if (itemInCart?.quantity === 1) {
      updateCart({
        variables: {
          data: {
            cartContent: cart?.cartContent
              ?.filter(el => el?.product?.id !== item.product.id)
              .map(el => ({
                product: el?.product?.id,
                quantity: el?.quantity,
              })),
          },
          id: cart?.id,
        },
      })
    } else {
      updateCart({
        variables: {
          data: {
            cartContent: cart?.cartContent?.map(el => {
              if (el?.product?.id === item.product.id) {
                return {
                  product: el?.product?.id,
                  quantity: el?.quantity - 1,
                }
              }
              return {
                product: el?.product?.id,
                quantity: el?.quantity,
              }
            }),
          },
          id: cart?.id,
        },
      })
    }
  }

  const closePopup = () => {
    setOpenPopup(false)
  }

  return (
    <Wrapper id="catalog">
      <Title noTitle={noTitle}>Каталог товаров</Title>
      {products?.length ? (
        <>
          <Content>
            {products?.map(item => (
              <Product
                addToCart={addToCart}
                loadingItems={loading}
                loadingBottom={createCartLoading || updateCartLoading}
                deleteFromCart={deleteFromCart}
                cart={cart}
                item={item}
                catalog={catalog}
                key={item.id}
                brand={brand}
              />
            ))}
          </Content>
        </>
      ) : (
        <p>Товары не найдены</p>
      )}
      <Popup
        isOpen={openPopup}
        onClose={closePopup}
        title="Для заказа товара, необходимо зарегистрировать профиль салона или мастера"
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </Wrapper>
  )
}

export default Catalog
