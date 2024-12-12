import { FC } from 'react'
import { useAutoSuggest } from 'src/components/newUI/Inputs/utils/useAutoSuggest'
import NewAutosuggestField from 'src/components/newUI/Inputs/AutosuggestField/NewAutosuggestField'
import { BaseTextFieldProps } from '@material-ui/core'
import { ISetState } from 'src/types/common'
import { useLazyQuery, useQuery } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { BRANDS_BY_NAME } from 'src/api/graphql/brand/queries/getBrandsByName'
import { BRANDS_TO_SHOP } from 'src/api/graphql/brand/queries/getBrandToShop'
import { IBrand } from 'src/types/brands'
import { onError } from '@apollo/client/link/error'

export interface ISearchBrandAutosuggest
  extends Pick<BaseTextFieldProps, 'label' | 'fullWidth'> {
  clearFilterTitle: string
  name: string
  color?: string
  setSelectBrand: ISetState<IBrand | null>
}

export const SearchBrandAutosuggest: FC<ISearchBrandAutosuggest> = ({
  setSelectBrand,
  clearFilterTitle: defaultValue,
  name,
  ...props
}) => {
  const [getNewValues] = useLazyQuery(BRANDS_BY_NAME)

  const { data: dataInitial, loading: initialLoading } = useQuery(
    BRANDS_TO_SHOP,
    {
      variables: { itemsCount: 10, isAvailableInStock: 0 },
      onError: error => {
        console.error('Failed to fetch initial brands:', error)
      },
    },
  )

  const { suggestions, loading, handleFetch, inputProps, data } =
    useAutoSuggest<IBrand>({
      searchKey: 'name',
      name,
      defaultValue,
      dataInitial: flattenStrapiResponse(dataInitial?.brands),
      initialLoading,
      getNewValues,
    })

  return (
    <NewAutosuggestField
      disabled={initialLoading}
      {...props}
      handleFetch={handleFetch}
      handleSelected={(_, { suggestion }) => {
        setSelectBrand(data.find(brand => brand.name === suggestion) ?? null)
      }}
      suggestions={suggestions}
      loading={loading || initialLoading}
      input={inputProps}
    />
  )
}
