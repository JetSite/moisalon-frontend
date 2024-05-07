import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'
import { Checkbox } from '@material-ui/core'
import { BpCheckedIcon, BpIcon } from '../..'
import { makeStyles } from '@material-ui/core/styles'
import { laptopBreakpoint } from '../../../../../styles/variables'
import { PHOTO_URL } from '../../../../../api/variables'
import { addToCartB2cMutation } from '../../../../../_graphql-legacy/cart/addToB2cCart'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { cyrToTranslit } from '../../../../../utils/translit'

const useStyles = makeStyles({
  root: {
    marginLeft: '-9px',
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

const Image = styled.div`
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
  margin-top: -58px;
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
  @media (max-width: ${laptopBreakpoint}) {
    width: 40px;
  }
`

const Product = ({
  item,
  checkedProducts,
  setCheckedProducts,
  removeItem,
  productBrands,
  refetchCart,
  cart,
}) => {
  const classes = useStyles()
  const { city } = useAuthStore(getStoreData)

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checkedProducts.find(el => el.key === item.key)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [checkedProducts])

  const [addToCart] = useMutation(addToCartB2cMutation, {
    onCompleted: () => {
      refetchCart()
    },
  })

  const add = (item, quantity) => {
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: false,
        },
      },
    })
  }

  const deleteItem = item => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: false,
        },
      },
    })
  }

  const handleChecked = () => {
    if (checkedProducts.find(el => el.key === item.key)) {
      setCheckedProducts(checkedProducts.filter(el => el.key !== item.key))
    } else {
      setCheckedProducts([...checkedProducts, item])
    }
  }

  return (
    <Wrapper>
      <Top>
        <Link
          href={{
            pathname: `/${cyrToTranslit(city)}/product/${item?.product?.id}`,
            query: {
              catalog: false,
            },
          }}
        >
          <Image>
            <img
              src={
                item?.product?.photoIds[0]
                  ? ` ${PHOTO_URL}${item?.product?.photoIds[0]}/original`
                  : '/cosmetic_placeholder.jpg'
              }
              alt="logo"
            />
          </Image>
        </Link>
        <Info>
          <Name>{item?.product?.title}</Name>
          <Description></Description>
          <Price>{`${item?.product?.currentAmount.toLocaleString()} ₽`}</Price>
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
          <Minus onClick={() => deleteItem(item)} />
          <Quantity>{`${item?.quantity} шт.`}</Quantity>
          <Plus onClick={() => add(item?.product, 1)} />
        </QuantityWrap>
      </Controls>
    </Wrapper>
  )
}

export default Product
