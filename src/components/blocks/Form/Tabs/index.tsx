import styled from 'styled-components'
import scrollIntoView from 'scroll-into-view'
import { useRouter } from 'next/router'
import { red, laptopBreakpoint } from '../../../../styles/variables'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import {
  Back,
  Quantity,
  Tab,
  TabButton,
  TabLink,
  TextRed,
  Wrapper,
} from './style'
import { FC, useState } from 'react'
import { ITab } from 'src/components/pages/Salon/CreateSalon/config'
import Popup from 'src/components/ui/Popup'
import Button from 'src/components/ui/Button'

interface Props {
  tabs: ITab[]
  refActive?: string | boolean
  dirtyForm: boolean
}

const Tabs: FC<Props> = ({ tabs, refActive, dirtyForm }) => {
  const router = useRouter()
  const { logout } = useAuthStore(getStoreEvent)
  const [open, setOpen] = useState(false)

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
  const handlePopupClose = () => {
    setOpen(false)
  }
  return (
    <Wrapper>
      {tabs.map(item => {
        const link =
          item.href && item.link ? item.href + '?id=' + item.link : null

        return (
          <Tab key={item.id}>
            {item.back && <Back />}
            {item.value && (
              <>
                {link ? (
                  <TabLink href={link} active={item.id === refActive}>
                    {item.value}
                  </TabLink>
                ) : (
                  <TabButton
                    onClick={() => handleClick(item)}
                    active={item.id === refActive}
                  >
                    {item.value}
                  </TabButton>
                )}
              </>
            )}
            {item.quantity && <Quantity>{item.quantity}</Quantity>}
          </Tab>
        )
      })}
      {router?.asPath !== '/masterCabinet' ? (
        <Tab>
          {dirtyForm ? (
            <TabButton
              onClick={() => {
                setOpen(true)
              }}
            >
              Назад в кабинет пользователя
            </TabButton>
          ) : (
            <TabLink href="/masterCabinet">
              Назад в кабинет пользователя
            </TabLink>
          )}
        </Tab>
      ) : null}
      <TextRed
        onClick={() => {
          logout(router)
        }}
      >
        Выход
      </TextRed>
      <Popup
        isOpen={open}
        onClose={handlePopupClose}
        title="Вы прерываете заполнение профиля!"
        description=""
        content={() => {
          return <p>Вся несохраненная информация будет утеряна. Вы уверены?</p>
        }}
      >
        <Button
          onClick={() => router.push('/masterCabinet')}
          style={{ marginTop: 25 }}
          variant="gray"
        >
          Выйти
        </Button>
        <Button
          onClick={handlePopupClose}
          style={{ marginTop: 25 }}
          variant="red"
        >
          Остаться
        </Button>
      </Popup>
    </Wrapper>
  )
}

export default Tabs
