import { useQuery } from '@apollo/react-hooks'
import { citySuggestionsQuery } from '../../../../../_graphql-legacy/city/citySuggestionsQuery'

export function useCitySuggestions(city: string, count = 10) {
  const { loading, data } = useQuery(citySuggestionsQuery, {
    variables: {
      city: city,
      count: count,
    },
  })

  if (loading || !data) {
    return { suggestions: [] }
  }

  const suggestionsFiltered = data.citySuggestions
    ? data.citySuggestions.filter(
        (a: any) => //TODO: any
          (a.data.city !== null && a.data.city !== undefined) ||
          (a.data.settlement !== null && a.data.settlement !== undefined),
      )
    : []

  const suggestions = suggestionsFiltered.map(
    (a: any) => a.data.city || a.data.settlement, //TODO: any
  )

  return { suggestions }
}
