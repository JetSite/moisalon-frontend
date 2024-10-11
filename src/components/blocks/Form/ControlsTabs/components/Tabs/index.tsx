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
import Link from 'next/link'

const Wrapper = styled.nav`
  margin-top: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const Tab = styled.div`
  position: relative;
  display: block;
`

const TextLink = styled(Link)<{ active?: boolean; disable?: boolean }>`
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

const TextRed = styled(Link)`
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
  dirtyForm?: boolean
}

const Tabs: FC<Props> = ({ tabs, setActiveTab, activeTab, dirtyForm }) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  const { logout } = useAuthStore(getStoreEvent)
  const { masterCabinetTabs } = useAuthStore(getStoreData)

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
      {tabs.map(item => {
        const quantity = masterCabinetTabs
          ? masterCabinetTabs[item.value]
          : item.quantity

        return (
          <Tab key={item.value}>
            {item.title ? (
              <TextLink
                shallow
                href={{ query: { tab: item.value } }}
                onClick={e => {
                  if (item.disable) {
                    e.preventDefault()
                  }
                }}
                disable={item.disable}
                data-disable={item.disable}
                active={item.value === activeTab}
              >
                {item.title}
              </TextLink>
            ) : null}
            {quantity && quantity > 0 ? <Quantity>{quantity}</Quantity> : null}
          </Tab>
        )
      })}
      {!router?.asPath.includes('/masterCabinet') ? (
        <Tab>
          <TextLink shallow href={'/masterCabinet'}>
            Назад в кабинет пользователя
          </TextLink>
        </Tab>
      ) : null}
      <TextRed
        shallow
        href={'/' + city.slug}
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
