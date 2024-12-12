import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { initializeApollo } from '../apollo-client'
import { ParsedUrlQuery } from 'querystring'
import { getCities } from '../graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'
import { getSalonPage } from '../graphql/salon/queries/getSalon'
import { getSalonsThroughCity } from '../graphql/salon/queries/getSalonsThroughCity'
import { ISalonPage } from 'src/types/salon'
import { DocumentNode } from 'graphql'
import { IID } from 'src/types/common'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'

export interface IStandartEntityItem {
  city: ICity
  id: IID
}

export interface StaticProps<T> {
  id?: string
  city?: string
  entity: T | null
}

interface Params extends ParsedUrlQuery {
  id: string
  city: string
}

export const getStaticPropsForEntityPage = <T>(
  query: DocumentNode,
  keyName: string,
) => {
  const getStaticProps: GetStaticProps<StaticProps<T>, Params> = async (
    context: GetStaticPropsContext<Params>,
  ) => {
    const { params } = context
    const apolloClient = initializeApollo()

    if (!params?.id || !params.city)
      return {
        notFound: true,
      }

    const entityData = await apolloClient.query({
      query,
      variables: {
        id: params?.id,
      },
    })

    const entity: T | null = flattenStrapiResponse(entityData.data[keyName])

    return {
      props: {
        id: params?.id,
        city: params?.city,
        entity,
      },
    }
  }
  return getStaticProps
}

export const getEntityStaticPaths = <T extends IStandartEntityItem>(
  query: DocumentNode,
  keyName: string,
) => {
  const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo()
    const citiesData = await apolloClient.query({
      query: getCities,
      variables: {
        itemsCount: 100,
      },
    })

    const errorReturn = {
      paths: [],
      fallback: true,
    }

    const cities: ICity[] | null = flattenStrapiResponse(citiesData.data.cities)

    if (!cities || !cities.length) return errorReturn

    const entitiesData = await Promise.allSettled(
      cities.map(city =>
        apolloClient.query({
          query,
          variables: {
            slug: city.slug,
            itemsCount: 10,
          },
        }),
      ),
    )
    const entities = entitiesData
      .flatMap(response => getPrepareData<T[]>(response, keyName))
      .filter((response): response is T & IStandartEntityItem =>
        Boolean(response?.city),
      )

    if (!entities || !entities.length) return errorReturn

    return {
      paths: entities
        .filter(entity => Boolean(entity.city))
        .map(entity => {
          return {
            params: {
              city: entity.city.slug,
              id: entity.id,
            },
          }
        }),
      fallback: true,
    }
  }
  return getStaticPaths
}
