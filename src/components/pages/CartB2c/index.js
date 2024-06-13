import { useState, useEffect } from 'react'
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
import { removeItemB2cMutation } from '../../../_graphql-legacy/cart/removeItemB2c'
import Button from '../../ui/Button'
import BackButton from '../../ui/BackButton'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

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
  backgroundColor: '#fff',
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
      count += items[i].product.currentAmount * items[i].quantity
    }
    return count
  }
}

const checkSumm = (brand, checkedProducts) => {
  if (
    checkedProducts.find(
      el => el?.product?.node?.productCategories?.nodes[0].name === brand?.name,
    )
  ) {
    const summArr = checkedProducts.filter(
      item =>
        item?.product?.node?.productCategories?.nodes[0].name === brand?.name,
    )
    let summAll = 0
    summArr.forEach(el => (summAll += totalSumm([el])))

    return summAll < +brand?.minimalOrderPrice ? brand.name : true
  }
  return true
}

const checkedProductBrands = (checkedArr, productArr) => {
  let newArr = []
  productArr.forEach(item => {
    if (checkedArr.find(el => el?.product?.brand?.name.trim() === item.name)) {
      newArr.push(item)
    }
  })
  return newArr
}

const Cart = ({ cart, me, refetchCart, total }) => {
  const [checkMinimalSumm, setCheckMinimalSumm] = useState(false)
  const [productBrands, setProductBrands] = useState([])
  const [checkAll, setCheckAll] = useState(true)
  const [checkedProducts, setCheckedProducts] = useState(cart)
  const router = useRouter()
  const b2bClient = !!me?.master?.id || !!me?.salons?.length
  const { city } = useAuthStore(getStoreData)

  useEffect(() => {
    let newArr = []
    checkedProducts?.forEach(item => {
      if (!newArr?.find(el => el.id === item?.product?.brand?.id)) {
        newArr?.push(item?.product?.brand)
      }
    })
    setProductBrands(newArr)
  }, [checkedProducts])

  useEffect(() => {
    setCheckMinimalSumm(
      checkedProductBrands(checkedProducts, productBrands)
        .map(item =>
          item?.minimalOrderPrice
            ? checkSumm(item, checkedProducts, total)
            : true,
        )
        .filter(el => el !== true),
    )
  }, [checkedProducts, productBrands, cart])

  const [removeItem] = useMutation(removeItemB2cMutation, {
    onCompleted: () => {
      refetchCart()
    },
  })

  const classes = useStyles()

  useEffect(() => {
    setCheckedProducts(
      cart.filter(item => {
        return checkedProducts.find(el => el.key === item.key)
      }),
    )
  }, [cart])

  useEffect(() => {
    if (checkedProducts.length === cart.length) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [checkedProducts])

  const handleCheckAll = () => {
    if (checkAll) {
      setCheckedProducts([])
    } else {
      setCheckedProducts(cart)
    }
  }

  const handleDelete = () => {
    const itemsDelete = checkedProducts.map(item => {
      return {
        key: item.key,
        quantity: 0,
      }
    })
    removeItem({
      variables: {
        input: {
          items: itemsDelete,
          clientMutationId: '',
          isB2b: false,
        },
      },
    })
    setCheckedProducts([])
    setProductBrands([])
  }

  return (
    <Wrapper>
      <BackButton
        type="Вернуться к покупкам"
        onlyType
        link={`/${city.slug}/beautyFreeShop`}
      />
      {!cart?.length ? (
        <>
          {' '}
          <NoItemsText>Ваша корзина пуста, наполните её товарами.</NoItemsText>
          <NoItemsTextRed
            onClick={() => router.push(`/${city.slug}/beautyFreeShop`)}
          >
            Перейти в магазин.
          </NoItemsTextRed>{' '}
        </>
      ) : (
        <>
          {' '}
          <Title>Корзина ({CountProduct(cart)})</Title>
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
                {cart?.map(item => (
                  <Product
                    checkedProducts={checkedProducts}
                    key={item.key}
                    item={item}
                    refetchCart={refetchCart}
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
                disabled={!checkedProducts.length || checkMinimalSumm?.length}
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
                    router.push('/orderB2c')
                  }
                }}
              >
                Перейти к оформлению
              </Button>
            </OrderWrap>
          </Wrap>{' '}
        </>
      )}
    </Wrapper>
  )
}

export default Cart
