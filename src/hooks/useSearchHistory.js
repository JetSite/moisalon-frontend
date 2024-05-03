import { useEffect } from 'react'

export const useSearchHistory = (data, setData, entity, scrollOffset) => {
  const { searchData, setSearchData, chosenItemId, setChosenItemId } =
    useSearchHistoryContext()
  const { history } = ['', '']

  useEffect(() => {
    const prevRoute = history[history.length - 1]

    if (prevRoute.split('/')[2] === entity && prevRoute.split('/')[3]) {
      setData(searchData)
    } else {
      setSearchData(null)
    }
  }, [])

  useEffect(() => {
    const prevRoute = history[history.length - 2]

    if (prevRoute?.split('/')[2] === entity && prevRoute?.split('/')[3]) {
      const el = document.getElementById(chosenItemId)
      if (el) {
        const yOffset = scrollOffset
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        })
      }
    }
  }, [data])

  useEffect(() => {
    setSearchData(data)
  }, [data])

  return { searchData, setSearchData, chosenItemId, setChosenItemId }
}
