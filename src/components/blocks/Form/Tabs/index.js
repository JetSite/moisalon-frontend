import styled from 'styled-components'
import scrollIntoView from 'scroll-into-view'
import { useRouter } from 'next/router'
import { red, laptopBreakpoint } from '../../../../styles/variables'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

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
  cursor: pointer;
  position: relative;
  display: block;
`

const Text = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  text-decoration: ${props => (props.active ? 'underline' : '')};
  transition: 0.5s;
  &:hover {
    color: #f03;
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

const Tabs = ({ tabs, refActive }) => {
  const router = useRouter()
  const { setMe } = useAuthStore(getStoreEvent)
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
  const handleClick = item => {
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

  const handleLogout = async () => {
    const resData = await fetch(
      dev
        ? 'https://stage-passport.moi.salon/api/logout'
        : 'https://passport.moi.salon/api/logout',
      {
        credentials: 'include',
        'Access-Control-Allow-Credentials': true,
      },
    )

    if (resData.status === 200) {
      await refetch()
      router.push(`/${cyrToTranslit(city)}`)
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
          handleLogout()
        }}
      >
        Выход
      </TextRed>
    </Wrapper>
  )
}

export default Tabs
