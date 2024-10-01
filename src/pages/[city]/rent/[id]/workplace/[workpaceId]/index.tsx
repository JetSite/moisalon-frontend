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

interface Props {
  salonData: ISalonPage
  city: ICity
  workplaceData: ISalonWorkplace
}

const Workplace: NextPage<Props> = ({ salonData, city, workplaceData }) => {
  return (
    <MainLayout>
      {/* <Head>
        {seoData?.title ? <title>{seoData?.title}</title> : null}
        {seoData?.description ? (
          <meta name="description" content={seoData?.description} />
        ) : null}
        {salonData?.logo?.url ? (
          <meta property="og:image" content={salonData?.logo?.url} />
        ) : null}
      </Head> */}
      <>
        <SearchBlock />
        <WorkplacePage
          city={city}
          salonData={salonData}
          workplace={workplaceData}
        />
      </>
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

  const city = await fetchCity(ctx.params.city as string)
  const salonID = ctx.params.id
  const workpaceID = ctx.params.workpaceId

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
    (salonData?.city && salonData.city.slug !== ctx.query?.city)
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
