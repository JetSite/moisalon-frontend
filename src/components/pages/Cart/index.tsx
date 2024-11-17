import { useState, useEffect, FC } from 'react'
import {
  Wrapper,
  Title,
  ProductsWrap,
  Content,
  CheckAndDelete,
  Delete,
  Wrap,
  NoItemsText,
  NoItemsTextRed,
} from './styled'
import { makeStyles } from '@material-ui/core/styles'
import Product from './components/Product'
import BackButton from '../../ui/BackButton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { countProduct } from './utils'
import CheckboxStyled from 'src/components/newUI/Inputs/Checkbox'
import { ICart, IProduct } from 'src/types/product'
import { useCartManager } from './utils/useCartManager'
import { CartManager } from './components/CartManager'
import Popup from 'src/components/ui/Popup'
import Button from 'src/components/newUI/buttons/Button'

export interface ICartProps {
  data: ICart
}

const Cart: FC<ICartProps> = ({ data }) => {
  const { user, city } = useAuthStore(getStoreData)
  const {
    cart,
    brands,
    selectedPropucts,
    setSelectedPropucts,
    underMinOrderBrands,
    handleMutate,
    quantityMap,
    loading,
    handleDeleteChecked,
  } = useCartManager({ data, user })
  const [checkAll, setCheckAll] = useState(true)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    if (selectedPropucts?.length === cart?.cartContent?.length) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [selectedPropucts, cart])

  const handleCheckAll = () => {
    if (checkAll) {
      setSelectedPropucts([])
    } else {
      setSelectedPropucts(cart?.cartContent || [])
    }
  }

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

  console.log('underMinOrderBrands', underMinOrderBrands)

  return (
    <Wrapper>
      <BackButton
        type="Вернуться к покупкам"
        onlyType
        link={`/${city.slug}/beautyFreeShop`}
      />
      {!cart?.cartContent?.length ? (
        <>
          <NoItemsText>Ваша корзина пуста, наполните её товарами.</NoItemsText>
          <NoItemsTextRed href={`/${city.slug}/beautyFreeShop`}>
            Перейти в магазин.
          </NoItemsTextRed>
        </>
      ) : (
        <>
          <Title>Корзина ({countProduct(cart?.cartContent)})</Title>
          <Wrap>
            <ProductsWrap>
              <CheckAndDelete>
                <CheckboxStyled
                  id="checkAll"
                  label="Выбрать все"
                  checked={checkAll}
                  onClick={() => {
                    handleCheckAll()
                  }}
                />
                {selectedPropucts?.length ? (
                  <Delete onClick={() => setOpenPopup(true)}>
                    Удалить выбранные
                  </Delete>
                ) : null}
              </CheckAndDelete>
              <Content>
                {cart?.cartContent?.map(item => {
                  return (
                    <Product
                      quantity={quantityMap[item.product.id] ?? item.quantity}
                      user={user}
                      addToCart={addToCart}
                      loadingItems={loading}
                      deleteFromCart={deleteFromCart}
                      cartItem={item}
                      item={item.product}
                      key={item.id}
                      selectedPropucts={selectedPropucts}
                      setSelectedPropucts={setSelectedPropucts}
                      city={city}
                    />
                  )
                })}
              </Content>
            </ProductsWrap>
            <CartManager
              underMinOrderBrands={underMinOrderBrands}
              isLogin={!!user?.info}
              brands={brands}
              selectedPropucts={selectedPropucts}
            />
          </Wrap>
        </>
      )}
      <Popup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
        title="Вы собираетесь удалить выбранные товары из карзины"
      >
        <Button
          style={{ marginTop: 20 }}
          onClick={() => setOpenPopup(false)}
          variant="red"
        >
          Закрыть
        </Button>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => {
            handleDeleteChecked()
            setOpenPopup(false)
          }}
          variant="gray"
        >
          Удалить выбраное
        </Button>
      </Popup>
    </Wrapper>
  )
}

export default Cart
