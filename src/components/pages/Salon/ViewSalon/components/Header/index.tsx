import { useState, useEffect, FC, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import { MainContainer } from '../../../../../../styles/common'
import { selectedGroupNames } from '../../../../../../utils/serviceCatalog'
import BackButton from '../../../../../ui/BackButton'
import RatingEdit from '../../../../../ui/RatingEdit'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../../utils/favoritesInStorage'
import {
  Wrapper,
  Socials,
  Phone,
  HiddenSocials,
  Telegram,
  WhatsApp,
  Viber,
  SocialsWrapper,
  Logo,
  Name,
  NameWrapper,
  Favorite,
  NameContent,
  Bell,
  Activities,
  Rating,
  SkeletonCircle,
  EditButton,
  Count,
  WebSite,
  More,
  ActiveSocials,
  ChatIcon,
} from './styled'
import { createScopesSalon } from '../../../../../../_graphql-legacy/salon/createScopesSalon'
import { cyrToTranslit } from '../../../../../../utils/translit'
import ChatMessagePopup from '../../../../../ui/ChatMessagePopup'
import {
  urlPatternHttps,
  urlPatternHttp,
} from '../../../../../../utils/checkUrls'
import { numberForSocials } from '../../../../../../utils/formatNumber'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch } from 'src/types/common'
import { ICatalog } from 'src/utils/catalogOrDefault'
import { PHOTO_URL } from 'src/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

interface Props {
  salon: ISalonPage
  salonActivitiesCatalog: ICatalog
  isOwner: boolean
  loadingScore: boolean
  refetchSalon: IApolloRefetch
  refetchScore: IApolloRefetch
}

const Header: FC<Props> = ({
  salon,
  salonActivitiesCatalog,
  isOwner,
  loadingScore,
  refetchSalon,
  refetchScore,
}) => {
  const router = useRouter()
  const logo = salon.salonLogo ? (
    <Logo background={`url(${PHOTO_URL}${salon?.salonLogo?.url})`} />
  ) : (
    <SkeletonCircle />
  )
  const { city } = useAuthStore(getStoreData)
  const [isFavorite, setIsFavorit] = useState<boolean>(false)
  const [showSocials, setShowSocials] = useState<boolean>(false)
  const [showAllActivities, setShowAllActivities] = useState<boolean>(false)
  const [chatMessagePopup, setChatMessagePopup] = useState<boolean>(false)

  useEffect(() => {
    const isInStorage = inStorage('salons', salon)
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e: MouseEvent<HTMLDivElement>, salon: ISalonPage) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('salons', salon)
    setIsFavorit(!isFavorite)
  }

  const [createScore] = useMutation(createScopesSalon, {
    onCompleted: () => {
      refetchSalon()
      refetchScore()
    },
  })

  const handleChangeRating = (num: number) => {
    if (salon.salonAverageScore || loadingScore) return
    createScore({
      variables: {
        value: num,
        salonId: salon.id,
      },
    })
  }

  return (
    <>
      <MainContainer>
        <ChatMessagePopup
          open={chatMessagePopup}
          setChatMessagePopup={setChatMessagePopup}
          userId={salon.user?.id}
          origin="SALON"
          originData={salon}
        />
        <Wrapper>
          <BackButton
            type="Салон"
            link={isOwner ? '/masterCabinet' : `/${cyrToTranslit(city)}/salon`}
            name={salon.salonName}
          />
        </Wrapper>
        <Wrapper>
          <Socials>
            <noindex>
              {salon?.salonOnlineBookingUrl ? (
                <Phone
                  active={true}
                  href={salon?.salonOnlineBookingUrl}
                  target="_blank"
                  rel="nofollow"
                />
              ) : (
                <Phone
                  active={
                    salon?.salonPhones &&
                    salon.salonPhones[0] &&
                    !!salon.salonPhones[0].phoneNumber
                  }
                  href={
                    salon?.salonPhones &&
                    salon.salonPhones[0] &&
                    salon.salonPhones[0].phoneNumber
                      ? `tel:${salon.salonPhones[0].phoneNumber}`
                      : ''
                  }
                />
              )}
            </noindex>
            {logo}
            <SocialsWrapper>
              <ActiveSocials
                // active={
                //   salon?.salonPhones &&
                //   salon.salonPhones[0] &&
                //   (salon?.salonPhones[0]?.haveTelegram ||
                //     salon?.salonPhones[0]?.haveWhatsApp ||
                //     salon?.salonPhones[0]?.haveViber)
                // }
                active
                onClick={() => setShowSocials(!showSocials)}
              />
              <noindex>
                <HiddenSocials showSocials={showSocials}>
                  <ChatIcon
                    title="Написать в чат"
                    showSocials={showSocials}
                    onClick={() => setChatMessagePopup(true)}
                  />
                  {salon?.salonPhones[0]?.haveTelegram ? (
                    <Telegram
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://tlgg.ru/${numberForSocials(
                        salon?.salonPhones[0]?.phoneNumber,
                      )}`}
                    />
                  ) : null}
                  {salon?.salonPhones[0]?.haveWhatsApp ? (
                    <WhatsApp
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                        salon?.salonPhones[0]?.phoneNumber,
                      )}`}
                    />
                  ) : null}
                  {salon?.salonPhones[0]?.haveViber ? (
                    <Viber
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`viber://chat?number=%2B${numberForSocials(
                        salon?.salonPhones[0]?.phoneNumber,
                      )}`}
                    />
                  ) : null}
                </HiddenSocials>
              </noindex>
            </SocialsWrapper>
          </Socials>
          <NameWrapper>
            <NameContent>
              <Name
                dangerouslySetInnerHTML={{
                  __html: salon.salonName,
                }}
              />
              <Favorite
                isFavorite={isFavorite}
                onClick={e => addFavorite(e, salon)}
              />
              <Bell />
            </NameContent>
            {isOwner ? (
              <EditButton
                onClick={() =>
                  router.push(
                    {
                      pathname: '/createSalon',
                      query: { id: salon?.id },
                    },
                    '/createSalon',
                  )
                }
              >
                Редактировать профиль
              </EditButton>
            ) : null}
          </NameWrapper>
          {salon?.activities?.length < 8 || showAllActivities ? (
            <Activities>
              {/* {selectedGroupNames(
                salon?.activities,
                salonActivitiesCatalog,
                ', ',
              )} */}
              {showAllActivities ? (
                <More onClick={() => setShowAllActivities(!showAllActivities)}>
                  Скрыть
                </More>
              ) : null}
            </Activities>
          ) : (
            <Activities>
              {/* {selectedGroupNames(
                salon?.activities?.slice(0, 8),
                salonActivitiesCatalog,
                ', ',
              )} */}
              <More onClick={() => setShowAllActivities(!showAllActivities)}>
                Показать все
              </More>
            </Activities>
          )}
          <noindex>
            {salon?.salonWebSiteUrl ? (
              <WebSite
                href={
                  urlPatternHttps.test(salon?.salonWebSiteUrl) ||
                  urlPatternHttp.test(salon?.salonWebSiteUrl)
                    ? salon?.salonWebSiteUrl
                    : `https://${salon?.salonWebSiteUrl}`
                }
                target="_blank"
                rel="noreferrer nofollow"
              >
                {salon.salonWebSiteUrl}
              </WebSite>
            ) : null}
          </noindex>
          <Rating>
            <RatingEdit
              handleChangeRating={handleChangeRating}
              userValue={salon.salonAverageScore}
              count={salon.salonAverageScore || 0}
            />
            <Count>{salon.salonAverageScore || 0}</Count>
          </Rating>
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Header
