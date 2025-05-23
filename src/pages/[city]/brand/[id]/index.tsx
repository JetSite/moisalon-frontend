import { FC, useMemo, useState, Fragment } from 'react'
import MainLayout from '../../../../layouts/MainLayout'
import { initializeApollo } from '../../../../api/apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Brand/ViewBrand/components/Header'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Brand/ViewBrand/components/About'
import Contacts from '../../../../components/pages/Brand/ViewBrand/components/Contacts'
import BrandReviews from '../../../../components/pages/Brand/ViewBrand/components/BrandReviews/index'
import InviteBrand from '../../../../components/pages/Brand/ViewBrand/components/Invite'
import Line from '../../../../components/pages/MainPage/components/Line'
import Slider from '../../../../components/blocks/Slider'
import { BRAND } from 'src/api/graphql/brand/queries/getBrand'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { IBrand } from 'src/types/brands'
import { GetServerSideProps } from 'next'
import { fetchCity } from 'src/api/utils/fetchCity'
import { ICity } from 'src/types'
import { Nullable } from 'src/types/common'
import { getRating } from 'src/utils/newUtils/getRating'

interface Props {
  brandData: IBrand
  othersBrands: IBrand[]
  cityData: ICity
}

const Brand: FC<Props> = ({ brandData, othersBrands, cityData }) => {
  const [brand] = useState(brandData)
  const { user } = useAuthStore(getStoreData)
  const [activeTab, setActiveTab] = useState<number>(0)
  const isOwner = !!user?.owner?.brands?.find(e => e.id === brand.id)

  const tabs = useMemo(
    () => [
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
    ],
    [brand],
  )

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
      <>
        <SearchBlock />
        <Header brand={brand} isOwner={isOwner} />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
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
            city={masters[0].city}
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
  const cityData = await fetchCity(query['city'] as string)

  const id = params?.['id']

  const data = await Promise.all([
    apolloClient.query({
      query: BRAND,
      variables: { id },
    }),
    apolloClient.query({
      query: BRANDS,
      variables: {
        itemsCount: 10,
      },
    }),
  ])

  const brandData: IBrand | null =
    flattenStrapiResponse(data[0]?.data?.brand?.data) || null
  const othersBrands: IBrand[] =
    flattenStrapiResponse(data[1]?.data?.brands?.data) || []

  if (!brandData || !id || !cityData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      cityData,
      brandData,
      othersBrands,
      meta: {
        title: brandData?.name || 'Бренд | MOI salon',
        description: brandData?.description || 'Бренд на платформе MOI salon',
        image:
          process.env.NEXT_PUBLIC_PHOTO_URL + brandData?.logo?.url ||
          '/brands-page-bg.jpg',
        url: `https://moi.salon/${cityData.slug}/brand/${brandData?.id}`,
      },
      schema: {
        type: 'Organization',
        data: {
          '@type': ['Organization', 'Brand'],
          name: brandData?.name,
          description: brandData?.description,
          url: `https://moi.salon/${cityData.slug}/brand/${brandData?.id}`,
          image: brandData?.logo?.url
            ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${brandData.logo.url}`
            : 'https://moi.salon/brands-page-bg.jpg',
          logo: brandData?.logo?.url
            ? `https://moi.salon${brandData.logo.url}`
            : undefined,
          review: brandData?.reviews?.map(review => ({
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: review.user?.username || 'Анонимный пользователь',
            },
            reviewBody: review.content,
          })),
        },
      },
    },
  }
}

export default Brand
