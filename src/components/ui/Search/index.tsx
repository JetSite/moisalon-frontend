import {
  useState,
  useEffect,
  FC,
  KeyboardEventHandler,
  ChangeEventHandler,
  useMemo,
} from 'react'
import { useRouter } from 'next/router'
import { Input, Wrapper, InputWrap, ClearIcon } from './styled'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import Tags from '../Tags'
import { tagsSwitch } from './utils'
import { useQuerySearch } from './utils/useQuerySearch'

interface Props {
  title?: string
  noFilters: boolean
}

const Search: FC<Props> = ({ title, noFilters }) => {
  const { query, pathname } = useRouter()
  const [inputValue, setInputValue] = useState<string>(
    (query.search as string) || '',
  )
  const { city } = useAuthStore(getStoreData)
  const {
    isSearchablePath,
    updateSearchParam,
    redirectToMainPathSearch,
    clearSearchQuery,
  } = useQuerySearch(city)

  const queryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const search = e.target.value
    setInputValue(search)
    if (isSearchablePath) {
      updateSearchParam(search)
    }
    return
  }

  const queryTag = (item: string) => {
    setInputValue(item)
    if (isSearchablePath) {
      updateSearchParam(item)
    } else {
      redirectToMainPathSearch(item)
    }
  }

  const inputSubmitHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLInputElement
    if (e.key !== 'Enter') return

    if (isSearchablePath) {
      target.blur()
      window.scrollTo({
        top: 300,
        behavior: 'smooth',
      })

      if (inputValue === '') {
        clearSearchQuery()
      } else {
        updateSearchParam(inputValue)
      }
    } else {
      redirectToMainPathSearch(inputValue)
    }
  }

  useEffect(() => {
    if (isSearchablePath) {
      setInputValue(query.search as string)

      if (query.search) {
        window.scrollTo({
          top: 300,
          behavior: 'smooth',
        })
      }
    }
  }, [pathname])

  return (
    <Wrapper>
      <InputWrap noFilters={noFilters}>
        <Input
          placeholder={title || 'Найти услугу / специалиста / косметику'}
          value={inputValue}
          onChange={queryHandler}
          onKeyDown={inputSubmitHandler}
          type="search"
        />
        <ClearIcon
          onClick={() => {
            setInputValue('')
            clearSearchQuery()
          }}
        />
      </InputWrap>
      {!noFilters ? (
        <Tags tags={tagsSwitch(pathname)} queryTag={queryTag} />
      ) : null}
    </Wrapper>
  )
}

export default Search
