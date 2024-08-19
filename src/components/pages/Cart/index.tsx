import { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import {
  Wrapper,
  Title,
  ProductsWrap,
  CheckAll,
  TextAll,
  Content,
  CheckAndDelete,
  Delete,
  OrderWrap,
  Total,
  TextSumm,
  TextTotal,
  Wrap,
  NoItemsText,
  NoItemsTextRed,
  TotalBrand,
  TextBrandTotal,
  TextBrandSumm,
} from './styled'
import { Checkbox, styled } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Product from './components/Product'
import { sendOrderBrandMutation } from '../../../_graphql-legacy/brand/sendOrderBrandMutation'
import Button from '../../ui/Button'
import parseToFloat from '../../../utils/parseToFloat'
import { removeItemB2cMutation } from '../../../_graphql-legacy/cart/removeItemB2c'
import CartOrder from './components/CartOrder'
import BackButton from '../../ui/BackButton'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import useBaseStore from 'src/store/baseStore'

const CountProduct = items => {
  if (items?.length) {
    let count = 0
    for (let i = 0; i < items?.length; i++) {
      count += items[i]?.quantity
    }
    return count
  }
  return 0
}

export const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: 23,
  height: 23,
  backgroundColor: '#E3E3E3',
  border: '1px solid #E3E3E3',
  '&:hover': { bgcolor: 'transparent' },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
}))

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#E3E3E3',
  border: '1px solid #E3E3E3',
  '&:before': {
    display: 'block',
    width: 23,
    height: 19,
    background: 'url(/icon-check.svg) no-repeat center',
    content: '""',
  },
})

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
})

const totalSumm = items => {
  if (!items?.length) {
    return 0
  } else {
    let count = 0
    for (let i = 0; i < items.length; i++) {
      count +=
        (items[i].product.salePrice || items[i].product.regularPrice) *
        items[i].quantity
    }
    return count
  }
}

const checkSumm = (brand, checkedProducts) => {
  if (
    checkedProducts?.find(
      el => el?.product?.brand?.name === brand?.attributes?.name,
    )
  ) {
    const summArr = checkedProducts?.filter(
      item => item?.product?.brand?.name === brand?.attributes?.name,
    )
    let summAll = 0
    summArr.forEach(el => (summAll += totalSumm([el])))
    return summAll < +brand?.attributes?.minimalOrderPrice
      ? brand.attributes.name
      : true
  }
  return true
}

const checkedProductBrands = (checkedArr, productArr) => {
  let newArr = []
  productArr.forEach(item => {
    if (
      checkedArr.find(
        el => el?.product?.brand?.name.trim() === item.attributes.name,
      )
    ) {
      newArr.push(item)
    }
  })
  return newArr
}

