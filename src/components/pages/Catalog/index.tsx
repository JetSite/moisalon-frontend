import { FC, useState } from 'react'
import Product from './components/Product'
import { Wrapper, Title, Content } from './styled'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { ICart, IProduct, IProductCart } from 'src/types/product'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useCartManager } from 'src/hooks/useCartManager'
import ErrorPopup from 'src/components/blocks/Form/Error'

interface ICatalogProps {
  products: IProduct[]
  loading: boolean
  noTitle?: boolean
  cart: ICart | null
}

const Catalog: FC<ICatalogProps> = ({ products, loading, noTitle, cart }) => {
  const { user } = useAuthStore(getStoreData)
  const [openPopup, setOpenPopup] = useState(false)
  const {
    addToCart: cartAddToCart,
    removeFromCart,
    getItemQuantity,
    errors,
    setErrors,
  } = useCartManager({
    user,
    cart,
  })

  const addToCart = (item: IProduct, mustGrow: boolean) => {
    if (mustGrow) {
      cartAddToCart(item.id, 1, item)
    } else {
      removeFromCart(item.id)
    }
  }

  const deleteFromCart = (item: IProduct) => {
    removeFromCart(item.id)
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
            {products?.map(item => {
              const cartItem: IProductCart = cart?.cartContent?.find(
                el => el?.product?.id === item.id,
              ) || {
                product: { ...item },
                quantity: getItemQuantity(item.id),
                id: `temp_${item.id}`,
              }

              return (
                <Product
                  quantity={getItemQuantity(item.id)}
                  user={user}
                  addToCart={addToCart}
                  loadingItems={loading}
                  deleteFromCart={deleteFromCart}
                  cartItem={cartItem}
                  item={item}
                  key={item.id}
                />
              )
            })}
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
      <ErrorPopup errors={errors} setErrors={setErrors} />
    </Wrapper>
  )
}

export default Catalog
