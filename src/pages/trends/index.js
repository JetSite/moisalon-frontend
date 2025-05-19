import { addApolloState, initializeApollo } from '../../api/apollo-client'
import AdvicesPage from '../../components/pages/AdvicesPage'
import { Fragment } from 'react'

const Trends = ({
  categories,
  allAdvices,
  categoryAdvicesEmpty,
  totalSalons,
  totalBrands,
  totalMasters,
}) => {
  return (
    <Fragment>
      <AdvicesPage
        trends
        categories={categories}
        allAdvices={allAdvices}
        categoryAdvicesEmpty={categoryAdvicesEmpty}
        totalSalons={totalSalons}
        totalBrands={totalBrands}
        totalMasters={totalMasters}
      />
    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo()

  const data = await Promise.all([
    // apolloClient.query({
    //   query: getCategories,
    //   context: { uri: 'https://moi.salon/graphql' },
    // }),
    // apolloClient.query({
    //   query: getAll,
    //   context: { uri: 'https://moi.salon/graphql' },
    // }),
    // apolloClient.query({
    //   query: getAdvices,
    //   context: { uri: 'https://moi.salon/graphql' },
    //   variables: {
    //     catId: '',
    //   },
    // }),
    // apolloClient.query({
    //   query: totalSalons,
    //   variables: {
    //     catId: '',
    //   },
    // }),
    // apolloClient.query({
    //   query: totalBrands,
    //   variables: {
    //     catId: '',
    //   },
    // }),
    // apolloClient.query({
    //   query: totalMasters,
    //   variables: {
    //     catId: '',
    //   },
    // }),
  ])

  return addApolloState(apolloClient, {
    props: {
      // categories: data[0].data.catagories,
      // allAdvices: data[1].data.pages,
      // categoryAdvicesEmpty: data[2].data.pagesCategory,
      // totalSalons: data[3].data.totalSalons,
      // totalBrands: data[4].data.totalBrands,
      // totalMasters: data[5].data.totalMasters,
      meta: {
        title: "Тренды красоты | MOI salon",
        description: "Актуальные тренды и тенденции в индустрии красоты на платформе MOI salon",
        image: "/services-page-photo2.jpg",
        url: "https://moi.salon/trends",
      },
    },
  })
}

export default Trends
