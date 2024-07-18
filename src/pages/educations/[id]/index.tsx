import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import EducationPage from '../../../components/pages/EducationPage'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { getEducationById } from 'src/api/graphql/education/queries/getEducationById'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEducation } from 'src/types/education'
import { FC } from 'react'

interface EducationDetailedProps {
  education: IEducation
  beautyCategories: any
  beautyAllContent: any
  // dataReviews: any
}

const EducationDetailed: FC<EducationDetailedProps> = ({
  education,
  beautyCategories,
  beautyAllContent,
  // dataReviews,
}) => {
  return (
    <EducationPage
      education={education}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
      dataReviews={dataReviews}
      loading={false}
    />
  )
}

export async function getServerSideProps({ params }: any) {
  const apolloClient = initializeApollo()

  const eduRes = await apolloClient.query({
    query: getEducationById,
    variables: { id: params.id },
  })
  const categories = await apolloClient.query({
    query: getFeedCategories,
  })
  const all = await apolloClient.query({
    query: getFeeds,
  })
  // const reviews = await apolloClient.query({
  //   query: educationReviews,
  //   variables: { id: params.id },
  // })

  const education = flattenStrapiResponse(eduRes?.data?.education)

  return addApolloState(apolloClient, {
    props: {
      education,
      beautyCategories: categories?.data?.feedCategories,
      beautyAllContent: all?.data?.feeds,
      // dataReviews: reviews?.data?.comments || [],
    },
  })
}

export default EducationDetailed
