import styled from 'styled-components'
import scrollIntoView from 'scroll-into-view'
import { useRouter } from 'next/router'
import { red, laptopBreakpoint } from '../../../../../../styles/variables'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { cyrToTranslit } from '../../../../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { Dispatch, FC, SetStateAction } from 'react'
import { ISetState, LazyType } from 'src/types/common'
import { IMasterCabinetTab } from 'src/components/pages/Master/MasterCabinet'

const Wrapper = styled.div`
  margin-top: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const Back = styled.div`
  background: url('/icon-back.svg') no-repeat center;
  position: absolute;
  width: 10px;
  height: 10px;
  background-size: contain;
  content: '';
  left: -20px;
  top: 50%;
  margin-top: -5px;
`

const Tab = styled.div`
  position: relative;
  display: block;
`

const Text = styled.div<{ active?: boolean; disable?: boolean }>`
  display: inline-block;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  opacity: ${props => (props.disable ? '0.3' : '')};
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  text-decoration: ${props => (props.active ? 'underline' : '')};
  transition: 0.5s;
  &:hover {
    color: ${props => (props.disable ? 'inherit' : '#f03')};
  }
`

const TextRed = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  cursor: pointer;
  color: #f03;
`

const Quantity = styled.div`
  position: relative;
  bottom: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-left: 15px;
  color: #fff;
  background-color: ${red};
  border-radius: 50%;
  font-size: 9px;
  font-weight: 600;
  text-decoration: none;
`

interface Props {
  tabs: IMasterCabinetTab[]
  setActiveTab: ISetState<string>
  activeTab: string
}

const Tabs: FC<Props> = ({ tabs, setActiveTab, activeTab }) => {
  const router = useRouter()
  const { setMe, logout } = useAuthStore(getStoreEvent)
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
  const handleClick = (item: any) => {
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
        <Tab key={item.value}>
          {item.title ? (
            <Text
              disable={item.disable}
              onClick={() => !item.disable && setActiveTab(item.value)}
              active={item.value === activeTab}
            >
              {item.title}
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
