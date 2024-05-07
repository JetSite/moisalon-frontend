import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parseToFloat from '../../../../../utils/parseToFloat'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../utils/favoritesInStorage'
import { laptopBreakpoint, red } from '../../../../../styles/variables'
import { Skeleton } from '@material-ui/lab'
import { PHOTO_URL } from '../../../../../api/variables'
import { cyrToTranslit } from '../../../../../utils/translit'
import FastBuyPopup from '../../../../ui/FastBuyPopup'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Wrapper = styled.div`
  width: 175px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  border: 1px solid #ededed;
  border-radius: 5px;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;

  flex: 0 0 175px;

  &:last-child {
    flex: 0 0 175px;
  }

  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

const SkeletonItem = styled(Skeleton)`
  width: 175px;
  height: 365px;
`

const SkeletonBottom = styled(Skeleton)`
  width: 100%;
  height: 35px;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  position: relative;
  z-index: 2;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Favorite = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  cursor: pointer;
  right: 15px;
  top: -10px;
`

const Content = styled.div`
  padding: 10px 10px 20px 10px;
  background: #ffffff;
  border-top: none;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

const Name = styled.p`
  max-width: 211px;
  height: 80px;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

const OldPrice = styled.p`
  color: #a1a1a1;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    background: #a1a1a1;
    height: 1px;
    width: 100%;
    top: 7px;
    left: 0;
  }
`

const NewPrice = styled.p`
  margin: 10px 0;
  margin-right: 5px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    line-height: 16px;
  }
`

const ButtonCart = styled.button`
  width: 48%;
  max-width: 247px;
  font-size: 10px;
  font-weight: 500;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
  transition: 0.3s;
  position: relative;
  color: white;
  border: 1px solid #f03;
  border-radius: 50px;
  padding: 8px 0px;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  background-color: ${({ disabled }) => (disabled ? 'gray' : '#f03')};
  border-color: ${({ disabled }) => (disabled ? 'gray' : '#f03')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 9px;
  }
`

const QuantityWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 66.3%;
  max-width: 116px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 86.3%;
  }
`

const Quantity = styled.p`
  font-size: 10px;
  line-height: 16px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Available = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  padding-left: 7px;
  color: ${red};
  font-size: 13px;
  font-weight: 600;
  position: relative;

  &:before {
    content: '';
    width: 5px;
    height: 5px;
    background-color: ${red};
    border-radius: 100%;
    position: absolute;
    top: 6px;
    left: 0;
  }

  @media (max-width: ${laptopBreakpoint}) {
    &:before {
      width: 4px;
      height: 4px;
      top: 5px;
    }
  }
`

const Description = styled.p`
  max-height: 64px;
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
`

const ProductDetails = styled.div`
  height: 58px;
`

const Detail = styled.p`
  margin-bottom: 3px;
  font-size: 10px;
  color: #c6c6c6;
`

const QuantityInPack = styled.p`
  margin-bottom: 10px;
  height: 16px;
  font-size: 14px;
  color: #c6c6c6;
  text-transform: uppercase;
  text-align: center;
`

const Product = ({
  item,
  cart,
  me,
  add,
  deleteItem,
  deleteLoading,
  addLoading,
  catalog,
  loading = false,
  loadingCart,
  brand,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  const [openBuyPopup, setOpenBuyPopup] = useState(false)

  const newItem = cart?.find(el => el?.product?.id === item.id)
    ? cart?.find(el => el?.product?.id === item.id)
    : { product: { ...item }, quantity: 0 }

  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('products', {
      ...item,
      dontShowPrice: brand?.dontShowPrice,
    })
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('products', {
      ...item,
      dontShowPrice: item?.brand?.dontShowPrice,
    })
    setIsFavorit(!isFavorite)
  }

  const productImage = newItem.product?.productCover?.url
    ? `${PHOTO_URL}${newItem.product.productCover.url}`
    : ''

  return loading ? (
    <SkeletonItem variant="rectangular" />
  ) : (
    <>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={newItem?.product}
        me={me}
      />
      <Link
        href={{
          pathname: `/${cyrToTranslit(city)}/product/${newItem?.product?.id}`,
          query: {
            catalog,
          },
        }}
      >
        <Wrapper id={item.id}>
          <ImageWrapper>
            <Image
              alt="image"
              src={!!productImage ? productImage : '/cosmetic_placeholder.jpg'}
            />
            <Favorite
              isFavorite={isFavorite}
              onClick={e => addFavorite(e, item)}
            >
              <HeartFullFill fill={isFavorite} />
            </Favorite>
          </ImageWrapper>
          <Content>
            <Name>{newItem?.product?.productName}</Name>
            <Available>
              {newItem?.product?.productAvailableInStock > 0
                ? 'В наличии'
                : 'Нет в наличии'}
            </Available>
            <Description>
              {newItem?.product?.productShortDescription}
            </Description>
            <ProductDetails>
              {item?.sku ? <Detail>Артикул: {item?.productSKU}</Detail> : null}
              {/* {item?.material ? (
                <Detail>Материал: {item?.material}</Detail>
              ) : null} */}
              {/* {item?.color ? <Detail>Цвет: {item?.color}</Detail> : null}
              {item?.size ? <Detail>Размер: {item?.size}</Detail> : null} */}
            </ProductDetails>
            {newItem?.product?.brand?.dontShowPrice && !me?.info ? null : (
              <Price>
                <NewPrice>
                  {newItem?.product?.productSalePrice
                    ? `${
                        (newItem?.product?.productSalePrice &&
                          newItem?.product?.productSalePrice) ||
                        newItem?.product?.productSalePrice
                      } ₽`
                    : 'Цена по запросу'}{' '}
                </NewPrice>
                {newItem?.product?.productPrice !== 0 ? (
                  <OldPrice>
                    {`${
                      (newItem?.product?.productPrice &&
                        newItem?.product?.productPrice) ||
                      newItem?.product?.productPrice
                    } ₽`}
                  </OldPrice>
                ) : null}
              </Price>
            )}
            {/* {item?.quantityInPac ? (
              <QuantityInPack>{item?.quantityInPac}</QuantityInPack>
            ) : (
              <QuantityInPack></QuantityInPack>
            )} */}
            {loadingCart ? (
              <SkeletonBottom />
            ) : newItem?.quantity === 0 ? (
              <ButtonsWrapper>
                <ButtonCart
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setOpenBuyPopup(true)
                  }}
                  disabled={newItem?.product?.countAvailable === 0}
                >
                  Заказать
                </ButtonCart>
                <ButtonCart
                  disabled={newItem?.product?.countAvailable === 0}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (!me?.info) {
                      router.push(
                        {
                          pathname: '/login',
                          query: { error: 'notAuthorized' },
                        },
                        '/login',
                      )
                    } else {
                      !addLoading ? add(newItem?.product, 1) : {}
                    }
                  }}
                >
                  В корзину
                </ButtonCart>
              </ButtonsWrapper>
            ) : (
              <QuantityWrap>
                <Minus
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    !deleteLoading ? deleteItem(newItem) : {}
                  }}
                />
                <Quantity>{`${newItem?.quantity} шт.`}</Quantity>
                <Plus
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    !addLoading ? add(newItem?.product, 1) : {}
                  }}
                />
              </QuantityWrap>
            )}
          </Content>
        </Wrapper>
      </Link>
    </>
  )
}

export default Product
