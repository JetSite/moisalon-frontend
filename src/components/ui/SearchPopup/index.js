import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import SearchBlock from './components/SearchBlock'
import SearchResults from './components/SearchResults'
import { laptopBreakpoint } from '../../../styles/variables'

const SearchPopupWrapper = styled.div`
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

const SearchPopup = ({
  showSearchPopup,
  setShowSearchPopup,
  fillFav,
  fillProfile,
  fillCart,
  setFillSearch,
}) => {
  const [query, setQuery] = useState({})
  const searchPopupRef = useRef()

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

  const useOutsideClick = ref => {
    useEffect(() => {
      const handleClickOutside = e => {
        if (
          e.target.id === 'searchSvg' ||
          e.target.id === 'searchIconPath1' ||
          e.target.id === 'searchIconPath2'
        )
          return
        if (ref.current && !ref.current.contains(e.target)) {
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
    <SearchPopupWrapper show={showSearchPopup} ref={searchPopupRef}>
      <SearchBlock
        title="Найти услугу / специалиста / косметику"
        showSearchPopup={showSearchPopup}
        setShowSearchPopup={setShowSearchPopup}
        query={query}
        setQuery={setQuery}
      />
      <SearchResults setShowSearchPopup={setShowSearchPopup} query={query} />
    </SearchPopupWrapper>
  )
}

export default SearchPopup
