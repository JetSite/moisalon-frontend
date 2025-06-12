import { useState, useEffect, FC } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { MainContainer } from '../../../styles/common'
import {
  Wrapper,
  Wrap,
  Left,
  ImageBrand,
  Image,
  Right,
  Title,
  Price,
  Description,
  AvailableQuantity,
  Detail,
  OldPrice,
} from './styled'
import { PHOTO_URL } from '../../../api/variables'
import Reviews from '../../blocks/Reviews'
import Button from '../../ui/Button'
import Popup from '../../ui/Popup'
import { pluralize } from '../../../utils/pluralize'
import FastBuyPopup from '../../ui/FastBuyPopup'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { ICart, IProduct, IProductCart } from 'src/types/product'
import { IReview } from 'src/types/reviews'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ADD_REVIEW_PRODUCT } from 'src/api/graphql/product/mutations/addReviewProduct'
import { GET_PRODUCT_REVIEWS } from 'src/api/graphql/product/queries/getProductReviews'
import EntityDescription from 'src/components/newUI/EntityDescription'
import Slider from 'src/components/blocks/Slider'
import { useCartManager } from 'src/hooks/useCartManager'
import { QuantityControls } from '../Catalog/components/Product/conponents/QuantityControls'
import BackButton from 'src/components/ui/BackButton'

export interface IProductPageProps {
  product: IProduct
  reviews: IReview[]
  cart: ICart | null
}

const ProductPage: FC<IProductPageProps> = ({ product, reviews, cart }) => {
  const { user } = useAuthStore(getStoreData)
  const [reviewsData, setReviewsData] = useState(reviews)
  const { city } = useAuthStore(getStoreData)
  const [openPopup, setOpenPopup] = useState(false)
  const [openBuyPopup, setOpenBuyPopup] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    addToCart: cartAddToCart,
    removeFromCart,
    getItemQuantity,
  } = useCartManager({
    user,
    cart,
  })

  const [cartItem, setCartItem] = useState<IProductCart>(
    cart?.cartContent?.find(el => el?.product?.id === product.id) || {
      product: { ...product },
      quantity: 0,
      id: `temp_${product.id}`,
    },
  )

  useEffect(() => {
    setCartItem(
      cart?.cartContent?.find(el => el?.product?.id === product.id) || {
        product: { ...product },
        quantity: getItemQuantity(product.id),
        id: `temp_${product.id}`,
      },
    )
  }, [cart?.cartContent, getItemQuantity, product.id])

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

  const addToCart = (item: IProduct, mustGrow: boolean) => {
    if (mustGrow) {
      cartAddToCart(item.id, 1, item)
    } else {
      removeFromCart(item.id)
    }
  }

  const deleteFromCart = (item: IProduct) => {
    removeFromCart(item.id)
  }

  const productImage = cartItem.product?.cover?.url
    ? `${PHOTO_URL}${cartItem.product.cover.url}`
    : ''

  const router = useRouter()

  return (
    <MainContainer>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={product}
        user={user}
      />
      <Wrapper>
        <BackButton
          type={router?.query?.['catalog'] ? 'Магазин' : 'Бренд'}
          name={product?.brand?.name}
          link={`/${product.brand.city.slug || city.slug}/brand/${
            product?.brand.id || product?.brand?.id
          }/products`}
        />
        <Wrap>
          <Left>
            <ImageBrand>
              <Image
                alt="product"
                src={productImage ? productImage : '/cosmetic_placeholder.jpg'}
                width={350}
                height={350}
              />
            </ImageBrand>
            {/* <Rating>
              <Stars count={Math.round(product?.brand?.averageScore)} />
              <Count>{product?.brand?.numberScore || 0}</Count>
            </Rating> */}
          </Left>
          <Right>
            <Title>{cartItem?.product?.name}</Title>
            {product?.brand?.dontShowPrice ? null : (
              <>
                {cartItem?.product?.salePrice ? (
                  <OldPrice>{`${cartItem?.product?.regularPrice?.toLocaleString()} ₽`}</OldPrice>
                ) : null}
                <Price>{`${
                  (cartItem?.product?.salePrice &&
                    cartItem?.product?.salePrice?.toLocaleString()) ||
                  cartItem?.product?.regularPrice?.toLocaleString()
                } ₽`}</Price>
              </>
            )}
            <AvailableQuantity
              isWrongQuantity={
                cartItem?.quantity
                  ? cartItem.quantity > product?.availableInStock
                  : true
              }
            >
              {`${product?.availableInStock ?? 0} ${pluralize(
                product?.availableInStock,
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
            <QuantityControls
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
              setOpenBuyPopup={setOpenBuyPopup}
              item={product}
              cartItem={cartItem}
              quantity={getItemQuantity(product.id)}
              user={user}
              type="page"
            />
            <Description>
              <EntityDescription
                description={cartItem.product?.fullDescription || null}
              />
            </Description>
          </Right>
        </Wrap>
        {cartItem.product?.gallery?.length ? (
          <Slider
            noAllPadding
            city={city}
            type="photos"
            items={cartItem.product?.gallery}
          />
        ) : null}
        <Reviews
          setUpdatedReviews={setReviewsData}
          type="PRODUCT"
          id={cartItem.product?.id || ''}
          reviewMutation={reviewMutation}
          reviews={reviewsData || []}
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
