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
import { ITab } from 'src/components/pages/Salon/CreateSalon/config'

interface Props {
  tabs: ITab[]
  refActive?: string | boolean
}

const Tabs: FC<Props> = ({ tabs, refActive }) => {
  const router = useRouter()
  const { logout } = useAuthStore(getStoreEvent)

  const handleClick = (item: ITab) => {
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
                  router.push({
                    pathname: item.href,
                    query: { id: item.link },
                  })
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
