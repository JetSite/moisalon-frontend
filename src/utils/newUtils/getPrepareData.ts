import { ApolloQueryResult } from '@apollo/client'
import { flattenStrapiResponse } from '../flattenStrapiResponse'

export const getPrepareData = <T>(
  data: PromiseSettledResult<ApolloQueryResult<any>>,
  objectName: string,
): T | null => {
  let response: T | null = null

  if (data.status === 'fulfilled') {
    response = flattenStrapiResponse(data.value.data[objectName]) as T
  }

  return response
}