const Cart = ({ me }) => {
  const { cart } = useBaseStore(getStoreData)
  const [open, setOpen] = useState(false)
  const { city } = useAuthStore(getStoreData)
  const [checkMinimalSumm, setCheckMinimalSumm] = useState(false)
  const [productBrands, setProductBrands] = useState([])
  const [checkAll, setCheckAll] = useState(true)
  const [openOrder, setOpenOrder] = useState(false)
  const [checkedProducts, setCheckedProducts] = useState(cart?.cartContent)
  const [clickAddress, setClickAddress] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [errors, setErrors] = useState(null)
  const [isWrongQuantity, setIsWrongQuantity] = useState(false)
  const router = useRouter()

  const handleCloseOrder = useCallback(() => {
    setOpenOrder(false)
  }, [setOpenOrder])

  const handleCloseSuccess = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  useEffect(() => {
    setCheckMinimalSumm(
      checkedProductBrands(checkedProducts, productBrands)
        .map(item =>
          item?.attributes?.minimalOrderPrice
            ? checkSumm(item, checkedProducts, cart?.total)
            : true,
        )
        .filter(el => el !== true),
    )
  }, [checkedProducts, productBrands, cart])

  const [removeItem] = useMutation(removeItemB2cMutation, {
    onCompleted: () => {
      // refetchCart()
    },
  })

  const [sendOrder] = useMutation(sendOrderBrandMutation, {
    onCompleted: () => {
      setOpenOrder(false)
      setOpen(true)
      setProductBrands([])
    },
  })

  const classes = useStyles()

  const handleOrder = () => {
    setOpenOrder(true)
  }

  useEffect(() => {
    if (cart?.cartContent?.length) {
      setCheckedProducts(cart?.cartContent)
    }
  }, [cart?.cartContent])

  useEffect(() => {
    const isWrongQuantities = []
    cart?.cartContent?.map(product => {
      if (product.quantity > product.product.availableInStock) {
        isWrongQuantities.push(true)
      } else {
        isWrongQuantities.push(false)
      }
    })
    setIsWrongQuantity(isWrongQuantities.find(item => item))
  }, [cart])

  useEffect(() => {
    if (checkedProducts?.length === cart?.cartContent?.length) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [checkedProducts, cart])

  const handleCheckAll = () => {
    if (checkAll) {
      setCheckedProducts([])
    } else {
      setCheckedProducts(cart?.cartContent)
    }
  }

  const onSubmit = values => {
    if (!clickAddress || !values.address) {
      setErrors(['Выберите адрес из выпадающего списка'])
      setErrorPopupOpen(true)
      return
    }
    let newArray = []
    for (let i = 0; i < checkedProducts?.length; i++) {
      newArray.push({
        // brand: checkedProducts[i].brandId,
        id: checkedProducts[i].product.id,
        name: checkedProducts[i].product?.brand?.name || '',
        description: checkedProducts[i].product.description,
        count: checkedProducts[i].quantity,
        price: parseToFloat(
          checkedProducts[i].product.currentAmount.toString(),
        ),
      })
    }
    sendOrder({
      variables: {
        input: {
          payment: !!values.payment ? 0 : 1,
          address: values.address,
          comment: values.comment,
          product: [...newArray],
        },
      },
    })
  }

  console.log('cart', cart)

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
          <NoItemsTextRed
            onClick={() => router.push(`/${city.slug}/beautyFreeShop`)}
          >
            Перейти в магазин.
          </NoItemsTextRed>{' '}
        </>
      ) : (
        <>
          <Title>Корзина ({CountProduct(cart?.cartContent)})</Title>
          <Wrap>
            <ProductsWrap>
              <CheckAndDelete>
                <CheckAll onClick={() => handleCheckAll()}>
                  <Checkbox
                    className={classes.root}
                    icon={<BpIcon />}
                    checkedIcon={<BpCheckedIcon />}
                    checked={checkAll}
                  />
                  <TextAll>Выбрать все</TextAll>
                </CheckAll>
                {checkedProducts?.length ? (
                  <Delete onClick={() => handleDelete()}>
                    Удалить выбранные
                  </Delete>
                ) : null}
              </CheckAndDelete>
              <Content>
                {cart?.cartContent?.map(item => (
                  <Product
                    checkedProducts={checkedProducts}
                    key={item.key}
                    item={item}
                    setCheckedProducts={setCheckedProducts}
                    removeItem={removeItem}
                    productBrands={productBrands}
                    cart={cart}
                    setProductBrands={setProductBrands}
                  />
                ))}
              </Content>
            </ProductsWrap>
            <OrderWrap>
              <Total>
                <TextSumm>Сумма заказа:</TextSumm>
                <TextTotal>{`${totalSumm(
                  checkedProducts,
                ).toLocaleString()} ₽`}</TextTotal>
              </Total>
              {productBrands?.length
                ? checkedProductBrands(checkedProducts, productBrands).map(
                  item =>
                    item?.minimalOrderPrice &&
                      productBrands
                        .map(item =>
                          item?.minimalOrderPrice
                            ? checkSumm(item, checkedProducts, total)
                            : true,
                        )
                        .find(el => el === item.name) ? (
                      <TotalBrand key={item.id}>
                        <TextBrandSumm>
                          Минимальная сумма заказа бренда - {item.name}:
                        </TextBrandSumm>

                        <TextBrandTotal>{`${item.minimalOrderPrice} ₽`}</TextBrandTotal>
                      </TotalBrand>
                    ) : null,
                )
                : null}
              <Button
                size="fullWidth"
                variant="red"
                disabled={
                  !checkedProducts?.length ||
                  checkMinimalSumm?.length ||
                  isWrongQuantity
                }
                onClick={() => {
                  if (!me?.info) {
                    router.push('/login')
                  } else {
                    sessionStorage.setItem(
                      'cartChecked',
                      JSON.stringify({
                        items: [checkedProducts],
                        productBrands: [
                          checkedProductBrands(checkedProducts, productBrands),
                        ],
                      }),
                    )
                    router.push(`/order`)
                  }
                }}
              >
                Перейти к оформлению
              </Button>
            </OrderWrap>
          </Wrap>{' '}
        </>
      )}
      <CartOrder
        openOrder={openOrder}
        open={open}
        me={me}
        checkedProducts={checkedProducts}
        handleClose={handleCloseOrder}
        handleCloseSuccess={handleCloseSuccess}
        setClickAddress={setClickAddress}
        errors={errors}
        isErrorPopupOpen={isErrorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        onSubmit={onSubmit}
        removeItem={removeItem}
        setCheckedProducts={setCheckedProducts}
      />
    </Wrapper>
  )
}

export default Cart
