import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { getServicesCategories } from '../../../../../../utils/serviceCatalog'
import { MainContainer } from '../../../../../../styles/common'
import BackButton from '../../../../../ui/BackButton'
import RatingEdit from '../../../../../ui/RatingEdit/index.tsx'
import { createScopesMaster } from '../../../../../../_graphql-legacy/master/createScopesMaster'
import {
  Wrapper,
  Socials,
  Phone,
  ActiveSocials,
  Logo,
  NameWrapper,
  NameContent,
  Name,
  Favorite,
  Bell,
  Activities,
  Rating,
  SkeletonCircle,
  EditButton,
  Count,
  HiddenSocials,
  Telegram,
  WhatsApp,
  Viber,
  SocialsWrapper,
  ChatIcon,
  ChatTip,
} from './styles'
import { useRouter } from 'next/router'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../../utils/favoritesInStorage'
import { cyrToTranslit } from '../../../../../../utils/translit'
import defaultNumber from '../../../../../../utils/defaultNumber'
import ChatMessagePopup from '../../../../../ui/ChatMessagePopup'
import { numberForSocials } from '../../../../../../utils/formatNumber'
import { PHOTO_URL } from '../../../../../../variables'
import { getServiceCategories } from 'src/graphql/service/queries/getServiceCategories'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Header = ({
  master,
  // masterSpecializationsCatalog,
  me,
  // scoreMasterCount,
  // loadingScore,
  // refetchMaster,
  // refetchScore,
  isOwner,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  const [chatMessagePopup, setChatMessagePopup] = useState(false)

  const logo = master?.masterPhoto?.url ? (
    <Logo background={`url(${PHOTO_URL}${master?.masterPhoto?.url})`} />
  ) : (
    <SkeletonCircle />
  )

  const [isFavorite, setIsFavorit] = useState(false)
  const [showSocials, setShowSocials] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('masters', master)
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e, master) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('masters', master)
    setIsFavorit(!isFavorite)
  }

  // const [createScore] = useMutation(createScopesMaster, {
  //   onCompleted: () => {
  //     refetchMaster();
  //     refetchScore();
  //   },
  // });

  const handleChangeRating = num => {
    // if (scoreMasterCount || loadingScore) return
    // createScore({
    //   variables: {
    //     value: num,
    //     masterId: master.id,
    //   },
    // })
  }

  return (
    <>
      <MainContainer>
        <ChatMessagePopup
          open={chatMessagePopup}
          setChatMessagePopup={setChatMessagePopup}
          me={me}
          userId={master.userId}
          origin="MASTER"
          originData={master}
        />
        <Wrapper>
          <BackButton
            link={isOwner ? '/masterCabinet' : `/${cyrToTranslit(city)}/master`}
            type="Мастер"
            name={master?.masterName}
          />
        </Wrapper>
        <Wrapper>
          <Socials>
            <Phone
              active={master?.masterPhone}
              href={master?.masterPhone ? `tel:${master.masterPhone}` : '#'}
            />
            {logo}
            <SocialsWrapper>
              <ActiveSocials
                active={
                  master?.haveTelegram ||
                  master?.haveWhatsApp ||
                  master?.haveViber
                }
                onClick={() => setShowSocials(!showSocials)}
              />
              <noindex>
                <HiddenSocials showSocials={showSocials}>
                  <ChatIcon
                    title="Написать в чат"
                    showSocials={showSocials}
                    onClick={() => setChatMessagePopup(true)}
                  />
                  {master?.haveTelegram ? (
                    <Telegram
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://tlgg.ru/${numberForSocials(
                        master?.masterPhone,
                      )}`}
                    />
                  ) : null}
                  {master?.haveWhatsApp ? (
                    <WhatsApp
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                        master?.masterPhone,
                      )}`}
                    />
                  ) : null}
                  {master?.haveViber ? (
                    <Viber
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`viber://chat?number=%2B${numberForSocials(
                        master?.masterPhone,
                      )}`}
                    />
                  ) : null}
                </HiddenSocials>
              </noindex>
            </SocialsWrapper>
          </Socials>
          <NameWrapper>
            <NameContent>
              <Name>{master.masterName}</Name>
              <Favorite
                isFavorite={isFavorite}
                onClick={e => addFavorite(e, master)}
              />
              {/* <Bell /> */}
            </NameContent>
            {isOwner ? (
              <EditButton onClick={() => router.push('/createMaster')}>
                Редактировать профиль
              </EditButton>
            ) : null}
          </NameWrapper>
          {master?.services && !!master?.services?.length ? (
            <Activities>
              {getServicesCategories(master.services).join(', ')}
            </Activities>
          ) : null}
          <Rating>
            <RatingEdit
              handleChangeRating={handleChangeRating}
              // userValue={scoreMasterCount || 0}
              userValue={0}
              count={Math.round(master?.averageScore)}
              me={me}
            />
            <Count>{Math.round(master?.numberScore) || 0}</Count>
          </Rating>
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Header
