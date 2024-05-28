import { ApolloQueryResult } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IServerProviderPropsData } from '../types'
import { getTotalCount } from 'src/utils/getTotalCount'

export const getServerPrepareData = (
  data: IServerProviderPropsData,
  cities: ApolloQueryResult<any>,
) => {
  const keyPageData = Object.keys(data.pageData.data)[0]
  const preparePageData: { [K in typeof keyPageData]: any } = {
    ...data.pageData.data[keyPageData],
  }
  const keyCitiesData = Object.keys(cities.data)[0]
  const prepareCitiesData: { [K in typeof keyCitiesData]: any } = {
    ...cities.data[keyCitiesData],
  }

  const keysOtherData = data?.otherData?.map(e => Object.keys(e.data)[0]) || []
  const prepareOtherData: { [K in (typeof keysOtherData)[number]]: any } = {}
  keysOtherData?.map(key => {
    data?.otherData?.forEach(e => {
      const currentKey = Object.keys(e.data)[0]
      if (currentKey === key) {
        prepareOtherData[key] = flattenStrapiResponse(e.data[key])
      }
    })
  })
  const keysTotalCount =
    data?.totalCount?.map(e => Object.keys(e.data)[0]) || []
  const prepareTotalCount: { [K in (typeof keysTotalCount)[number]]: any } = {}
  keysTotalCount?.map(key => {
    data?.totalCount?.forEach(e => {
      const currentKey = Object.keys(e.data)[0]
      if (currentKey === key) {
        prepareTotalCount[key] = getTotalCount(e.data[key])
      }
    })
  })
  const keysPagination =
    data?.pagination?.map(e => Object.keys(e.data)[0]) || []
  const preparePagination: { [K in (typeof keysPagination)[number]]: any } = {}
  keysPagination?.map(key => {
    data?.pagination?.forEach(e => {
      const currentKey = Object.keys(e.data)[0]
      if (currentKey === key) {
        preparePagination[key] = e.data[key].meta.pagination || null
      }
    })
  })

  const returnData = {
    pageData: Object.keys(preparePageData).length ? preparePageData : null,
    cities: Object.keys(prepareCitiesData).length ? prepareCitiesData : null,
    otherData: Object.keys(prepareOtherData).length ? prepareOtherData : null,
    totalCount: Object.keys(prepareTotalCount).length
      ? prepareTotalCount
      : null,
    pagination: Object.keys(preparePagination).length
      ? preparePagination
      : null,
  }

  return returnData
}
