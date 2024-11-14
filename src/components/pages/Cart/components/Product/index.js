import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'
import parseToFloat from '../../../../../utils/parseToFloat'
import { Checkbox } from '@material-ui/core'
import { BpCheckedIcon, BpIcon } from '../..'
import { makeStyles } from '@material-ui/core/styles'
import { addToCartMutation } from '../../../../../_graphql-legacy/cart/addToCart'
import {
  laptopBreakpoint,
  mobileBreakpoint,
  red,
} from '../../../../../styles/variables'
import { brandSearchQuery } from '../../../../../_graphql-legacy/search/brandSearch'
import { addToCartB2cMutation } from '../../../../../_graphql-legacy/cart/addToB2cCart'
import { PHOTO_URL } from '../../../../../api/variables'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { pluralize } from '../../../../../utils/pluralize'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'
import { UPDATE_CART } from 'src/api/graphql/cart/mutations/updateCart'
import useBaseStore from 'src/store/baseStore'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const useStyles = makeStyles({
  root: {
    width: '20px',
    height: '20px',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
})

const Wrapper = styled.div`
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 20px;
  margin-bottom: 45px;
`

const Top = styled.div`
  display: flex;
  justify-content: flex-start;
`

const ImagePlaceholder = styled.div`
  border: 1px solid #ededed;
  border-radius: 5px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  margin-right: 28px;
  flex-shrink: 0;
  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`

const Name = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 7px;
`

const Description = styled.div`
  font-size: 10px;
  line-height: 16px;
  margin-bottom: 7px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Price = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #f03;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const QuantityWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${mobileBreakpoint}) {
    margin: 0 auto;
    margin-left: 86px;
  }
`

const Minus = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  flex-shrink: 0;
  cursor: pointer;
  background: #f0f0f0 url('/icon-minus.svg') no-repeat center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ff0033 url('/icon-minus-white.svg') no-repeat center;
  }
`

const Plus = styled(Minus)`
  background: #f0f0f0 url('/icon-plus.svg') no-repeat center;
  background-size: 13px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background: #ff0033 url('/icon-plus-white.svg') no-repeat center;
    background-size: 13px;
  }
`

const Quantity = styled.p`
  font-size: 10px;
  line-height: 16px;
  width: 60px;
  text-align: center;
  color: ${({ isWrongQuantity }) => (isWrongQuantity ? red : '#000')};

  @media (max-width: ${laptopBreakpoint}) {
    width: 40px;
  }
`

const AvailableQuantity = styled.p`
  color: ${({ isWrongQuantity }) => (isWrongQuantity ? red : '#000')};
  font-size: 12px;
  line-height: 16px;

  @media (max-width: ${mobileBreakpoint}) {
    margin: 7px 0 2px 0;
  }
`

const PriceQuantityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Product = ({
  item,
  checkedProducts,
  setCheckedProducts,
  setProductBrands,
  productBrands,
  cart,
}) => {
  const classes = useStyles()
  const { setCart } = useBaseStore(getStoreEvent)

  const { data: dataBrand } = useQuery(getBrand, {
    variables: {
      id: item?.product?.brand?.id,
    },
  })

  const [checked, setChecked] = useState(false)
  const { city } = useAuthStore(getStoreData)

  useEffect(() => {
    if (dataBrand && checked) {
      if (
        !productBrands.find(item => item?.id === dataBrand?.brand?.data?.id)
      ) {
        setProductBrands([...productBrands, dataBrand?.brand?.data])
      }
    }
  }, [dataBrand, cart, checked])

  useEffect(() => {
    if (checkedProducts?.find(el => el.product.id === item.product.id)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [checkedProducts])

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
    updateCart({
      variables: {
        data: {
          cartContent: cart?.cartContent?.map(el => {
            if (el?.product?.id === item.product.id) {
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

  const handleChecked = () => {
    if (checkedProducts?.find(el => el.product.id === item.product.id)) {
      setCheckedProducts(
        checkedProducts.filter(el => el.product.id !== item.product.id),
      )
    } else {
      setCheckedProducts([...checkedProducts, item])
    }
  }

  return (
    <Wrapper>
      <Top>
        <Link href={`/${city.slug}/product/${item?.product?.id}`}>
          <ImagePlaceholder>
            <img
              src={
                item?.product?.cover?.url
                  ? ` ${PHOTO_URL}${item.product.cover.url}`
                  : '/cosmetic_placeholder.jpg'
              }
              alt="logo"
            />
          </ImagePlaceholder>
        </Link>
        <Info>
          <Name>{item?.product?.name}</Name>
          <Description
            dangerouslySetInnerHTML={{
              __html: item?.product?.shortDescription || '',
            }}
          />
          <PriceQuantityWrapper>
            <Price>
              {(item?.product?.salePrice &&
                item?.product?.salePrice.toLocaleString()) ||
                item?.product?.regularPrice.toLocaleString()}{' '}
              ₽
            </Price>
            <AvailableQuantity
              isWrongQuantity={item?.quantity > item?.product?.availableInStock}
            >
              {`${item?.product?.availableInStock} ${pluralize(
                item?.product?.availableInStock || 0,
                'упаковка',
                'упаковки',
                'упаковок',
              )} в наличии`}
            </AvailableQuantity>
          </PriceQuantityWrapper>
        </Info>
      </Top>
      <Controls>
        <Checkbox
          className={classes.root}
          icon={<BpIcon />}
          checkedIcon={<BpCheckedIcon />}
          checked={checked}
          onClick={() => handleChecked()}
        />
        <QuantityWrap>
          <Minus onClick={() => deleteFromCart(item)} />
          <Quantity
            isWrongQuantity={item?.quantity > item?.product?.availableInStock}
          >{`${item?.quantity} шт.`}</Quantity>
          <Plus
            disabled={item?.quantity >= item?.product?.availableInStock}
            onClick={() => addToCart(item, 1)}
          />
        </QuantityWrap>
      </Controls>
    </Wrapper>
  )
}

export default Product
