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
import Product from './components/Product'
import GuestCartProduct from './components/GuestCartProduct'
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
import ErrorPopup from 'src/components/blocks/Form/Error'
import { useCartManager as useGlobalCartManager } from 'src/hooks/useCartManager'
import { IGuestCartItem, removeFromGuestCart } from 'src/utils/guestCart'
import useCartStore from 'src/store/cartStore'

export interface ICartProps {
  data: ICart | null
}

const Cart: FC<ICartProps> = ({ data }) => {
  const { user, city } = useAuthStore(getStoreData)
  const isLoggedIn = !!user?.info

  // Use global cart manager for guest cart functionality
  const { guestCart } = useGlobalCartManager({ user, cart: data })
  const { refreshGuestCart } = useCartStore()

  const {
    cart,
    brands,
    selectedProducts,
    setSelectedProducts,
    underMinOrderBrands,
    handleMutate,
    quantityMap,
    loading,
    handleDeleteChecked,
    errors,
    setErrors,
  } = useCartManager({ data, user })

  // Guest cart selection state
  const [selectedGuestItems, setSelectedGuestItems] = useState<
    IGuestCartItem[]
  >([])
  const [checkAll, setCheckAll] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)

  // Clear guest selection when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setSelectedGuestItems([])
    }
  }, [isLoggedIn])

  // Sync selectedGuestItems when guest cart items change (cleanup deleted items)
  useEffect(() => {
    if (!isLoggedIn && selectedGuestItems.length > 0) {
      const validSelectedItems = selectedGuestItems.filter(selectedItem =>
        guestCart?.items?.some(
          cartItem => cartItem.productId === selectedItem.productId,
        ),
      )
      if (validSelectedItems.length !== selectedGuestItems.length) {
        setSelectedGuestItems(validSelectedItems)
      }
    }
  }, [isLoggedIn, selectedGuestItems, guestCart?.items])

  // Determine if cart has items (either server cart or guest cart)
  const hasItems = isLoggedIn
    ? (cart?.cartContent?.length || 0) > 0
    : (guestCart?.items?.length || 0) > 0

  useEffect(() => {
    if (isLoggedIn) {
      if (
        selectedProducts?.length === cart?.cartContent?.length &&
        cart?.cartContent?.length > 0
      ) {
        setCheckAll(true)
      } else {
        setCheckAll(false)
      }
    } else {
      if (
        selectedGuestItems?.length === guestCart?.items?.length &&
        guestCart?.items?.length > 0
      ) {
        setCheckAll(true)
      } else {
        setCheckAll(false)
      }
    }
  }, [selectedProducts, cart, selectedGuestItems, guestCart, isLoggedIn])

  const handleCheckAll = () => {
    if (isLoggedIn) {
      if (checkAll) {
        setSelectedProducts([])
      } else {
        setSelectedProducts(cart?.cartContent || [])
      }
    } else {
      if (checkAll) {
        setSelectedGuestItems([])
      } else {
        setSelectedGuestItems(guestCart?.items || [])
      }
    }
  }

  const handleDeleteCheckedGuest = () => {
    // Completely remove selected items (not just decrease quantity)
    selectedGuestItems.forEach(item => {
      removeFromGuestCart(item.productId)
    })
    // Refresh the cart state
    refreshGuestCart()
    setSelectedGuestItems([])
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

  return (
    <Wrapper>
      <BackButton
        type="Вернуться к покупкам"
        onlyType
        link={`/${city.slug}/beautyFreeShop`}
      />
      {!hasItems ? (
        <>
          <NoItemsText>Ваша корзина пуста, наполните её товарами.</NoItemsText>
          <NoItemsTextRed href={`/${city.slug}/beautyFreeShop`}>
            Перейти в магазин.
          </NoItemsTextRed>
        </>
      ) : (
        <>
          <Title>
            Корзина (
            {isLoggedIn
              ? countProduct(cart?.cartContent || [])
              : guestCart?.items?.length || 0}
            )
          </Title>
          <Wrap>
            <ProductsWrap>
              {/* Show checkbox controls for both logged-in and guest users */}
              <CheckAndDelete>
                <CheckboxStyled
                  id="checkAll"
                  label="Выбрать все"
                  checked={checkAll}
                  onClick={() => {
                    handleCheckAll()
                  }}
                />
                {(
                  isLoggedIn
                    ? selectedProducts?.length
                    : selectedGuestItems?.length
                ) ? (
                  <Delete onClick={() => setOpenPopup(true)}>
                    Удалить выбранные
                  </Delete>
                ) : null}
              </CheckAndDelete>

              <Content>
                {isLoggedIn
                  ? // Render server cart for logged in users
                    cart?.cartContent?.map(item => {
                      return (
                        <Product
                          quantity={
                            quantityMap[item.product.id] ?? item.quantity
                          }
                          user={user}
                          addToCart={addToCart}
                          loadingItems={loading}
                          deleteFromCart={deleteFromCart}
                          cartItem={item}
                          item={item.product}
                          key={item.id}
                          selectedProducts={selectedProducts}
                          setSelectedProducts={setSelectedProducts}
                          city={city}
                        />
                      )
                    })
                  : // Render guest cart items with same layout
                    guestCart?.items?.map(item => (
                      <GuestCartProduct
                        key={item.productId}
                        item={item}
                        selectedItems={selectedGuestItems}
                        setSelectedItems={setSelectedGuestItems}
                      />
                    ))}
              </Content>
            </ProductsWrap>

            {/* Show CartManager for both logged-in and guest users */}
            <CartManager
              loading={loading}
              underMinOrderBrands={isLoggedIn ? underMinOrderBrands : []}
              isLogin={isLoggedIn}
              brands={isLoggedIn ? brands : []}
              selectedProducts={isLoggedIn ? selectedProducts : []}
              guestCart={!isLoggedIn ? guestCart : undefined}
            />
          </Wrap>
        </>
      )}
      <ErrorPopup errors={errors} setErrors={setErrors} />
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
            if (isLoggedIn) {
              handleDeleteChecked()
            } else {
              handleDeleteCheckedGuest()
            }
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
