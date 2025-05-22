import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getEducationById } from 'src/api/graphql/education/queries/getEducationById'
import { FC } from 'react'
import EducationPage, {
  EducationPageProps,
} from 'src/components/pages/EducationPage'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { GetServerSideProps } from 'next'
import { Nullable } from '@/types/common'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { IEducation } from '@/types/education'
import { getFeedCategoriesForSlider } from '@/api/graphql/feed/queries/getFeedCategoriesForSlider'
import { getFeedsForSlider } from '@/api/graphql/feed/queries/getFeedsForSlider'

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
      query: getFeedCategoriesForSlider,
    }),
    apolloClient.query({
      query: getFeedsForSlider,
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
        title: education.title || 'Обучение | MOI salon',
        description:
          education.shortDescription ||
          'Курсы и обучение на платформе MOI salon',
        image: education.cover?.url || '/services-page-photo1.jpg',
        url: `https://moi.salon/educations/${education.id}`,
      },
      schema: {
        type: 'Course',
        data: {
          name: education.title,
          description: education.shortDescription,
          provider: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          image: education.cover?.url
            ? `https://moi.salon${education.cover.url}`
            : 'https://moi.salon/services-page-photo1.jpg',
          url: `https://moi.salon/educations/${education.id}`,
          datePublished: education.publishedAt,
        },
      },
    },
  })
}

export default EducationDetailed
