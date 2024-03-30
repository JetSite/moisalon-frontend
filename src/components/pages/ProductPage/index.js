import { useContext, useState, useEffect } from 'react'
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
import Stars from '../../ui/Stars'
import { addToCartB2cMutation } from '../../../_graphql-legacy/cart/addToB2cCart'
import { removeItemB2cMutation } from '../../../_graphql-legacy/cart/removeItemB2c'
import { PHOTO_URL } from '../../../variables'
import Rating from '../../ui/Rating'
import BackButton from '../../ui/BackButton'
import Reviews from '../../blocks/Reviews'
import { reviewsforProductB2c } from '../../../_graphql-legacy/reviewsforProductB2c'
import { createReviewMutation } from '../../../_graphql-legacy/createReviewMutation'
import { getCart } from '../../../_graphql-legacy/cart/getCart'
import Button from '../../ui/Button'
import { CityContext, MeContext, ProductsContext } from '../../../searchContext'
import Popup from '../../ui/Popup'
import { cyrToTranslit } from '../../../utils/translit'
import { Count } from '../../blocks/Reviews/styled'
import { pluralize } from '../../../utils/pluralize'
import FastBuyPopup from '../../ui/FastBuyPopup'
import { useSearchHistoryContext } from '../../../searchHistoryContext'

