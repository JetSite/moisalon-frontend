import { useEffect } from 'react'
import { initializeApollo } from '../../../../../apollo-client'
import { EmptySearchQuery } 
import { searchAddressSalons } from '../../../../../_graphql-legacy/search/searchAddressSalons'
import { cyrToTranslit } from '../../../../../utils/translit'
import { useRouter } from 'next/router'

const DynamicPage = ({ city, id }) => {
  const router = useRouter()
  useEffect(() => {
    router.push(`/${city}/rent/${id}`)
  })
  return null
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
      city: params?.city,
    },
  }
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const salonQueryRes = await apolloClient.query({
    query: searchAddressSalons,
    variables: {
      input: {
        ...EmptySearchQuery,
        city: '',
        query: '',
        lessor: true,
      },
    },
  })
  return {
    paths: salonQueryRes.data.salonSearch.salonsConnection.nodes.map(item => {
      return {
        params: {
          city: `${cyrToTranslit(item.salon.address.city)}`,
          id: `${item?.salon?.seo?.slug || item?.salon?.id}`,
        },
      }
    }),
    fallback: false,
  }
}

export default DynamicPage
