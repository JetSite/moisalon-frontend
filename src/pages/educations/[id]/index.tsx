import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { getEducationById } from 'src/api/graphql/education/queries/getEducationById'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEducation } from 'src/types/education'
import { FC } from 'react'
import EducationPage from 'src/components/pages/EducationPage'

interface EducationDetailedProps {
  education: IEducation
  beautyCategories: any
  beautyAllContent: any
}

const EducationDetailed: FC<EducationDetailedProps> = ({
  education,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <EducationPage
      educationData={education}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
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

  const education = flattenStrapiResponse(eduRes?.data?.education)

  return addApolloState(apolloClient, {
    props: {
      education,
      beautyCategories: categories?.data?.feedCategories,
      beautyAllContent: all?.data?.feeds,
    },
  })
}

export default EducationDetailed
