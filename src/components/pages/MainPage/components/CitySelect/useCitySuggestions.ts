import { useQuery } from '@apollo/react-hooks'
import { citySuggestionsQuery } from '../../../../../_graphql-legacy/city/citySuggestionsQuery'
import { getSearchCity } from 'src/api/graphql/city/getSearchCity'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'

type IUseCitySuggestions = (city: string) => { suggestions: ICity[] | [] }

export const useCitySuggestions: IUseCitySuggestions = (city: string) => {
  if (!city || city?.length < 2) return { suggestions: [] }
  const { loading, data } = useQuery(getSearchCity, {
    variables: {
      cityName: city,
    },
  })

  if (loading || !data) {
    return { suggestions: [] }
  }

  // const suggestionsFiltered = data.citySuggestions
  //   ? data.citySuggestions.filter(
  //       (
  //         a: any, //TODO: any
  //       ) =>
  //         (a.data.city !== null && a.data.city !== undefined) ||
  //         (a.data.settlement !== null && a.data.settlement !== undefined),
  //     )
  //   : []

  // const suggestions = suggestionsFiltered.map(
  //   (a: any) => a.data.city || a.data.settlement, //TODO: any
  // )

  const suggestions = flattenStrapiResponse(data.cities) as ICity[]

  return { suggestions }
}
