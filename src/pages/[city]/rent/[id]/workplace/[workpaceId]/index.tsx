import Head from 'next/head'
import {
  addApolloState,
  initializeApollo,
} from '../../../../../../api/apollo-client'
import SearchBlock from '../../../../../../components/blocks/SearchBlock'
import MainLayout from '../../../../../../layouts/MainLayout'
import { fetchCity } from 'src/api/utils/fetchCity'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalonPage } from 'src/types/salon'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { ICity } from 'src/types'
import { ISalonWorkplace } from 'src/types/workplace'
import { WorkplacePage } from 'src/components/pages/Workplace'
import MainHead from '../../../../../MainHead'
import { PHOTO_URL } from '../../../../../../api/variables'

interface Props {
  salonData: ISalonPage
  city: ICity
  workplaceData: ISalonWorkplace
}

const Workplace: NextPage<Props> = ({ salonData, city, workplaceData }) => {
  return (
    <MainLayout>
      <MainHead
        title={`${workplaceData.title} в ${salonData.name} | Аренда рабочего места MOI salon`}
        description={
          workplaceData.description ||
          `Аренда рабочего места ${workplaceData.title} в салоне ${
            salonData.name
          }. ${workplaceData.workspaces_types.map(t => t.title).join(', ')}`
        }
        image={
          `${PHOTO_URL}${
            workplaceData?.cover?.url ||
            workplaceData?.gallery?.[0]?.url ||
            salonData?.logo?.url
          }` || '/mobile-main-bg.jpg'
        }
        url={`https://moi.salon/${city.slug}/rent/${salonData.id}/workplace/${workplaceData.id}`}
      />
      <SearchBlock />
      <WorkplacePage
        city={city}
        salonData={salonData}
        workplace={workplaceData}
      />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()

  if (!ctx.params) {
    return {
      notFound: true,
    }
  }

  const city = await fetchCity(ctx.params['city'] as string)
  const salonID = ctx.params['id']
  const workpaceID = ctx.params['workpaceId']

  const data = await Promise.all([
    apolloClient.query({
      query: getSalonPage,
      variables: { id: salonID },
    }),
  ])

  const salonData: ISalonPage | null =
    flattenStrapiResponse(data[0].data.salon) || null

  const workplaceData =
    salonData?.workplaces.find(e => e.id === workpaceID) || null

  if (
    !salonID ||
    !workplaceData ||
    (salonData?.city && salonData.city.slug !== ctx.query?.['city'])
  ) {
    return {
      notFound: true,
    }
  }

  return addApolloState(apolloClient, {
    props: {
      salonData,
      workplaceData,
      city,
    },
  })
}

export default Workplace
