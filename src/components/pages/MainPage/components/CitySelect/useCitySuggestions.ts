import { useQuery } from '@apollo/react-hooks'
import { getSearchCity } from 'src/api/graphql/city/getSearchCity'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'

type IUseCitySuggestions = (city: string) => {
  suggestions: ICity[] | []
  loading: boolean
}

export const useCitySuggestions: IUseCitySuggestions = (city: string) => {
  const { loading, data } = useQuery(getSearchCity, {
    variables: {
      name: city,
    },
  })

  if (!city || city?.length < 2) return { suggestions: [], loading: false }

  if (loading || !data) {
    return { suggestions: [], loading }
  }

  const suggestions = flattenStrapiResponse(data.cities) as ICity[]

  return { suggestions, loading }
}
