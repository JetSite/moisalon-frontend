import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import VacancyPage from '../../../components/pages/VacancyPage'
import { getVacancyById } from 'src/api/graphql/vacancy/queries/getVacancyById'
import { GetServerSideProps, NextPage } from 'next'
import { IVacancy } from 'src/types/vacancies'
import { Nullable } from 'src/types/common'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { getFeedCategoriesForSlider } from '@/api/graphql/feed/queries/getFeedCategoriesForSlider'
import { getFeedsForSlider } from '@/api/graphql/feed/queries/getFeedsForSlider'

interface Props {
  vacancy: IVacancy
  beautyCategories: IBeautyCategories[]
  beautyAllContent: IFeed[]
}

const VacancyDetailed: NextPage<Props> = ({
  vacancy,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <VacancyPage
      vacancy={vacancy}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  Partial<Nullable<Props>>
> = async ctx => {
  const apolloClient = initializeApollo()

  const id = ctx.params?.['id']
  if (!id)
    return {
      notFound: true,
    }

  try {
    const data = await Promise.allSettled([
      apolloClient.query({
        query: getVacancyById,
        variables: { id },
      }),
      apolloClient.query({
        query: getFeedCategoriesForSlider,
      }),
      apolloClient.query({
        query: getFeedsForSlider,
      }),
    ])

    const vacancy = getPrepareData<IVacancy>(data[0], 'vacancy')

    if (!vacancy) {
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
        vacancy,
        beautyCategories,
        beautyAllContent,
        meta: {
          title: vacancy.title || 'Вакансия | MOI salon',
          description:
            vacancy.shortDescription || 'Вакансия на платформе MOI salon',
          image:
            process.env.NEXT_PUBLIC_PHOTO_URL + vacancy.cover?.url ||
            '/services-page-photo1.jpg',
          url: `https://moi.salon/vacancies/${vacancy.id}`,
        },
        schema: {
          type: 'JobPosting',
          data: {
            title: vacancy.title,
            description: vacancy.shortDescription,
            datePosted: vacancy.publishedAt,
            hiringOrganization: {
              '@type': 'Organization',
              name: vacancy.salon?.name || 'MOI salon',
              url:
                vacancy?.salon?.id && vacancy?.salon?.city?.slug
                  ? `https://moi.salon/${vacancy.salon.city.slug}/salon/${vacancy.salon.id}`
                  : 'https://moi.salon',
            },
            baseSalary: {
              '@type': 'MonetaryAmount',
              currency: 'RUB',
              value: {
                '@type': 'QuantitativeValue',
                minValue: vacancy.amountFrom,
                maxValue: vacancy.amountTo,
                unitText: 'MONTH',
              },
            },
          },
        },
      },
    })
  } catch (error) {
    console.error('Failed to fetch vacancy data:', error)
    if (error instanceof Error && 'networkError' in error) {
      return {
        props: {},
      }
    }
    return {
      notFound: true,
    }
  }
}

export default VacancyDetailed
