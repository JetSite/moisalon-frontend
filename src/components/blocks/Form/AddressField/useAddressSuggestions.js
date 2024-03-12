import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { addressSuggestionsQuery } from "../../../../_graphql-legacy/addressSuggestionsQuery";

const isEnoughLength = (address) => (address ? address.length > 2 : false);

export function useAddressSuggestions(address, count = 10, debounce = 500) {
  const [debouncedAddress] = useDebounce(address, debounce);
  const validAddress = isEnoughLength(debouncedAddress)
    ? debouncedAddress
    : null;
  const { loading, data } = useQuery(addressSuggestionsQuery, {
    variables: {
      address: validAddress,
      count: count,
    },
  });

  if (loading || !data) {
    return { suggestions: [], coordinates: {} };
  }

  const suggestionsFiltered = data.addressSuggestions
    ? data.addressSuggestions.filter(
        (a) => a.unrestrictedValue !== null && a.unrestrictedValue !== undefined
      )
    : [];
  const coordinates =
    suggestionsFiltered.length === 1 ? suggestionsFiltered[0].data : {};

  const suggestions = suggestionsFiltered.map((a) => a.unrestrictedValue);

  return { suggestions, coordinates };
}
