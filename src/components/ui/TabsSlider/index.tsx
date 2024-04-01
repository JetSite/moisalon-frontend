import { Wrapper, Item, Count, Text, Content, OnlineButton } from './styles'
import scrollIntoView from 'scroll-into-view'
import { urlPatternHttp, urlPatternHttps } from '../../../utils/checkUrls'
import { FC } from 'react'
import { ISalonPage } from 'src/types/salon'

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

  return (
    <Wrapper>
      <Content>
        {tabs.map((item, i) =>
          item.show ? (
            <Item
              active={i == activeTab}
              onClick={() => {
                setActiveTab(i)
                handleClick(item)
              }}
              key={i}
            >
              <Text>{item.text}</Text>
              {item.count ? <Count>{item.count}</Count> : null}
            </Item>
          ) : null,
        )}
        {rent ? (
          salon?.salonOnlineBookingUrl ? (
            <noindex style={{ width: '100%' }}>
              <OnlineButton
                target="_blank"
                rel="nofollow"
                href={
                  urlPatternHttp.test(salon?.salonOnlineBookingUrl) ||
                  urlPatternHttps.test(salon?.salonOnlineBookingUrl)
                    ? salon?.salonOnlineBookingUrl
                    : `https://${salon?.salonOnlineBookingUrl}`
                }
              >
                Онлайн бронирование
              </OnlineButton>
            </noindex>
          ) : (
            <OnlineButton href={`tel:${salon?.salonPhones[0]?.phoneNumber}`}>
              Онлайн бронирование
            </OnlineButton>
          )
        ) : null}
      </Content>
    </Wrapper>
  )
}

export default TabsSlider
