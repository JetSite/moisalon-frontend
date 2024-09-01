import scrollIntoView from 'scroll-into-view'
import { useRouter } from 'next/router'
import { getStoreEvent } from 'src/store/utils'
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
import { FC } from 'react'
import { ITab } from 'src/components/pages/Salon/CreateSalon/config'

interface Props {
  tabs: ITab[]
  refActive?: string | boolean
  dirtyForm: boolean
}

const Tabs: FC<Props> = ({ tabs, refActive, dirtyForm }) => {
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
          <TabLink href="/masterCabinet">Назад в кабинет пользователя</TabLink>
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
