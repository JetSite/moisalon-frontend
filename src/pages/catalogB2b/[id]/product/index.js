import { addApolloState, initializeApollo } from '../../../../apollo-client'
import { goodsCatalogQuery } from '../../../../_graphql-legacy/goodsCatalog'
import { goodSearch } from '../../../../_graphql-legacy/goodSearch'
import MainLayout from '../../../../layouts/MainLayout'
import { MainContainer } from '../../../../styles/common'
import CatalogProductsPage from '../../../../components/pages/Catalog/components/CatalogProductsPage'
import Line from '../../../../components/pages/MainPage/components/Line'
import Ribbon from '../../../../components/pages/MainPage/components/Ribbon'
import { brandSlugQuery } from '../../../../_graphql-legacy/brand/brandSlugQuery'
import { getProductCategories } from '../../../../_graphql-legacy/getProductCategories'
import { getCategories } from '../../../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../../../_graphql-legacy/advices/getAll'

const CatalogProducts = ({
  brand,
  goodsData,
  productCategories,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <MainLayout>
      <MainContainer>
        <CatalogProductsPage
          brand={brand}
          catalog
          goodsData={goodsData}
          productCategoriesData={productCategories}
        />
      </MainContainer>
      <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
      <Ribbon
        title="Бьюти-лента"
        beautyCategories={beautyCategories}
        beautyAllContent={beautyAllContent}
      />
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo()

  const brandQueryRes = await apolloClient.query({
    query: brandSlugQuery,
    variables: { slug: query?.id },
  })

  const brand = brandQueryRes.data.brandSlug

  const data = await Promise.all([
    // apolloClient.query({
    //   query: goodsCatalogQuery,
    //   context: { clientName: "goods" },
    //   variables: {
    //     first: 12,
    //     category: query?.brand || brand?.name || null,
    //     categoryId: +query?.value || null,
    //   },
    // }),
    apolloClient.query({
      query: goodSearch,
      variables: {
        input: {
          brandId: [brand.id],
          query: '',
          isB2b: true,
        },
      },
    }),
    apolloClient.query({
      query: getProductCategories,
    }),
    apolloClient.query({
      query: getCategories,
      context: { uri: 'https://moi.salon/graphql' },
    }),
    apolloClient.query({
      query: getAll,
      context: { uri: 'https://moi.salon/graphql' },
    }),
  ])

  return addApolloState(apolloClient, {
    props: {
      brand: brand,
      goodsData: data[0]?.data?.goodsSearch,
      productCategories: data[1]?.data?.productsCatagoriesB2b,
      beautyCategories: data[2]?.data?.catagories,
      beautyAllContent: data[3]?.data?.pages,
    },
  })
}

export default CatalogProducts
