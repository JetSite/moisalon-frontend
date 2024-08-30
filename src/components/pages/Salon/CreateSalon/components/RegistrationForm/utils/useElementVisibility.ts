import { RefObject, useCallback, useEffect } from 'react'
import { ISetState } from 'src/types/common'
import scrollIntoView from 'scroll-into-view'
import { ITab } from '../../../config'

export const useElementVisibility = (
  elements: Array<{
    ref: RefObject<HTMLDivElement>
    setVisible: ISetState<boolean | string>
  }>,
  tabs: ITab[],
) => {
  const handleScroll = useCallback(() => {
    elements.forEach(({ ref, setVisible }) => {
      if (ref.current) {
        const posTop = ref.current.getBoundingClientRect()?.top
        const isVisible = posTop > 0 ? window.innerHeight > posTop : false
        setVisible(isVisible)
      }
    })
  }, [elements])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleClick = useCallback(
    (number: number) => {
      const newTab = tabs.find(item => +item.id === number + 1) || tabs[0]
      const element = document.getElementById(newTab.anchor.replace('#', ''))
      if (element) {
        scrollIntoView(element, {
          time: 500,
          align: {
            top: 0,
            topOffset: 100,
          },
        })
      }
    },
    [tabs],
  )

  return { handleScroll, handleClick }
}
