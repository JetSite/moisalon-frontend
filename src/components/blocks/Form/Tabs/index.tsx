import styled from 'styled-components'
import scrollIntoView from 'scroll-into-view'
import { useRouter } from 'next/router'
import { red, laptopBreakpoint } from '../../../../styles/variables'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { Back, Quantity, Tab, Text, TextRed, Wrapper } from './style'
import { FC } from 'react'

interface tabs {
  id: string
  href?: string
  back?: boolean
  link?: string
  value?: string
  quantity: string
  anchor: string
}
interface Props {
  tabs: tabs[]
  refActive: string
}

const Tabs: FC<Props> = ({ tabs, refActive }) => {
  const router = useRouter()
  const { setMe, logout } = useAuthStore(getStoreEvent)
  const { city } = useAuthStore(getStoreData)
  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: res => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      })
    },
  })
  const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
  const handleClick = (item: tabs) => {
    const element = document.getElementById(item.anchor.replace('#', ''))
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
      {tabs.map(item => (
        <Tab key={item.id}>
          {item.back ? <Back /> : null}
          {item.value ? (
            <Text
              onClick={() => {
                handleClick(item)
                if (item.href && item.link) {
                  router.push(
                    {
                      pathname: item.href,
                      query: { id: item.link },
                    },
                    item.href,
                  )
                }
              }}
              active={item.id === refActive}
            >
              {item.value}
            </Text>
          ) : null}
          {item.quantity ? <Quantity>{item.quantity}</Quantity> : null}
        </Tab>
      ))}
      {router?.asPath !== '/masterCabinet' ? (
        <Tab>
          <Text onClick={() => router.push('/masterCabinet')}>
            Назад в кабинет пользователя
          </Text>
        </Tab>
      ) : null}
      <TextRed
        onClick={() => {
          logout(router)
        }}
      >
        Выход
      </TextRed>
    </Wrapper>
  )
}

export default Tabs
