import { useQuery } from "@apollo/react-hooks";
import { citySuggestionsQuery } from "../../../../../_graphql-legacy/city/citySuggestionsQuery";

export function useCitySuggestions(city, count = 10) {
  const { loading, data } = useQuery(citySuggestionsQuery, {
    variables: {
      city: city,
      count: count,
    },
  });

  if (loading || !data) {
    return { suggestions: [] };
  }

  const suggestionsFiltered = data.citySuggestions
    ? data.citySuggestions.filter(
        (a) =>
          (a.data.city !== null && a.data.city !== undefined) ||
          (a.data.settlement !== null && a.data.settlement !== undefined)
      )
    : [];

  const suggestions = suggestionsFiltered.map(
    (a) => a.data.city || a.data.settlement
  );

  return { suggestions };
}