const ProductPage = ({ brand, product, dataReviews }) => {
  const [, setProductsState] = useContext(ProductsContext)
  const [reviews, setReviews] = useState(dataReviews)
  const [me] = useContext(MeContext)
  const [city] = useContext(CityContext)
  const [toggleCharacter, setToggleCharacter] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [openBuyPopup, setOpenBuyPopup] = useState(false)

  const b2bClient = !!me?.master?.id || !!me?.salons?.length

  const router = useRouter()

  const closePopup = () => {
    setOpenPopup(false)
  }

  const { setChosenItemId } = useSearchHistoryContext()

  useEffect(() => {
    setChosenItemId(product.id)
  }, [])

  const { refetch: refetchReviews } = useQuery(reviewsforProductB2c, {
    variables: { originId: product?.id },
    skip: true,
    onCompleted: res => {
      setReviews(res)
    },
  })

  const [reviewMutation] = useMutation(createReviewMutation, {
    onCompleted: () => {
      refetchReviews()
    },
  })

  const { data: dataCart, refetch: refetchCart } = useQuery(getCart, {
    onCompleted: res => {
      setProductsState(res?.getCartB2b?.contents || [])
    },
  })
  const cart = dataCart?.getCartB2b?.contents || []

  const [addToCart, { loading: addLoading }] = useMutation(
    addToCartB2cMutation,
    {
      onCompleted: () => {
        refetchCart()
      },
    },
  )

  const [removeItem, { loading: deleteLoading }] = useMutation(
    removeItemB2cMutation,
    {
      onCompleted: () => {
        refetchCart()
      },
    },
  )

  const add = (item, quantity) => {
    // if (!b2bClient) {
    //   setOpenPopup(true);
    //   return;
    // }
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: true,
        },
      },
    })
  }

  const deleteItem = item => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: true,
        },
      },
    })
  }

  const newItem = cart?.find(el => el?.product?.id === product.id)
    ? cart?.find(el => el?.product?.id === product.id)
    : { product: { ...product }, quantity: 0 }
  return (
    <MainContainer>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={product}
        brand={brand}
        me={me}
      />
      <Wrapper>
        <BackButton
          type={router?.query?.catalog ? 'Магазин' : 'Бренд'}
          name={product?.brand?.name}
          link={`/${cyrToTranslit(
            product?.brand?.addressFull?.city || city,
          )}/brand/${product?.brand?.seo?.slug || product?.brand?.id}/products`}
        />
        <Wrap>
          <Left>
            <ImageBrand>
              <Image
                alt="product"
                src={
                  newItem?.product?.photoIds[0]
                    ? ` ${PHOTO_URL}${newItem?.product?.photoIds[0]}/original`
                    : '/cosmetic_placeholder.jpg'
                }
              />
            </ImageBrand>
            <Rating>
              <Stars count={Math.round(product?.brand?.averageScore)} />
              <Count>{product?.brand?.numberScore || 0}</Count>
            </Rating>
          </Left>
          <Right>
            <Title>{newItem?.product?.title}</Title>
            {product?.brand?.dontShowPrice && !me?.info ? null : (
              <Price>{`${
                (newItem?.product?.currentAmount &&
                  newItem?.product?.currentAmount?.toLocaleString()) ||
                newItem?.product?.currentAmount?.toLocaleString()
              } ₽`}</Price>
            )}
            <AvailableQuantity
              isWrongQuantity={newItem?.quantity > product?.countAvailable}
            >
              {`${product?.countAvailable} ${pluralize(
                product?.countAvailable || 0,
                'упаковка',
                'упаковки',
                'упаковок',
              )} в наличии`}
            </AvailableQuantity>
            {product?.sku ? <Detail>Артикул: {product?.sku}</Detail> : null}
            {product?.material ? (
              <Detail>Материал: {product?.material}</Detail>
            ) : null}
            {product?.color ? <Detail>Цвет: {product?.color}</Detail> : null}
            {product?.size ? <Detail>Размер: {product?.size}</Detail> : null}
            {product?.quantityInPac ? (
              <Detail>Количество: {product?.quantityInPac}</Detail>
            ) : null}
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
                          add(newItem?.product, 1)
                        }
                      }}
                      disabled={product?.countAvailable === 0}
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
                          add(newItem?.product, 1)
                        }
                      }}
                      disabled={product?.countAvailable === 0}
                    >
                      Добавить в корзину
                    </Button>
                  </ButtonsWrapper>
                </MobileVisible>
              </>
            ) : (
              <WrapButton>
                <CustomButton
                  disabled={newItem?.quantity > product?.countAvailable}
                  onClick={() => router.push(`/cartB2b`)}
                >
                  <TopCustomButton>В корзине</TopCustomButton>
                  <BottomCustomButton>Перейти</BottomCustomButton>
                </CustomButton>
                <QuantityWrap>
                  <Minus onClick={() => deleteItem(newItem)} />
                  <Quantity
                    isWrongQuantity={
                      newItem?.quantity > product?.countAvailable
                    }
                  >{`${newItem?.quantity} шт.`}</Quantity>
                  <Plus
                    disabled={newItem?.quantity >= product?.countAvailable}
                    onClick={() => add(newItem?.product, 1)}
                  />
                </QuantityWrap>
              </WrapButton>
            )}
            <Description
              dangerouslySetInnerHTML={{
                __html: newItem?.product?.description || '',
              }}
            />
            {/* {newItem?.product?.node?.attributes?.nodes?.length ? (
              !toggleCharacter ? (
                <WrapCharacter>
                  <Character onClick={() => setToggleCharacter(true)}>
                    Характеристики
                  </Character>
                </WrapCharacter>
              ) : (
                <WrapCharacter>
                  <OpenCharacter onClick={() => setToggleCharacter(false)}>
                    Характеристики
                  </OpenCharacter>
                  {newItem?.product?.node?.attributes?.nodes?.length
                    ? newItem?.product?.node?.attributes?.nodes.map(
                        (item, key) => (
                          <Attributes key={key}>
                            <Name>{item?.name}</Name>
                            <Value>{item?.options[0] || ""}</Value>
                          </Attributes>
                        )
                      )
                    : null}
                </WrapCharacter>
              )
            ) : null} */}
          </Right>
        </Wrap>
        <Reviews
          type="PRODUCT"
          id={newItem?.product?.id}
          reviewMutation={reviewMutation}
          reviews={reviews?.reviewsForProduct || []}
          me={me}
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
