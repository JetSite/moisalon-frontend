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
} from '../../../../../../utils/newUtils/common/checkUrls'
import { numberForSocials } from '../../../../../../utils/formatNumber'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch } from 'src/types/common'
import { ICatalog } from 'src/utils/catalogOrDefault'
import { PHOTO_URL } from 'src/api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { getRating } from 'src/utils/newUtils/getRating'
import { RATE_SALON } from 'src/api/graphql/salon/mutations/rateSalon'

interface Props {
  salon: ISalonPage
  isOwner: boolean
}

const Header: FC<Props> = ({ salon, isOwner }) => {
  const router = useRouter()
  const [newRating, setNewRating] = useState<number>(0)

  const logo = salon.logo ? (
    <Logo background={`url(${PHOTO_URL}${salon?.logo?.url})`} />
  ) : (
    <SkeletonCircle />
  )
  const { city, me } = useAuthStore(getStoreData)
  const isRateBefore = salon.ratings.find(e => e.user.id === me?.info.id)
  const [isFavorite, setIsFavorit] = useState<boolean>(false)
  const [showSocials, setShowSocials] = useState<boolean>(false)
  const [showAllActivities, setShowAllActivities] = useState<boolean>(false)
  const [chatMessagePopup, setChatMessagePopup] = useState<boolean>(false)
  const [rateSalon, { loading }] = useMutation(RATE_SALON)

  const { rating, ratingCount } = getRating(salon.ratings, newRating)

  const addFavorite = (e: MouseEvent<HTMLDivElement>, salon: ISalonPage) => {
    e.preventDefault()
    e.stopPropagation()
    // favoritesInStorage('salons', salon)
    setIsFavorit(!isFavorite)
  }

  const handleChangeRating = (num: number) => {
    if (loading || isOwner || isRateBefore) {
      console.log(isOwner || !!isRateBefore)
      return
    }
    setNewRating(num)
    rateSalon({
      variables: {
        user: me?.info.id,
        value: num,
        salon: salon.id,
      },
    })
  }

  console.log(isOwner)

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
            link={isOwner ? '/masterCabinet' : `/${city.slug}/salon`}
            name={salon.name}
          />
        </Wrapper>
        <Wrapper>
          <Socials>
            <noindex>
              {salon?.onlineBookingUrl ? (
                <Phone
                  active={true}
                  href={salon?.onlineBookingUrl}
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
                active={
                  salon?.salonPhones &&
                  salon.salonPhones[0] &&
                  (salon?.salonPhones[0]?.haveTelegram ||
                    salon?.salonPhones[0]?.haveWhatsApp ||
                    !!salon?.salonPhones[0]?.haveViber)
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
                  __html: salon.name,
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
                    // TODO: вернуть путь на createSalon
                    {
                      pathname: '/createSalon',
                      query: { id: salon?.id },
                    },
                  )
                }
              >
                Редактировать профиль
              </EditButton>
            ) : null}
          </NameWrapper>
          {salon?.activities?.length < 8 || showAllActivities ? (
            <Activities>
              {salon?.activities.map(e => e.title).join(', ')}
              {showAllActivities ? (
                <More onClick={() => setShowAllActivities(!showAllActivities)}>
                  Скрыть
                </More>
              ) : null}
            </Activities>
          ) : (
            <Activities>
              {salon?.activities
                .map(e => e.title)
                .slice(0, 8)
                .join(', ')}

              <More onClick={() => setShowAllActivities(!showAllActivities)}>
                Показать все
              </More>
            </Activities>
          )}
          <noindex>
            {salon?.webSiteUrl ? (
              <WebSite
                href={
                  urlPatternHttps.test(salon?.webSiteUrl) ||
                  urlPatternHttp.test(salon?.webSiteUrl)
                    ? salon?.webSiteUrl
                    : `https://${salon?.webSiteUrl}`
                }
                target="_blank"
                rel="noreferrer nofollow"
              >
                {salon.webSiteUrl}
              </WebSite>
            ) : null}
          </noindex>
          <Rating>
            <RatingEdit
              handleChangeRating={handleChangeRating}
              newRating={newRating}
              rating={rating}
            />
            {ratingCount ? <Count>{`${rating}(${ratingCount})`}</Count> : null}
          </Rating>
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Header
