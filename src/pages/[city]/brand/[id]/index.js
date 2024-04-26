import { useEffect, useState } from 'react'
import Head from 'next/head'
import MainLayout from '../../../../layouts/MainLayout'
import { addApolloState, initializeApollo } from '../../../../apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Brand/ViewBrand/components/Header'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Brand/ViewBrand/components/About'
import Contacts from '../../../../components/pages/Brand/ViewBrand/components/Contacts'
import BrandReviews from '../../../../components/pages/Brand/ViewBrand/components/BrandReviews'
import InviteBrand from '../../../../components/pages/Brand/ViewBrand/components/Invite'
import Line from '../../../../components/pages/MainPage/components/Line'
import { removeItemB2cMutation } from '../../../../_graphql-legacy/cart/removeItemB2c'
import Slider from '../../../../components/blocks/Slider'
import { addToCartB2cMutation } from '../../../../_graphql-legacy/cart/addToB2cCart'
import { getBrand } from 'src/graphql/brand/queries/getBrand'
import { getBrands } from 'src/graphql/brand/queries/getBrands'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useMutation } from '@apollo/client'

const Brand = ({ brandData, randomBrands }) => {
  const [brand, setBrand] = useState(brandData)
  // const [dataScore, setDataScore] = useState(dataScoreRes)
  // const [reviews, setReviews] = useState(dataReviews)
  const { me } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)
  const b2bClient = !!me?.master?.id || !!me?.salons?.length
  const setChosenItemId = () => {}

  useEffect(() => {
    setChosenItemId(brand?.id)
  }, [])

  // const {
  //   data: dataCart,
  //   refetch: refetchCart,
  //   loading: loadingCart,
  // } = useQuery(getCart, {
  //   onCompleted: res => {
  //     setProductsState(res?.getCartB2b?.contents || [])
  //   },
  // })

  const [addToCart] = useMutation(addToCartB2cMutation, {
    onCompleted: () => {
      refetchCart()
    },
  })

  const [removeItem] = useMutation(removeItemB2cMutation, {
    onCompleted: () => {
      refetchCart()
    },
  })

  const add = (item, quantity) => {
    if (!b2bClient) {
      // setOpenPopup(true);
      // return;
    }
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

  // const { data, loading, refetch } = useQuery(brandsRandomQuery, {
  //   variables: { count: 10 },
  // })

  useEffect(() => {
    setBrand(brandData)
    // setReviews(dataReviews)
    // setDataScore(dataScoreRes)
    // refetch()
  }, [brandData])

  // const { refetch: refetchBrand } = useQuery(brandQuery, {
  //   variables: { id: brand.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setBrand(res.brand)
  //   },
  // })

  // const { data: userBrands } = useQuery(userBrandsQuery)

  // const { refetch: refetchReviews } = useQuery(reviewsForBrand, {
  //   variables: { originId: brand.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setReviews(res.reviewsForBrand)
  //   },
  // })

  // const { refetch: refetchScore, loading: loadingScore } = useQuery(
  //   scoreBrand,
  //   {
  //     variables: { id: brand.id },
  //     onCompleted: res => {
  //       setDataScore(res.scoreBrand)
  //     },
  //   },
  // )

  // const masterSpecializationsCatalog = catalogOrDefault(
  //   catalogs?.masterSpecializationsCatalog,
  // )

  const [activeTab, setActiveTab] = useState(0)
  const [edit, setEdit] = useState(false)

  // const isOwner = userBrands?.userBrands?.find(item => item.id === brand.id)
  const isOwner = false

  return (
    <MainLayout>
      <Head>
        {brand?.seo?.title ? <title>{brand?.seo?.title}</title> : null}
        {brand?.seo?.description ? (
          <meta name="description" content={brand?.seo?.description} />
        ) : null}
        {brand?.photo?.url ? (
          <meta property="og:image" content={brand?.photo?.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <Header
          brand={brand}
          me={me}
          isOwner={isOwner}
          // refetchBrand={refetchBrand}
          // refetchScore={refetchScore}
          // scoreBrandCount={dataScore?.value}
          // loadingScore={loadingScore}
        />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          noPadding
          tabs={[
            { id: 1, text: 'О бренде', link: '#about', show: true },
            {
              id: 2,
              text: 'Продукция',
              link: '#goods',
              count: brand?.products?.length,
              show: brand?.products?.length,
            },
            {
              id: 5,
              text: 'Мастера',
              link: '#masters',
              count: brand?.masters?.length,
              show: brand?.masters?.length,
            },
            {
              id: 6,
              text: 'Салоны',
              link: '#salons',
              count: brand?.salons?.length,
              show: brand?.salons?.length,
            },
            {
              id: 3,
              text: 'Контакты',
              link: '#contacts',
              show: true,
            },
            {
              id: 7,
              text: 'Отзывы',
              link: '#reviews',
              count: brand?.reviews?.length,
              show: true,
            },
          ]}
        />
        <About brand={brand} />
        {brand?.products && brand?.products?.length ? (
          <Slider
            type="goods"
            typeObject={brand}
            title="Продукция"
            isOwner={isOwner}
            edit={edit}
            setEdit={setEdit}
            items={brand.products || []}
            addProductToCart={add}
            deleteItemFromCart={deleteItem}
            // cart={productState}
            // loadingCart={loadingCart}
            pt={102}
            pb={91}
            noBottom
            noAllButton
          />
        ) : null}
        {brand?.masters && brand?.masters?.length ? (
          <Slider
            type="masters"
            items={brand.masters}
            title={`Мастера бренда ${brand.brandName}`}
            bgColor="#f2f0f0"
            isOwner={isOwner}
            edit={edit}
            setEdit={setEdit}
            pt={102}
            pb={91}
            noBottom
            noAll
            noAllButton
          />
        ) : null}
        {brand?.salons && brand?.salons?.length ? (
          <Slider
            type="salons"
            items={brand.salons}
            title="Салоны"
            pt={102}
            pb={91}
            noBottom
            noAll
            noAllButton
          />
        ) : null}
        <Contacts
          address={brand?.address}
          latitude={brand?.latitude}
          longitude={brand?.longitude}
          email={brand?.email}
          phone={brand?.phones}
          title={'Контакты'}
        />
        <BrandReviews
          // refetchReviews={refetchReviews}
          brandId={brand?.id}
          me={me}
          data={brand?.reviews}
        />
        <InviteBrand me={me} />
        <Line text="Для просмотра оптовых цен, войдите или зарегистрируйтесь!" />
        <Slider
          type="brands"
          title="Другие бренды"
          noBottom
          noAllButton
          items={randomBrands || []}
          // loading={loading}
          pt={102}
          pb={91}
        />
      </>
    </MainLayout>
  )
}

export async function getServerSideProps({ params, query }) {
  const apolloClient = initializeApollo()

  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: query?.city || '',
  //     count: 1,
  //   },
  // })

  // if (!id || !city?.data?.citySuggestions[0]?.data?.city) {
  //   return {
  //     notFound: true,
  //   }
  // }

  const id = params.id

  const data = await Promise.all([
    apolloClient.query({
      query: getBrand,
      variables: { id },
    }),
    apolloClient.query({
      query: getBrands,
      variables: {
        itemsCount: 10,
      },
    }),
  ])

  const brandData = flattenStrapiResponse(data[0]?.data?.brand?.data)
  const randomBrands = flattenStrapiResponse(data[1]?.data?.brands?.data)

  return addApolloState(apolloClient, {
    props: {
      brandData,
      randomBrands,
    },
  })
}

export default Brand
