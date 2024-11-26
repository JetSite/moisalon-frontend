import {
  useState,
  useEffect,
  FC,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react'
import { useRouter } from 'next/router'
import { Input, Wrapper, InputWrap, ClearIcon } from './styled'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import Tags from '../Tags'

const tagsSwitch = (url: string) => {
  const splitUrl = url.split('/')
  switch (splitUrl[1]) {
    case 'master':
      return ['Колорист', 'Бровист', 'Макияж', 'Пилинг', 'Татуаж']
    case 'salon':
      return ['Хаммам', 'Солярий', 'Окрашивание', 'Тату', 'Массаж']
    case 'brand':
      return ['ESTEL', 'Волосы', 'Бальзам', 'Краска', 'Лак']
    case 'brand':
      return ['ESTEL', 'Волосы', 'Бальзам', 'Краска', 'Лак']
    case 'catalog':
      return ['Лечение', 'Шампунь', 'Краска', 'Ногти', 'Кожа']
    case 'catalogB2c':
      return ['Лечение', 'Шампунь', 'Краска', 'Ногти', 'Кожа']
    default:
      return ['Стрижка', 'Маникюр', 'Колорист', 'Массаж', 'Бровист']
  }
}

interface Props {
  title?: string
  noFilters: boolean
}

const Search: FC<Props> = ({ title, noFilters }) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const { city } = useAuthStore(getStoreData)

  const queryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value)
    if (
      router.pathname === '/[city]/master' ||
      router.pathname === '/[city]/salon' ||
      router.pathname === '/[city]/brand' ||
      router.pathname === '/catalogB2cAll' ||
      router.pathname === '/catalogB2c' ||
      router.pathname === '/catalogB2b'
    ) {
    }
    if (
      (router.pathname === '/catalogB2c' ||
        router.pathname === '/catalogB2cAll') &&
      e.target.value === ''
    ) {
      router.push({
        pathname: '/catalogB2cAll',
        query: { query: '', type: 'query' },
      })
      return
    }
    if (router.pathname === '/catalogB2b' && e.target.value === '') {
      return
    }
  }

  const queryTag = (item: string) => {
    setInputValue(item)
    if (
      router.pathname === '/[city]/master' ||
      router.pathname === '/[city]/salon' ||
      router.pathname === '/[city]/brand' ||
      router.pathname === '/catalogB2cAll' ||
      router.pathname === '/catalogB2c'
    ) {
    }
    if (
      router.pathname === '/catalogB2c' ||
      router.pathname === '/catalogB2cAll'
    ) {
      router.push({
        pathname: '/catalogB2cAll',
        query: { query: item, type: 'query' },
      })
      return
    }
    if (router?.query?.id?.length || router?.query?.slug?.length) {
      router.push(
        { pathname: `/${city.slug}`, query: { q: item } },
        `/${city.slug}`,
      )
    }
  }

  const inputSubmitHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (
      (router.pathname == '/[city]/master' ||
        router.pathname == '/[city]/salon' ||
        router.pathname == '/[city]/brand' ||
        router.pathname == '/[city]/rent') &&
      e.key === 'Enter' &&
      inputValue != ''
    ) {
      ;(e.target as HTMLInputElement).blur()
      window.scrollTo({
        top: 300,
        behavior: 'smooth',
      })
    } else {
      if (e.key === 'Enter' && inputValue != '') {
        if (
          router.pathname === '/catalogB2c' ||
          router.pathname === '/catalogB2cAll'
        ) {
          router.push({
            pathname: '/catalogB2cAll',
            query: { query: '', type: 'query' },
          })
          return
        } else if (router.pathname === '/catalogB2b') {
          return
        }
        router.push(
          { pathname: `/${city.slug}`, query: { q: inputValue } },
          `/${city.slug}`,
        )
      }
    }
  }

  useEffect(() => {
    // if (
    //   (router.pathname == "/[city]/master" ||
    //     router.pathname == "/[city]/salon" ||
    //     router.pathname == "/[city]/brand") &&
    //   categoryPageQuery?.query?.length
    // ) {
    //   setInputValue("");
    // } else if (router?.query?.id?.length || router?.query?.slug?.length) {
    //   setInputValue("");
    // } else if (
    //   router?.pathname === "/catalogB2b" ||
    //   router?.pathname === "/catalogB2c"
    // ) {
    //   setInputValue("");
    // }
    if (router?.pathname !== '/' && router?.pathname !== '/[city]') {
      setInputValue('')
    }
  }, [router.pathname])

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
          }}
        />
      </InputWrap>
      {!noFilters ? (
        <Tags tags={tagsSwitch(router.pathname)} queryTag={queryTag} />
      ) : null}
    </Wrapper>
  )
}

export default Search
