import { useState, useEffect, FC, useMemo } from 'react'
import { useRouter } from 'next/router'
import { MainContainer } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import { Wrapper } from './styled'
import ControlsTabs from '../../../blocks/Form/ControlsTabs'
import { useMutation } from '@apollo/client'
import CabinetForm, {
  CabinetFormProps,
} from '../../../blocks/Cabinet/components/CabinetForm'
import { changeDataMutation } from '../../../../_graphql-legacy/changeDataMutation'
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
import { IMe, IUser } from 'src/types/me'
import useAuthStore, { IMasterCabinetTabs } from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IPhoto } from 'src/types'
import { IRentalRequest } from 'src/types/rentalRequest'
import CabinetRequests from 'src/components/blocks/Cabinet/components/CabinetRequests'
import { ICabinetRequestsData } from 'src/pages/masterCabinet'
import { request } from 'http'
import { getTabs } from './utils/getTabs'
import useBaseStore from 'src/store/baseStore'
import CabinetOrders from 'src/components/blocks/Cabinet/components/CabinetOrders'

export interface IMasterCabinetTab {
  title: string
  value: string
  icon?: string
  quantity?: number | null
  disable?: boolean
  visible?: boolean
}

interface Props extends Pick<CabinetFormProps, 'cities'> {
  user: IUser
  requests: ICabinetRequestsData
}

const MasterCabinet: FC<Props> = ({ user, requests, cities }) => {
  const { cart } = useBaseStore(getStoreData)
  const [photo, setPhoto] = useState<IPhoto | null>(user.info.avatar || null)
  const [noPhotoError, setNoPhotoError] = useState<boolean>(false)
  const [toggle, setToggle] = useState(false)
  const { unreadMessagesCount } = useChat()
  const [dirtyForm, setDirtyForm] = useState(false)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>(
    (router.query.tab as unknown as string) || 'about',
  )

  const { mobile, desktop } = useMemo(
    () => getTabs({ requests, unreadMessagesCount, cart }),
    [request, unreadMessagesCount],
  )

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
          tabs={mobile}
          toggle={toggle}
          setToggle={setToggle}
          setActiveTab={setActiveTab}
        />
        <Wrapper>
          <ControlsTabs
            dirtyForm={dirtyForm}
            activeTab={activeTab}
            setPhoto={setPhoto}
            setActiveTab={setActiveTab}
            tabs={desktop}
            id={null}
            photoType={'master'}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
            photo={
              photo
                ? {
                    url: `${PHOTO_URL}${photo.url}`,
                  }
                : { url: '/empty-photo.svg' }
            }
          />
          {activeTab === 'about' ? (
            <CabinetForm
              user={user}
              cities={cities}
              setDirtyForm={setDirtyForm}
              dirtyForm={dirtyForm}
              setNoPhotoError={setNoPhotoError}
              photo={photo}
              auth
            />
          ) : activeTab === 'orders' ? (
            <CabinetOrders user={user} cart={cart} />
          ) : activeTab === 'requests' ? (
            <CabinetRequests meID={user.info.id} requestsData={requests} />
          ) : activeTab === 'profiles' ? (
            <CabinetProfiles />
          ) : activeTab === 'chat' ? (
            <CabinetChat />
          ) : activeTab === 'reviews' ? (
            <CabinetListReviews />
          ) : activeTab === 'favorits' ? (
            <CabinetFavorits />
          ) : activeTab === 'sales' ? (
            <CabinetSales user={user} />
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
