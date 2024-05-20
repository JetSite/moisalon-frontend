import styled from 'styled-components'
import { lighten } from 'polished'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { laptopBreakpoint } from '../../../../../styles/variables'
import { Skeleton } from '@material-ui/lab'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { PHOTO_URL } from '../../../../../api/variables'

const Wrapper = styled.div`
  width: 175px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  border: 1px solid #ededed;
  border-radius: 5px;
  transition: box-shadow 0.3s ease-in-out;

  flex: 0 0 175px;

  &:last-child {
    flex: 0 0 175px;
  }

  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex: 0 0 135px;
    width: 135px;

    &:last-child {
      flex: 0 0 135px;
    }
  }
`

const SkeletonItem = styled(Skeleton)`
  width: 175px;
  height: 365px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 161px;
  }
`

const SkeletonBottom = styled(Skeleton)`
  width: 100%;
  height: 35px;
`

const TopGoodWrapper = styled.div`
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  justify-content: flex-end;
  @media (max-width: ${laptopBreakpoint}) {
    width: 129px;
    height: 129px;
  }
`

const Image = styled.img`
  height: 90%;
  object-fit: contain;
  width: 90%;
`

export const Favorite = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  background: ${({ isFavorite }) =>
      isFavorite ? 'url(/favorite-red-icon.svg)' : 'url(/favorit.svg)'}
    no-repeat center;
  cursor: pointer;
  right: 2px;
  top: 2px;
`

const BottomGoodWrapper = styled.div`
  padding: 22px 10px;
  background: #ffffff;
  border-top: none;
  border-radius: 5px;
  min-height: 186px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 170px;
  }
`

const Name = styled.p`
  max-width: 211px;
  max-height: 60px;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  text-align: center;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    max-height: 40px;
  }
`

const Price = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  position: relative;
  width: 100%;
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 25px;
`

const OldPrice = styled.p`
  color: #a1a1a1;
  position: absolute;
  font-weight: 600;
  font-size: 9px;
  line-height: 15px;
  right: 0;
  top: 2px;
  &:after {
    content: '';
    position: absolute;
    background: #a1a1a1;
    height: 2px;
    width: 100%;
    top: calc(50% - 0px);
    left: 0;
  }

  @media (max-width: ${laptopBreakpoint}) {
    right: -4px;
  }
`

const NewPrice = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #ff0033;
  font-weight: 600;
`

const ButtonCart = styled.button`
  width: 66.3%;
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
  background-color: #f03;
  border: 1px solid #f03;
  border-radius: 50px;
  padding: 8px 0px;
  margin: 0 19px;

  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
`

const QuantityWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 66.3%;
  max-width: 116px;
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

const ProductCard = ({ item, loading, add, deleteItem, loadingCart, cart }) => {
  const router = useRouter()
  const { city, me } = useAuthStore(getStoreData)

  const newItem = cart?.find(el => el?.product?.id === item.id)
    ? cart?.find(el => el?.product?.id === item.id)
    : { product: { ...item }, quantity: 0 }

  return loading ? (
    <SkeletonItem variant="rectangular" />
  ) : (
    <Link
      href={{
        pathname: `/${city.citySlug}/product/${newItem?.product?.id}`,
        query: {
          catalog: false,
        },
      }}
    >
      <Wrapper>
        <TopGoodWrapper>
          <Image
            alt="image"
            src={
              newItem?.product?.photoIds[0]
                ? ` ${PHOTO_URL}${newItem?.product?.photoIds[0]}/original`
                : '/cosmetic_placeholder.jpg'
            }
          />
        </TopGoodWrapper>
        <BottomGoodWrapper>
          <Wrap>
            <Name>{newItem?.product?.title}</Name>
            {newItem?.product?.brand?.dontShowPrice && !me?.info ? null : (
              <Price>
                <NewPrice>
                  {newItem?.product?.currentAmount
                    ? `${
                        (newItem?.product?.currentAmount &&
                          newItem?.product?.currentAmount.toLocaleString()) ||
                        newItem?.product?.currentAmount.toLocaleString()
                      } ₽`
                    : 'Цена по запросу'}{' '}
                </NewPrice>
                <OldPrice>
                  {newItem?.product?.amountSales !== 0 &&
                  newItem?.product?.amount !== 0
                    ? `${
                        (newItem?.product?.amount &&
                          newItem?.product?.amount.toLocaleString()) ||
                        newItem?.product?.amount.toLocaleString()
                      } ₽`
                    : null}
                </OldPrice>
              </Price>
            )}
          </Wrap>
          {loadingCart ? (
            <SkeletonBottom />
          ) : newItem?.quantity === 0 ? (
            <ButtonCart
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
                  !add(newItem?.product, 1)
                }
              }}
            >
              В корзину
            </ButtonCart>
          ) : (
            <QuantityWrap>
              <Minus
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  deleteItem(newItem)
                }}
              />
              <Quantity>{`${newItem?.quantity} шт.`}</Quantity>
              <Plus
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  add(newItem?.product, 1)
                }}
              />
            </QuantityWrap>
          )}
        </BottomGoodWrapper>
      </Wrapper>
    </Link>
  )
}

export default ProductCard
