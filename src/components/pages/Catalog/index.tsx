import { FC, useState } from 'react'
import Product from './components/Product'
import { Wrapper, Title, Content, ButtonWrap } from './styled'
import { useMutation } from '@apollo/react-hooks'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { CREATE_CART } from 'src/api/graphql/cart/mutations/createCart'
import { UPDATE_CART } from 'src/api/graphql/cart/mutations/updateCart'
import { ICart } from 'src/types/product'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface ICatalogProps {
  products: any
  fetchMore: any
  hasNextPage: any
  loading: any
  user: any
  cart: ICart
  me: any
  noTitle: any
  refetchLoading: any
  catalog: any
  loadingCart: any
  refetchCart: any
  brand: any
}

const Catalog: FC<ICatalogProps> = ({
  products,
  fetchMore,
  hasNextPage,
  loading,
  user,
  me,
  noTitle,
  refetchLoading,
  catalog = false,
  loadingCart,
  refetchCart,
  brand,
}) => {
  const { cart } = useBaseStore(getStoreData)
  const { setCart } = useBaseStore(getStoreEvent)
  const [openPopup, setOpenPopup] = useState(false)

  console.log('cart', cart)

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
    // removeItem({
    //   variables: {
    //     input: {
    //       items: [{ key: item.key, quantity: item.quantity - 1 }],
    //       isB2b: true,
    //     },
    //   },
    // })
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
                loading={createCartLoading || updateCartLoading}
                deleteFromCart={deleteFromCart}
                me={me}
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
