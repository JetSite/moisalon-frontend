import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { PRODUCT_CATEGORIES_BY_TITLE } from 'src/api/graphql/product/queries/getProductCategoriesByTitle'
import { IProductCategories } from 'src/types/product'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { useDebounce } from 'use-debounce'

interface IUseProductCategorysSuggestResult {
  loading: boolean
  suggestions: string[]
  data: IProductCategories[] | null
}

export type IUseProductCategorysSuggest = (
  value: string,
  initialValues: string[],
  debounce?: number,
) => IUseProductCategorysSuggestResult

export const useProductCategorysSuggest: IUseProductCategorysSuggest = (
  value,
  initialValues,
  debounce = 500,
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IProductCategories[] | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>(initialValues)
  const [debouncedValue] = useDebounce(value, debounce)
  const [getProductCategorys] = useLazyQuery(PRODUCT_CATEGORIES_BY_TITLE)

  useEffect(() => {
    if (!debouncedValue.length || initialValues[0].includes(debouncedValue)) {
      setSuggestions(initialValues)
    } else {
      setLoading(true)
      getProductCategorys({
        variables: { title: debouncedValue },
        onCompleted: data => {
          const prepareData: IProductCategories[] = flattenStrapiResponse(
            data.productCategories,
          )
          setData(prepareData)
          setSuggestions([initialValues[0], ...prepareData.map(e => e.title)])
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
