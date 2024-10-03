import { FC, useEffect, useState } from 'react'
import AutosuggestField from 'src/components/blocks/Form/AddressField/AutosuggestField'
import { useBrandsSuggest } from 'src/hooks/inputs/useBrandsSuggest'
import { IBrand } from 'src/types/brands'
import { IID } from 'src/types/common'

export type ISuggestHandleChange = (
  data: { id: IID; title?: string; name?: string } | null,
  loading: boolean,
) => void

interface Props {
  handleChange?: ISuggestHandleChange
  initialValues: IBrand[]
  name: string
  fullWidth?: boolean
  defaultValue?: string
  label?: string
  color?: string
  noSearch?: boolean
  reset?: boolean
}

export const SearchBrandAutosuggest: FC<Props> = ({
  handleChange,
  defaultValue,
  initialValues,
  fullWidth = false,
  label = 'Бренды',
  name,
  color,
  noSearch,
  reset,
}) => {
  const initialStringArr = initialValues.map(e => e.name)

  const [value, setValue] = useState<string>(
    defaultValue || initialStringArr[0],
  )

  useEffect(() => {
    if (reset) {
      setValue(defaultValue || initialStringArr[0])
    }
  }, [reset])

  let prepareInitialValues = initialStringArr

  if (defaultValue) {
    if (initialStringArr.find(e => e === defaultValue)) {
      const filtredValues = initialStringArr.filter(e => e !== defaultValue)
      prepareInitialValues = [defaultValue, ...filtredValues]
    } else {
      prepareInitialValues = [defaultValue, ...initialStringArr]
    }
  }

  const { suggestions, loading, data } = useBrandsSuggest(
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
            initialValues.find(el => el.name === e) || null

          const findData = data && data.find(el => el.name === e)
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
