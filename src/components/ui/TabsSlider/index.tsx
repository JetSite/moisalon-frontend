import { Wrapper, Item, Count, Text, Content, OnlineButton } from './styles'
import scrollIntoView from 'scroll-into-view'
import {
  urlPatternHttp,
  urlPatternHttps,
} from '../../../utils/newUtils/common/checkUrls'
import { FC } from 'react'
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
          <OnlineBookingButton salon={salon as ISalon}>
            <OnlineButton> Онлайн бронирование</OnlineButton>
          </OnlineBookingButton>
        ) : null}
      </Content>
    </Wrapper>
  )
}

export default TabsSlider
