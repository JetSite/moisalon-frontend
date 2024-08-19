import { useState, useEffect, FC } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from '../../../styles/common'
import {
  Wrapper,
  Wrap,
  Left,
  ImageBrand,
  Image,
  Right,
  Title,
  Price,
  WrapButton,
  CustomButton,
  TopCustomButton,
  BottomCustomButton,
  QuantityWrap,
  Minus,
  Plus,
  Quantity,
  Description,
  AvailableQuantity,
  ButtonsWrapper,
  Detail,
} from './styled'
import { PHOTO_URL } from '../../../api/variables'
import Reviews from '../../blocks/Reviews'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { pluralize } from '../../../utils/pluralize'
import FastBuyPopup from '../../ui/FastBuyPopup'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useBaseStore from 'src/store/baseStore'
import { IProduct } from 'src/types/product'
import { IReview } from 'src/types/reviews'
import { UPDATE_CART } from 'src/api/graphql/cart/mutations/updateCart'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { CREATE_CART } from 'src/api/graphql/cart/mutations/createCart'
import { ADD_REVIEW_PRODUCT } from 'src/api/graphql/product/mutations/addReviewProduct'
import { GET_PRODUCT_REVIEWS } from 'src/api/graphql/product/queries/getProductReviews'

interface IProductPageProps {
  product: IProduct
  reviews: IReview[]
}

