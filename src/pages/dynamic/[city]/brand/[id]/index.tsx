import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  StaticProps,
  getEntityStaticPaths,
  getStaticPropsForEntityPage,
} from 'src/api/utils/entityGetStaticPaths'
import { BRANDS_STATIC_PATH } from 'src/api/graphql/entitiesQuery/staticPaths'
import { NextPage } from 'next'
import Slider from '../../../../../components/blocks/Slider'
import MainLayout from 'src/layouts/MainLayout'
import { IBrand } from 'src/types/brands'
import { BRAND } from 'src/api/graphql/brand/queries/getBrand'
import Header from 'src/components/pages/Brand/ViewBrand/components/Header'
import About from 'src/components/pages/Brand/ViewBrand/components/About'
import Contacts from 'src/components/pages/Brand/ViewBrand/components/Contacts'

const DynamicPage: NextPage<StaticProps<IBrand>> = ({ city, id, entity }) => {
  const router = useRouter()

  // useEffect(() => {
  //   router.push(`/${city}/entity/${id}`)
  // })

  return entity ? (
    <MainLayout>
      <Header brand={entity} noBackButton isOwner={false} />
      <About brand={entity} />
      {entity.products?.length ? (
        <Slider
          city={entity.city}
          type="goods"
          typeObject={entity}
          title="Продукция"
          items={entity.products || []}
          pt={102}
          pb={91}
          noBottom
          noAllButton
        />
      ) : null}
      {entity.masters.length ? (
        <Slider
          type="masters"
          items={entity.masters}
          title={`Мастера бренда ${entity.name}`}
          bgColor="#f2f0f0"
          isOwner={false}
          pt={102}
          pb={91}
          noBottom
          noAll
          noAllButton
          city={entity.masters[0].city}
        />
      ) : null}
      {entity.salons.length ? (
        <Slider
          city={entity.city}
          type="salons"
          items={entity.salons}
          isOwner={false}
          title="Салоны, в которых я работаю"
          pt={52}
          pb={31}
        />
      ) : null}
      <Contacts
        address={entity?.address}
        latitude={entity?.latitude}
        longitude={entity?.longitude}
        email={entity?.email}
        phones={entity?.phones}
        title={'Контакты'}
      />
    </MainLayout>
  ) : null
}

export const getStaticPaths = getEntityStaticPaths<IBrand>(
  BRANDS_STATIC_PATH,
  'brands',
)

export const getStaticProps = getStaticPropsForEntityPage<IBrand>(
  BRAND,
  'brand',
  props => ({
    ...props,
    meta: props.entity
      ? {
          title: props.entity.seoTitle || `${props.entity.name} | MOI salon`,
          description:
            props.entity.seoDescription ||
            `Бренд ${props.entity.name} на платформе MOI salon - продукция, услуги и контакты`,
          image: props.entity.logo?.url || '/mobile-main-bg.jpg',
          url: `https://moi.salon/${props.city}/brand/${props.id}`,
        }
      : null,
  }),
)

export default DynamicPage
