import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { getBrandsByName } from 'src/api/graphql/brand/queries/getBrandsByName'
import { IBrand } from 'src/types/brands'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { useDebounce } from 'use-debounce'

interface IUseBrandsSuggestResult {
  loading: boolean
  suggestions: string[]
  data: IBrand[] | null
}

export type IUseBrandsSuggest = (
  value: string,
  initialValues: string[],
  debounce?: number,
) => IUseBrandsSuggestResult

export const useBrandsSuggest: IUseBrandsSuggest = (
  value,
  initialValues,
  debounce = 500,
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IBrand[] | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>(initialValues)
  const [debouncedValue] = useDebounce(value, debounce)
  const [getBrands] = useLazyQuery(getBrandsByName)

  useEffect(() => {
    if (!debouncedValue.length || initialValues[0].includes(debouncedValue)) {
      setSuggestions(initialValues)
    } else {
      setLoading(true)
      getBrands({
        variables: { name: debouncedValue },
        onCompleted: data => {
          const prepareData: IBrand[] = flattenStrapiResponse(data.brands)
          setData(prepareData)
          setSuggestions([initialValues[0], ...prepareData.map(e => e.name)])
          setLoading(false)
        },
        onError: error => {
          setLoading(false)
          console.log(error)
        },
      })
    }
  }, [debouncedValue])

  return { loading, suggestions, data }
}