const ProductPage: FC<IProductPageProps> = ({ product, reviews }) => {
  const { user } = useAuthStore(getStoreData)
  const { cart } = useBaseStore(getStoreData)
  const { setProducts: setProductsState, setCart } = useBaseStore(getStoreEvent)
  const [reviewsData, setReviewsData] = useState(reviews)
  const { city, me } = useAuthStore(getStoreData)
  const [toggleCharacter, setToggleCharacter] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [openBuyPopup, setOpenBuyPopup] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const closePopup = () => {
    setOpenPopup(false)
  }

  const { refetch: refetchReviews } = useQuery(GET_PRODUCT_REVIEWS, {
    variables: {
      filters: {
        product: {
          id: {
            eq: product.id,
          },
        },
      },
    },
  })

  const [reviewMutation] = useMutation(ADD_REVIEW_PRODUCT, {
    onCompleted: async () => {
      const res = await refetchReviews({
        filters: { product: { id: { eq: product.id } } },
      })
      if (res?.data?.reviews?.data) {
        setReviewsData(flattenStrapiResponse(res.data.reviews.data))
        setLoading(false)
      }
    },
  })

  const [createCart, { loading: createCartLoading }] = useMutation(
    CREATE_CART,
    {
      onCompleted: res => {
        if (res?.createCart?.data) {
          setCart(flattenStrapiResponse(res.createCart.data))
        }
      },
    },
  )

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
    if (!cart) {
      createCart({
        variables: {
          data: {
            user: user?.info?.id,
            cartContent: [{ product: item.id, quantity }],
          },
        },
      })
    } else {
      const itemInCart = cart?.cartContent?.find(
        el => el?.product?.id === item.id,
      )
      if (!itemInCart) {
        updateCart({
          variables: {
            data: {
              cartContent: [
                ...cart?.cartContent.map(el => ({
                  product: el?.product?.id,
                  quantity: el?.quantity,
                })),
                { product: item.id, quantity },
              ],
            },
            id: cart?.id,
          },
        })
      } else {
        updateCart({
          variables: {
            data: {
              cartContent: cart?.cartContent?.map(el => {
                if (el?.product?.id === item.id) {
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
    }
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

  const newItem = cart?.cartContent?.find(el => el?.product?.id === product.id)
    ? cart?.cartContent?.find(el => el?.product?.id === product.id)
    : { product: { ...product }, quantity: 0 }
  const productImage = newItem?.product?.cover?.url
    ? `${PHOTO_URL}${newItem.product.cover.url}`
    : ''

  return (
    <MainContainer>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={product}
        // brand={brand}
        me={me}
      />
      <Wrapper>
        {/* <BackButton
          type={router?.query?.catalog ? 'Магазин' : 'Бренд'}
          name={product?.brand?.name}
          link={`/${
            cyrToTranslit(product?.brand?.addressFull?.city) || city.slug
          }/brand/${product?.brand?.seo?.slug || product?.brand?.id}/products`}
        /> */}
        <Wrap>
          <Left>
            <ImageBrand>
              <Image
                alt="product"
                src={
                  !!productImage ? productImage : '/cosmetic_placeholder.jpg'
                }
              />
            </ImageBrand>
            {/* <Rating>
              <Stars count={Math.round(product?.brand?.averageScore)} />
              <Count>{product?.brand?.numberScore || 0}</Count>
            </Rating> */}
          </Left>
          <Right>
            <Title>{newItem?.product?.name}</Title>
            {product?.brand?.dontShowPrice ? null : (
              <Price>{`${(newItem?.product?.salePrice &&
                  newItem?.product?.salePrice?.toLocaleString()) ||
                newItem?.product?.regularPrice?.toLocaleString()
                } ₽`}</Price>
            )}
            <AvailableQuantity
              isWrongQuantity={
                newItem?.quantity &&
                newItem.quantity > product?.availableInStock
              }
            >
              {`${product?.availableInStock} ${pluralize(
                product?.availableInStock || 0,
                'упаковка',
                'упаковки',
                'упаковок',
              )} в наличии`}
            </AvailableQuantity>
            {product?.sku ? <Detail>Артикул: {product?.sku}</Detail> : null}
            {/* {product?.material ? (
              <Detail>Материал: {product?.material}</Detail>
            ) : null}
            {product?.color ? <Detail>Цвет: {product?.color}</Detail> : null}
            {product?.size ? <Detail>Размер: {product?.size}</Detail> : null}
            {product?.quantityInPac ? (
              <Detail>Количество: {product?.quantityInPac}</Detail>
            ) : null} */}
            {newItem?.quantity === 0 ? (
              <>
                <MobileHidden>
                  <ButtonsWrapper>
                    <Button
                      size="small"
                      variant="red"
                      font="medium"
                      mt="48"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenBuyPopup(true)
                      }}
                    >
                      Заказать в один клик
                    </Button>
                    <Button
                      size="small"
                      variant="red"
                      font="medium"
                      mt="48"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (me && !me?.info) {
                          router.push(
                            {
                              pathname: '/login',
                              query: { error: 'notAuthorized' },
                            },
                            '/login',
                          )
                        } else {
                          addToCart(newItem?.product, 1)
                        }
                      }}
                      disabled={product?.availableInStock === 0}
                    >
                      Добавить в корзину
                    </Button>
                  </ButtonsWrapper>
                </MobileHidden>
                <MobileVisible>
                  <ButtonsWrapper>
                    <Button
                      size="fullWidth"
                      variant="red"
                      font="popUp"
                      mt="37"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenBuyPopup(true)
                      }}
                    >
                      Заказать в один клик
                    </Button>
                    <Button
                      size="fullWidth"
                      variant="red"
                      font="popUp"
                      mt="17"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (me && !me?.info) {
                          router.push(
                            {
                              pathname: '/login',
                              query: { error: 'notAuthorized' },
                            },
                            '/login',
                          )
                        } else {
                          addToCart(newItem?.product, 1)
                        }
                      }}
                      disabled={product?.availableInStock === 0}
                    >
                      Добавить в корзину
                    </Button>
                  </ButtonsWrapper>
                </MobileVisible>
              </>
            ) : (
              <WrapButton>
                <CustomButton
                  disabled={
                    newItem?.quantity &&
                    newItem.quantity > product?.availableInStock
                  }
                  onClick={() => router.push(`/cart`)}
                >
                  <TopCustomButton>В корзине</TopCustomButton>
                  <BottomCustomButton>Перейти</BottomCustomButton>
                </CustomButton>
                <QuantityWrap>
                  <Minus onClick={() => deleteFromCart(newItem)} />
                  <Quantity
                    isWrongQuantity={
                      newItem?.quantity &&
                      newItem.quantity > product?.availableInStock
                    }
                  >{`${newItem?.quantity} шт.`}</Quantity>
                  <Plus
                    disabled={
                      newItem?.quantity &&
                      newItem.quantity > product?.availableInStock
                    }
                    onClick={() => addToCart(newItem?.product, 1)}
                  />
                </QuantityWrap>
              </WrapButton>
            )}
            <Description
              dangerouslySetInnerHTML={{
                __html: newItem?.product?.fullDescription || '',
              }}
            />
          </Right>
        </Wrap>
        <Reviews
          type="PRODUCT"
          id={newItem?.product?.id || ''}
          reviewMutation={reviewMutation}
          reviews={reviewsData || []}
          me={me}
          loading={loading}
          setLoading={setLoading}
        />
      </Wrapper>

      <Popup
        isOpen={openPopup}
        onClose={closePopup}
        title="Для заказа B2B товара, необходимо зарегистрировать профиль салона или мастера."
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </MainContainer>
  )
}

export default ProductPage
