import { FC } from 'react'
import { useAutoSuggest } from 'src/components/newUI/Inputs/utils/useAutoSuggest'
import NewAutosuggestField from 'src/components/newUI/Inputs/AutosuggestField/NewAutosuggestField'
import { BaseTextFieldProps } from '@material-ui/core'
import { ISetState } from 'src/types/common'
import { useLazyQuery, useQuery } from '@apollo/client'
import { PRODUCT_CATEGORIES_BY_TITLE } from 'src/api/graphql/product/queries/getProductCategoriesByTitle'
import { PRODUCT_CATEGORIES } from 'src/api/graphql/product/queries/getProductCategories'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IProductCategories } from 'src/types/product'

export interface ISearchProductCategoryAutosuggest
  extends Pick<BaseTextFieldProps, 'label' | 'fullWidth'> {
  clearFilterTitle: string
  name: string
  color?: string
  setSelectValue: ISetState<string | null>
}

export const SearchProductCategoryAutosuggest: FC<
  ISearchProductCategoryAutosuggest
> = ({ setSelectValue, clearFilterTitle: defaultValue, name, ...props }) => {
  const [getNewValues] = useLazyQuery(PRODUCT_CATEGORIES_BY_TITLE)

  const { data: dataInitial, loading: initialLoading } = useQuery(
    PRODUCT_CATEGORIES,
    {
      variables: { itemsCount: 10, isAvailableInStock: 0 },
      onError: error => {
        console.error('Failed to fetch initial product categories:', error)
      },
    },
  )

  const { suggestions, loading, handleFetch, inputProps } =
    useAutoSuggest<IProductCategories>({
      name,
      searchKey: 'title',
      defaultValue,
      dataInitial: flattenStrapiResponse(dataInitial?.productCategories),
      initialLoading,
      getNewValues,
    })

  return (
    <NewAutosuggestField
      disabled={initialLoading}
      {...props}
      handleFetch={handleFetch}
      handleSelected={(_, { suggestion }) => {
        setSelectValue(suggestion !== defaultValue ? suggestion : null)
      }}
      suggestions={suggestions}
      loading={loading || initialLoading}
      input={inputProps}
    />
  )
}
