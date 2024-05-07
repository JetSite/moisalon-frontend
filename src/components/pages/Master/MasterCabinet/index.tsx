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
import { IMe } from 'src/types/me'
import { IID } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

export interface IMasterCabinetTab {
  title: string
  value: string
  icon?: string
  quantity?: number
}

interface Props {
  refetch: IRefetch
  me: IMe
}

const MasterCabinet: FC = () => {
  const { me } = useAuthStore(getStoreData)
  const [photoId, setPhotoId] = useState<IID>(me?.info?.avatar?.id || '')
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
            defaultCity: me?.info?.city.cityName,
            displayName: me?.info?.username,
            email: me?.info?.email,
            phoneNumber: me?.info?.phone,
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
          me={me}
          tabs={[
            { title: 'Мои данные', value: 'about', icon: '/icon-about.svg' },
            {
              title: 'Мои заказы',
              value: 'orders',
              icon: '/icon-orders.svg',
              quantity: me?.orders?.length,
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
            { title: 'Сообщения', value: 'chat' },
            {
              title: 'Мои акции',
              value: 'sales',
            },
            {
              title: 'Обучение',
              value: 'educations',
            },
            {
              title: 'Вакансии',
              value: 'vacancies',
            },
            {
              title: 'Мероприятия',
              value: 'events',
            },
            { title: 'Размещение', value: 'priority' },
            { title: 'Реклама', value: 'banner' },
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
              },
              { title: 'Мои заказы', value: 'orders' },
              { title: 'Моё избранное', value: 'favorits' },
              { title: 'Отзывы клиентов', value: 'reviews' },
              { title: 'Мои акции', value: 'sales' },
              { title: 'Обучение', value: 'educations' },
              { title: 'Вакансии', value: 'vacancies' },
              { title: 'Мероприятия', value: 'events' },
              { title: 'Размещение', value: 'priority' },
              { title: 'Реклама', value: 'banner' },
            ]}
            id={null}
            photoType={'master'}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
            photo={
              me?.info?.avatar
                ? {
                    url: `${PHOTO_URL}${me?.info?.avatar.url}`,
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
            <CabinetOrders me={me} />
          ) : activeTab === 'profiles' ? (
            <CabinetProfiles />
          ) : activeTab === 'chat' ? (
            <CabinetChat />
          ) : activeTab === 'reviews' ? (
            <CabinetListReviews />
          ) : activeTab === 'favorits' ? (
            <CabinetFavorits />
          ) : activeTab === 'sales' ? (
            <CabinetSales me={me} />
          ) : activeTab === 'educations' ? (
            <CabinetEducations me={me} />
          ) : activeTab === 'vacancies' ? (
            <CabinetVacancies />
          ) : activeTab === 'events' ? (
            <CabinetEvents me={me} />
          ) : activeTab === 'priority' ? (
            <CabinetPriority me={me} />
          ) : activeTab === 'banner' ? (
            <CabinetBanner />
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default MasterCabinet
