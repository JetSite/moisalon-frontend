import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import { MainContainer } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import { Wrapper } from './styled'
import ControlsTabs from '../../../blocks/Form/ControlsTabs'
import { useMutation } from '@apollo/client'
import CabinetForm from '../../../blocks/Cabinet/components/CabinetForm'
import { changeDataMutation } from '../../../../_graphql-legacy/changeDataMutation'
import CabinetOrders from '../../../blocks/Cabinet/components/CabinetOrders'
import CabinetProfiles from '../../../blocks/Cabinet/components/CabinetProfiles'
import CabinetListReviews from '../../../blocks/Cabinet/components/CabinetListReviews'
import ProfileCabinetHeaderMobile from '../../../blocks/ProfileCabinetHeaderMobile'
import CabinetFavorits from '../../../blocks/Cabinet/components/CabinetFavorits'
import CabinetSales from '../../../blocks/Cabinet/components/CabinetSales'
import CabinetEducations from '../../../blocks/Cabinet/components/CabinetEducations'
import CabinetChat from '../../../blocks/Cabinet/components/CabinetChat'
import CabinetEvents from '../../../blocks/Cabinet/components/CabinetEvents'
import CabinetVacancies from '../../../blocks/Cabinet/components/CabinetVacancies'
import CabinetPriority from '../../../blocks/Cabinet/components/CabinetPriority'
import CabinetBanner from '../../../blocks/Cabinet/components/CabinetBanner'
import { PHOTO_URL } from '../../../../api/variables'
import { useChat } from '../../../../chatContext'
import { IRefetch } from 'src/api/types'
import { IUser } from 'src/types/me'
import { IID } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

export interface IMasterCabinetTab {
  title: string
  value: string
  icon?: string
  quantity?: number
  disable?: boolean
}

interface Props {
  refetch: IRefetch
  user: IUser
}

const MasterCabinet: FC = () => {
  const { user } = useAuthStore(getStoreData)
  const [photoId, setPhotoId] = useState<IID>(user?.info?.avatar?.id || '')
  const [noPhotoError, setNoPhotoError] = useState<boolean>(false)
  const [, setErrors] = useState<string[] | null>(null)
  const [, setErrorPopupOpen] = useState<boolean | null>(null)
  const [toggle, setToggle] = useState(false)
  const { unreadMessagesCount } = useChat()

  const [mutate] = useMutation(changeDataMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: data => {
      console.log(data)
    },
  })

  const handlePhoto = (id: IID) => {
    setPhotoId(id)
    if (id) {
      mutate({
        variables: {
          input: {
            defaultCity: user?.info?.city.cityName,
            displayName: user?.info?.username,
            email: user?.info?.email,
            phoneNumber: user?.info?.phone,
            avatar: id,
          },
        },
      })
    }
  }

  const [activeTab, setActiveTab] = useState<string>('about')
  const router = useRouter()

  useEffect(() => {
    if (router?.query?.tab) {
      setActiveTab(router?.query?.tab as string)
    }
  }, [router?.query?.tab])

  return (
    <>
      <Header />
      <MainContainer>
        <ProfileCabinetHeaderMobile
          user={user}
          tabs={[
            { title: 'Мои данные', value: 'about', icon: '/icon-about.svg' },
            {
              title: 'Мои заказы',
              value: 'orders',
              icon: '/icon-orders.svg',
              quantity: user?.orders?.length,
              disable: true,
            },
            {
              title: 'Моё избранное',
              value: 'favorits',
              icon: '/icon-star.svg',
            },
            {
              title: 'Отзывы клиентов',
              value: 'reviews',
              icon: '/icon-reviews.svg',
            },
            { title: 'Сообщения', value: 'chat', disable: true },
            {
              title: 'Мои акции',
              value: 'sales',
              disable: true,
            },
            {
              title: 'Обучение',
              value: 'educations',
              disable: true,
            },
            {
              title: 'Вакансии',
              value: 'vacancies',
            },
            {
              title: 'Мероприятия',
              value: 'events',
              disable: true,
            },
            { title: 'Размещение', value: 'priority', disable: true },
            { title: 'Реклама', value: 'banner', disable: true },
          ]}
          toggle={toggle}
          setToggle={setToggle}
          setActiveTab={setActiveTab}
        />
        <Wrapper>
          <ControlsTabs
            onAdd={() => {}}
            activeTab={activeTab}
            setPhotoId={handlePhoto}
            setActiveTab={setActiveTab}
            tabs={[
              { title: 'Мои данные', value: 'about' },
              { title: 'Мои профили', value: 'profiles' },
              {
                title: 'Сообщения',
                value: 'chat',
                quantity: unreadMessagesCount,
                disable: true,
              },
              { title: 'Мои заказы', value: 'orders', disable: true },
              { title: 'Моё избранное', value: 'favorits' },
              { title: 'Отзывы клиентов', value: 'reviews' },
              { title: 'Мои акции', value: 'sales', disable: true },
              { title: 'Обучение', value: 'educations', disable: true },
              { title: 'Вакансии', value: 'vacancies' },
              { title: 'Мероприятия', value: 'events', disable: true },
              { title: 'Размещение', value: 'priority', disable: true },
              { title: 'Реклама', value: 'banner', disable: true },
            ]}
            id={null}
            photoType={'master'}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
            photo={
              user?.info?.avatar
                ? {
                    url: `${PHOTO_URL}${user?.info?.avatar.url}`,
                  }
                : { url: '/empty-photo.svg' }
            }
          />
          {activeTab === 'about' ? (
            <CabinetForm
              setNoPhotoError={setNoPhotoError}
              photoId={photoId}
              auth
            />
          ) : activeTab === 'orders' ? (
            <CabinetOrders me={user} />
          ) : activeTab === 'profiles' ? (
            <CabinetProfiles />
          ) : activeTab === 'chat' ? (
            <CabinetChat />
          ) : activeTab === 'reviews' ? (
            <CabinetListReviews />
          ) : activeTab === 'favorits' ? (
            <CabinetFavorits />
          ) : activeTab === 'sales' ? (
            <CabinetSales me={user} />
          ) : activeTab === 'educations' ? (
            <CabinetEducations me={user} />
          ) : activeTab === 'vacancies' ? (
            <CabinetVacancies />
          ) : activeTab === 'events' ? (
            <CabinetEvents me={user} />
          ) : activeTab === 'priority' ? (
            <CabinetPriority me={user} />
          ) : activeTab === 'banner' ? (
            <CabinetBanner />
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default MasterCabinet
