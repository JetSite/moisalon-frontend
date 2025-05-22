import { FC, useState } from 'react'
import Product from './components/Product'
import { Wrapper, Title, Content } from './styled'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { ICart, IProduct, IProductCart } from 'src/types/product'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useMutationCart } from './utils/useMutationCart'
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
  const { handleMutate, quantityMap, errors, setErrors } = useMutationCart({
    cart,
    userID: user?.info.id || null,
  })

  const addToCart = (item: IProduct, mustGrow: boolean) => {
    handleMutate({
      itemID: item.id,
      mustGrow,
    })
  }

  const deleteFromCart = (item: IProduct) => {
    handleMutate({
      itemID: item.id,
      mustGrow: false,
    })
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
              ) || { product: { ...item }, quantity: 0, id: `temp_${item.id}` }

              return (
                <Product
                  quantity={quantityMap[item.id] ?? cartItem.quantity}
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
