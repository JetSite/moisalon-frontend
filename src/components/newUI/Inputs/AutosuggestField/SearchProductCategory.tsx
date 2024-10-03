import { FC, useEffect, useState } from 'react'
import AutosuggestField from 'src/components/blocks/Form/AddressField/AutosuggestField'
import { useProductCategorysSuggest } from 'src/hooks/inputs/useProductCategorysSuggest'
import { ISuggestHandleChange } from './SearchBrand'
import { IProductCategories } from 'src/types/product'

interface Props {
  handleChange?: ISuggestHandleChange
  initialValues: IProductCategories[]
  name: string
  fullWidth?: boolean
  defaultValue?: string
  label?: string
  color?: string
  noSearch?: boolean
  reset?: boolean
}

export const SearchProductCategoryAutosuggest: FC<Props> = ({
  handleChange,
  defaultValue,
  initialValues,
  fullWidth = false,
  label = 'Категории продукции',
  name,
  color,
  noSearch,
  reset,
}) => {
  const initialStringArr = initialValues.map(e => e.title)
  let prepareInitialValues = initialStringArr

  const [value, setValue] = useState<string>(
    defaultValue || initialStringArr[0],
  )

  useEffect(() => {
    if (reset) {
      setValue(defaultValue || initialStringArr[0])
    }
  }, [reset])

  if (defaultValue) {
    if (initialStringArr.find(e => e === defaultValue)) {
      const filtredValues = initialStringArr.filter(e => e !== defaultValue)
      prepareInitialValues = [defaultValue, ...filtredValues]
    } else {
      prepareInitialValues = [defaultValue, ...initialStringArr]
    }
  }

  const { suggestions, loading, data } = useProductCategorysSuggest(
    value,
    prepareInitialValues,
  )

  return (
    <AutosuggestField
      label={label}
      suggestions={noSearch ? prepareInitialValues : suggestions}
      color={color}
      input={{
        onChange: e => {
          setValue(e)
          const findInitialsData =
            initialValues.find(el => el.title === e) || null

          const findData = data && data.find(el => el.title === e)
          handleChange &&
            handleChange(
              findInitialsData ? findInitialsData : findData ? findData : null,
              loading,
            )
        },
        name,
        value,
      }}
      loading={noSearch ? false : loading}
      fullWidth={fullWidth}
    />
  )
}
