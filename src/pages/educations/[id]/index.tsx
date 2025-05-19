import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { getEducationById } from 'src/api/graphql/education/queries/getEducationById'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { FC } from 'react'
import EducationPage, {
  EducationPageProps,
} from 'src/components/pages/EducationPage'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { GetServerSideProps } from 'next'
import { Nullable } from '@/types/common'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { IEducation } from '@/types/education'
import { PHOTO_URL } from '../../../api/variables'

const EducationDetailed: FC<EducationPageProps> = ({
  education,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <EducationPage
      education={education}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<EducationPageProps>
> = async ctx => {
  const apolloClient = initializeApollo()

  const id = ctx.params?.['id']
  if (!id)
    return {
      notFound: true,
    }

  const data = await Promise.allSettled([
    apolloClient.query({
      query: getEducationById,
      variables: { id },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const education = getPrepareData<IEducation>(data[0], 'education')
  if (!education) {
    return {
      notFound: true,
    }
  }
  const beautyCategories = getPrepareData<IBeautyCategories[]>(
    data[1],
    'feedCategories',
  )
  const beautyAllContent = getPrepareData<IFeed[]>(data[2], 'feeds')

  return addApolloState(apolloClient, {
    props: {
      education,
      beautyCategories,
      beautyAllContent,
      meta: {
        title: `${education.title} | Обучение MOI salon`,
        description:
          education.shortDescription || 'Обучение на платформе MOI salon',
        image: `${PHOTO_URL}${education?.cover?.url}` || '/mobile-main-bg.jpg',
        url: `https://moi.salon/educations/${education.id}`,
      },
    },
  })
}

export default EducationDetailed
