import { FC, useState } from 'react'
import Product from './components/Product'
import { Wrapper, Title, Content } from './styled'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { IProduct } from 'src/types/product'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

import useAuthStore from 'src/store/authStore'
import { useMutationCart } from './utils/useMutationCart'

interface ICatalogProps {
  products: IProduct[]
  loading: boolean
  noTitle?: boolean
}

const Catalog: FC<ICatalogProps> = ({ products, loading, noTitle }) => {
  const { user } = useAuthStore(getStoreData)
  const { cart } = useBaseStore(getStoreData)
  const { setCart } = useBaseStore(getStoreEvent)
  const [openPopup, setOpenPopup] = useState(false)
  const { handleMutate, quantityMap } = useMutationCart({
    setCart,
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
              const cartItem = cart?.cartContent?.find(
                el => el?.product?.id === item.id,
              ) || { product: { ...item }, quantity: 0 }

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
    </Wrapper>
  )
}

export default Catalog
