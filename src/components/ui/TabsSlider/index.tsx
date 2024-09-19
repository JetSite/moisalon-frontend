import * as Styled from './styles'
import scrollIntoView from 'scroll-into-view'
import { FC, useEffect, useRef, useState } from 'react'
import { ISalon, ISalonPage } from 'src/types/salon'
import { OnlineBookingButton } from 'src/components/blocks/OnlineBookingButton'

export interface ITab {
  id: number
  text: string
  link: string
  count?: number
  show: boolean
}

interface Props {
  tabs: ITab[]
  activeTab: any
  setActiveTab: any
  rent?: any
  salon?: ISalonPage
}

const TabsSlider: FC<Props> = ({
  tabs,
  activeTab,
  setActiveTab,
  rent,
  salon,
}) => {
  const [isSticky, setIsSticky] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClick = (item: ITab) => {
    const element = document.getElementById(item.link.replace('#', ''))
    if (element) {
      scrollIntoView(element, {
        time: 500,
        align: {
          top: 0,
          topOffset: 100,
        },
      })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <>
      <div ref={ref} style={{ width: 1 }} />
      <Styled.Wrapper ref={wrapperRef} isSticky={isSticky}>
        <Styled.Content>
          {tabs.map((item, i) =>
            item.show ? (
              <Styled.Item
                active={i == activeTab}
                onClick={() => {
                  setActiveTab(i)
                  handleClick(item)
                }}
                key={i}
              >
                <Styled.Text>{item.text}</Styled.Text>
                {item.count ? <Styled.Count>{item.count}</Styled.Count> : null}
              </Styled.Item>
            ) : null,
          )}
          {rent ? (
            <OnlineBookingButton salon={salon as ISalon}>
              <Styled.OnlineButton> Онлайн бронирование</Styled.OnlineButton>
            </OnlineBookingButton>
          ) : null}
        </Styled.Content>
      </Styled.Wrapper>
    </>
  )
}

export default TabsSlider
