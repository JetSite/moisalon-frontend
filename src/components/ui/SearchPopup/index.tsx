import { useState, useEffect, useRef, FC, RefObject } from 'react'
import styled from 'styled-components'
import SearchBlock from './components/SearchBlock'
import SearchResults from './components/SearchResults'
import { laptopBreakpoint } from '../../../styles/variables'
import { ISetState } from 'src/types/common'
import { ISearchQuery } from './components/Search'

const SearchPopupWrapper = styled.section`
  position: fixed;
  top: 112px;
  left: 0;
  width: 100%;
  min-height: 483px;
  padding-bottom: 87px;
  background: #fff;
  box-shadow: 0 4px 6px -6px rgba(0, 0, 0, 0.7);
  z-index: 1000;

  @media (max-width: ${laptopBreakpoint}) {
    height: 100%;
    padding: 0;
    top: 80px;
    box-shadow: none;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`

interface Props {
  showSearchPopup: boolean
  setShowSearchPopup: ISetState<boolean>
  setFillSearch: ISetState<string>
  fillFav: string
  fillProfile: string
  fillCart: string
}

const SearchPopup: FC<Props> = ({
  showSearchPopup,
  setShowSearchPopup,
  fillFav,
  fillProfile,
  fillCart,
  setFillSearch,
}) => {
  const [query, setQuery] = useState<ISearchQuery>({ query: '', city: '' })
  const searchPopupRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (showSearchPopup) {
      document.body.style.overflowY = 'hidden'
      document.documentElement.style.overflowY = 'hidden'
      // document.body.style.paddingRight = "17px";
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflowY = 'scroll'
      // document.body.style.paddingRight = "0";
    }
  }, [fillFav, fillProfile, fillCart])

  const useOutsideClick = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node

        if (ref.current && !ref.current.contains(target)) {
          setShowSearchPopup(false)
          setFillSearch('#000')
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  useOutsideClick(searchPopupRef)

  return (
    <SearchPopupWrapper ref={searchPopupRef}>
      <SearchBlock
        title="Найти услугу / специалиста / косметику"
        query={query}
        setQuery={setQuery}
      />
      <SearchResults setShowSearchPopup={setShowSearchPopup} query={query} />
    </SearchPopupWrapper>
  )
}

export default SearchPopup
