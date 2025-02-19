import { ApolloQueryResult } from '@apollo/client'
import { flattenStrapiResponse } from '../flattenStrapiResponse'

/**
 * Processes an Apollo query result and extracts data for a specific object
 * @template T - The expected type of the processed data
 * @param {PromiseSettledResult<ApolloQueryResult<Record<string, unknown>>>} data - The settled promise result from Apollo
 * @param {string} objectName - The name of the object to extract from the query result
 * @returns {T | null} The processed data or null if the promise was rejected
 */

export const getPrepareData = <T>(
  data:
    | PromiseSettledResult<ApolloQueryResult<Record<string, unknown>>>
    | undefined,
  objectName: string,
): T | null => {
  let response: T | null = null

  if (!data || data.status === 'rejected') {
    console.error('Failed to fetch products:', data?.reason)
    return null
  }

  if (data.status === 'fulfilled') {
    try {
      const rawData = data.value.data[objectName]
      if (rawData === undefined) {
        throw new Error(`Object "${objectName}" not found in query result`)
      }
      response = flattenStrapiResponse(rawData) as T
    } catch (error) {
      console.error('Error processing query result:', error)
      throw error
    }
  }

  return response
}
