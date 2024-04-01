import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MainContainer } from '../../../../styles/common'
import Header from '../../../pages/MainPage/components/Header'
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
import { PHOTO_URL } from '../../../../variables'
import { useChat } from '../../../../chatContext'

const MasterCabinet = ({ refetch, currentMe }) => {
  const [photoId, setPhotoId] = useState(currentMe?.info?.avatar)
  const [noPhotoError, setNoPhotoError] = useState(false)
  const [, setErrors] = useState(null)
  const [, setErrorPopupOpen] = useState(null)
  const [toggle, setToggle] = useState(false)
  const { unreadMessagesCount } = useChat()

  const [mutate] = useMutation(changeDataMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async () => {
      await refetch()
    },
  })

  const handlePhoto = id => {
    setPhotoId(id)
    if (id) {
      mutate({
        variables: {
          input: {
            defaultCity: currentMe?.info?.defaultCity,
            displayName: currentMe?.info?.displayName,
            email: currentMe?.info?.email,
            phoneNumber: currentMe?.info?.phoneNumber,
            avatar: id,
          },
        },
      })
    }
  }

  const [activeTab, setActiveTab] = useState('about')
  const router = useRouter()

  useEffect(() => {
    if (router?.query?.tab) {
      setActiveTab(router?.query?.tab)
    }
  }, [router?.query?.tab])

  return (
    <>
      <Header />
      <MainContainer>
        <ProfileCabinetHeaderMobile
          me={currentMe}
          tabs={[
            { title: 'Мои данные', value: 'about', icon: '/icon-about.svg' },
            {
              title: 'Мои заказы',
              value: 'orders',
              icon: '/icon-orders.svg',
              quantity: currentMe?.orders?.length,
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
              currentMe?.info?.avatar
                ? {
                    url: `${PHOTO_URL}${currentMe?.info?.avatar}/original`,
                  }
                : { url: '/empty-photo.svg' }
            }
            me={currentMe}
          />
          {activeTab === 'about' ? (
            <CabinetForm
              setNoPhotoError={setNoPhotoError}
              photoId={photoId}
              refetch={refetch}
              auth
              currentMe={currentMe}
            />
          ) : activeTab === 'orders' ? (
            <CabinetOrders me={currentMe} />
          ) : activeTab === 'profiles' ? (
            <CabinetProfiles me={currentMe} />
          ) : activeTab === 'chat' ? (
            <CabinetChat me={currentMe} />
          ) : activeTab === 'reviews' ? (
            <CabinetListReviews me={currentMe} />
          ) : activeTab === 'favorits' ? (
            <CabinetFavorits />
          ) : activeTab === 'sales' ? (
            <CabinetSales me={currentMe} />
          ) : activeTab === 'educations' ? (
            <CabinetEducations me={currentMe} />
          ) : activeTab === 'vacancies' ? (
            <CabinetVacancies me={currentMe} />
          ) : activeTab === 'events' ? (
            <CabinetEvents me={currentMe} />
          ) : activeTab === 'priority' ? (
            <CabinetPriority me={currentMe} />
          ) : activeTab === 'banner' ? (
            <CabinetBanner me={currentMe} />
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default MasterCabinet
