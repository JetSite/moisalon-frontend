import { useEffect, useMemo, useState } from 'react'
import { SuggestionsFetchRequested } from 'react-autosuggest'
import { FieldInputProps } from 'react-final-form'
import { IApolloLazyRefetch } from 'src/types/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { debounce as _debounce } from 'lodash'

interface IUseAutoSuggestResult<T> {
  loading: boolean
  suggestions: string[]
  initialLoading: boolean
  handleFetch: SuggestionsFetchRequested
  inputProps: FieldInputProps<string>
  data: T[]
  error: Error | null
}

interface Props<T> {
  name: string
  defaultValue: string
  dataInitial: T[] | null
  initialLoading: boolean
  getNewValues: IApolloLazyRefetch
  searchKey: StringKeys<T>
}

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

export const useAutoSuggest = <T,>(
  {
    dataInitial,
    defaultValue,
    initialLoading,
    getNewValues,
    name,
    searchKey,
  }: Props<T>,
  debounce = 500,
): IUseAutoSuggestResult<T> => {
  const [initialSuggestions, setInitialSuggestions] = useState<string[]>([
    defaultValue,
  ])
  const [value, setValue] = useState<string>(defaultValue)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<Error | null>(null)

  const debouncedFetch = useMemo(
    () =>
      _debounce((value: string) => {
        if (value.length > 2 && value !== defaultValue) {
          setLoading(true)
          getNewValues({
            variables: { [searchKey]: value },
            onCompleted: data => {
              const prepareData = flattenStrapiResponse(data[name]) as T[]
              setData(prepareData as T[])
              const newSuggestions = prepareData
                .map(e => {
                  const string = e[searchKey]
                  if (typeof string === 'string') {
                    return string.trim()
                  }
                })
                .filter((value): value is string => Boolean(value))
              setSuggestions(filterSuggestions(value, newSuggestions))

              setLoading(false)
            },
            onError: error => {
              setLoading(false)
              console.error('The error or update state ' + name + ': ', error)
              setError(error)
            },
          })
        }
      }, debounce),
    [defaultValue, getNewValues, searchKey],
  )

  useEffect(() => {
    if (dataInitial && initialSuggestions.length === 1) {
      const prepareInitialValues = dataInitial
        .map(e => {
          const string = e[searchKey]
          if (typeof string === 'string') {
            return string.trim()
          }
        })
        .filter((value): value is string => Boolean(value))
      setInitialSuggestions(prev => [
        ...new Set([...prev, ...prepareInitialValues]),
      ])
      setData(dataInitial ?? [])
    }
  }, [dataInitial])

  useEffect(() => {
    setSuggestions(initialSuggestions)
  }, [initialSuggestions])

  const filterSuggestions = (input: string, array: string[]): string[] => {
    const prepareInput = input.trim()
    if (prepareInput.length < 3 || prepareInput === defaultValue) {
      return initialSuggestions
    }

    const newSuggestions = [...new Set(array)].filter(item =>
      item.toLowerCase().includes(prepareInput.toLowerCase()),
    )
    return [defaultValue, ...newSuggestions]
  }

  const handleFetch: SuggestionsFetchRequested = ({ value }) => {
    if (value.length > 2 && value !== defaultValue) {
      setLoading(true)
      debouncedFetch(value)
    } else setSuggestions(filterSuggestions(value, initialSuggestions))
  }

  const onFocus = () => {
    if (value === defaultValue) {
      setValue('')
    }
  }

  const onBlur = () => {
    if (value === '') {
      setValue(defaultValue ?? '')
    }
  }

  const onChange: FieldInputProps<string>['onChange'] = eventOrValue => {
    const currentValue =
      typeof eventOrValue === 'string'
        ? eventOrValue // Прямое значение
        : eventOrValue.target?.value // Значение из события

    if (currentValue !== undefined) {
      setValue(currentValue)
    }
  }

  return {
    loading,
    suggestions,
    handleFetch,
    initialLoading,
    data,
    error,
    inputProps: {
      onChange,
      onBlur,
      onFocus,
      value,
      name,
    },
  }
}
