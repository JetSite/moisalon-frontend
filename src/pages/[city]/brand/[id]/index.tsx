import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import MainLayout from '../../../../layouts/MainLayout'
import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Brand/ViewBrand/components/Header'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Brand/ViewBrand/components/About'
import Contacts from '../../../../components/pages/Brand/ViewBrand/components/Contacts'
import BrandReviews from '../../../../components/pages/Brand/ViewBrand/components/BrandReviews/index'
import InviteBrand from '../../../../components/pages/Brand/ViewBrand/components/Invite'
import Line from '../../../../components/pages/MainPage/components/Line'
import { removeItemB2cMutation } from '../../../../_graphql-legacy/cart/removeItemB2c'
import Slider from '../../../../components/blocks/Slider'
import { addToCartB2cMutation } from '../../../../_graphql-legacy/cart/addToB2cCart'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'
import { getBrands } from 'src/api/graphql/brand/queries/getBrands'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useMutation } from '@apollo/client'
import { IBrand } from 'src/types/brands'
import { GetServerSideProps } from 'next'
import { fetchCity } from 'src/api/utils/fetchCity'
import { ICity } from 'src/types'
import { Nullable } from 'src/types/common'
import { getRating } from 'src/utils/newUtils/getRating'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'

interface Props {
  brandData: IBrand
  othersBrands: IBrand[]
  cityData: ICity
}

const Brand: FC<Props> = ({ brandData, othersBrands }) => {
  const [brand, setBrand] = useState(brandData)
  const { user, city } = useAuthStore(getStoreData)
  const [activeTab, setActiveTab] = useState<number>(0)
  const isOwner = !!user?.owner?.brands?.find(e => e.id === brand.id)

  const salons = brand.salons.map(e => {
    const reviewsCount = e.reviews.length
    const { rating, ratingCount } = getRating(e.ratings)
    return { ...e, rating, ratingCount, reviewsCount }
  })
  const masters = brand.masters.map(e => {
    const reviewsCount = e.reviews.length
    const { rating, ratingCount } = getRating(e.ratings)
    return { ...e, rating, ratingCount, reviewsCount }
  })

  return (
    <MainLayout>
      <Head>
        {brand.seoTitle ? <title>{brand.seoTitle}</title> : null}
        {brand.seoDescription ? (
          <meta name="description" content={brand.seoDescription} />
        ) : null}
        {brand.logo?.url ? (
          <meta property="og:image" content={brand.logo.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <Header brand={brand} isOwner={isOwner} />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            { id: 1, text: 'О бренде', link: '#about', show: true },
            {
              id: 2,
              text: 'Продукция',
              link: '#goods',
              count: brand?.products?.length,
              show: !!brand?.products?.length,
            },
            {
              id: 5,
              text: 'Мастера',
              link: '#masters',
              count: brand?.masters?.length,
              show: !!brand?.masters?.length,
            },
            {
              id: 6,
              text: 'Салоны',
              link: '#salons',
              count: brand?.salons?.length,
              show: !!brand?.salons?.length,
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
        {brand.products?.length ? (
          <Slider
            city={brand.city}
            type="goods"
            typeObject={brand}
            title="Продукция"
            isOwner={isOwner}
            items={brand.products || []}
            pt={102}
            pb={91}
            noBottom
            noAllButton
          />
        ) : null}
        {masters.length ? (
          <Slider
            type="masters"
            items={masters}
            title={`Мастера бренда ${brand.name}`}
            bgColor="#f2f0f0"
            isOwner={isOwner}
            pt={102}
            pb={91}
            noBottom
            noAll
            noAllButton
            city={brand.masters[0].city}
          />
        ) : null}
        {salons.length ? (
          <Slider
            type="salons"
            items={salons}
            title="Салоны"
            pt={102}
            pb={91}
            noBottom
            noAll
            noAllButton
            city={salons[0].city}
          />
        ) : null}
        <Contacts
          address={brand?.address}
          latitude={brand?.latitude}
          longitude={brand?.longitude}
          email={brand?.email}
          phones={brand?.phones}
          title={'Контакты'}
        />
        <BrandReviews brandId={brand?.id} reviews={brand.reviews} />
        <InviteBrand isLoggedIn={user?.info.id} />
        <Line text="Для просмотра оптовых цен, войдите или зарегистрируйтесь!" />
        <Slider
          type="brands"
          title="Другие бренды"
          noBottom
          noAllButton
          items={othersBrands}
          pt={102}
          pb={91}
          city={othersBrands[0].city}
        />
      </>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Nullable<Props>> = async ({
  params,
  query,
}) => {
  const apolloClient = initializeApollo()
  const cityData = await fetchCity(query.city as string)

  const id = params?.id

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

  const brandData: IBrand | null =
    flattenStrapiResponse(data[0]?.data?.brand?.data) || null
  const othersBrands: IBrand[] =
    flattenStrapiResponse(data[1]?.data?.brands?.data) || []

  return {
    notFound: !brandData || !id || !cityData,
    props: {
      cityData,
      brandData,
      othersBrands,
    },
  }
}

export default Brand
