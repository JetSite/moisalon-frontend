import { useState, useEffect, FC, MouseEvent } from 'react'
import { useMutation } from '@apollo/client'
import { getServicesCategories } from '../../../../../../utils/serviceCatalog'
import { MainContainer } from '../../../../../../styles/common'
import BackButton from '../../../../../ui/BackButton'
import RatingEdit from '../../../../../ui/RatingEdit'
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
import { PHOTO_URL } from '../../../../../../api/variables'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IMaster } from 'src/types/masters'
import { IRating } from 'src/types'
import { getRating } from 'src/utils/newUtils/getRating'
import { RATE_MASTER } from 'src/api/graphql/master/mutations/rateMaster'

interface Props {
  master: IMaster | null
  isOwner: boolean
}

const Header: FC<Props> = ({ master, isOwner }) => {
  const router = useRouter()
  const { city, me } = useAuthStore(getStoreData)
  const isRateBefore = master?.ratings.find(e => e.user.id === me?.info.id)
  const [chatMessagePopup, setChatMessagePopup] = useState(false)
  const [newRating, setNewRating] = useState<number>(0)
  const [rateMaster, { loading }] = useMutation(RATE_MASTER, {
    onCompleted: () => {},
  })

  const { rating, ratingCount } = getRating(master?.ratings, newRating)

  const logo =
    master?.photo?.url || master?.photo?.url ? (
      <Logo
        background={`url(${PHOTO_URL}${
          master?.photo?.url || master.photo.url
        })`}
      />
    ) : (
      <SkeletonCircle />
    )

  const [isFavorite, setIsFavorit] = useState(false)
  const [showSocials, setShowSocials] = useState(false)

  const addFavorite = (e: MouseEvent<HTMLDivElement>, master: IMaster) => {
    e.preventDefault()
    e.stopPropagation()
    // favoritesInStorage('masters', master)
    setIsFavorit(!isFavorite)
  }

  const handleChangeRating = (num: number) => {
    if (loading || isOwner || isRateBefore) {
      console.log(isOwner || !!isRateBefore)
      return
    }
    setNewRating(num)
    rateMaster({
      variables: {
        user: me?.info.id,
        value: num,
        master: master?.id,
      },
    })
  }

  return (
    <>
      <MainContainer>
        <ChatMessagePopup
          open={chatMessagePopup}
          setChatMessagePopup={setChatMessagePopup}
          userId={master?.id || null}
          origin="MASTER"
          originData={master}
        />
        <Wrapper>
          <BackButton
            link={isOwner ? '/masterCabinet' : `/${city.slug}/master`}
            type="Мастер"
            name={master?.name}
          />
        </Wrapper>
        <Wrapper>
          <Socials>
            <Phone
              active={!!master?.phone}
              href={
                master?.phone || master?.phone ? `tel:${master.phone}` : '#'
              }
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
                        master?.phone || master?.phone,
                      )}`}
                    />
                  ) : null}
                  {master?.haveWhatsApp ? (
                    <WhatsApp
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                        master?.phone || master?.phone,
                      )}`}
                    />
                  ) : null}
                  {master?.haveViber ? (
                    <Viber
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`viber://chat?number=%2B${numberForSocials(
                        master?.phone || master?.phone,
                      )}`}
                    />
                  ) : null}
                </HiddenSocials>
              </noindex>
            </SocialsWrapper>
          </Socials>
          <NameWrapper>
            <NameContent>
              <Name>{master?.name}</Name>
              <Favorite
                isFavorite={isFavorite}
                onClick={e => (master ? addFavorite(e, master) : null)}
              />
              {/* <Bell /> */}
            </NameContent>
            {/* {isOwner ? (
              <EditButton
                onClick={() => {
                  router.push({
                    pathname: '/createMaster',
                    query: master ? { id: master?.id } : undefined,
                  })
                }}
              >
                Редактировать профиль
              </EditButton>
            ) : null} */}
          </NameWrapper>
          {master?.services && !!master?.services?.length ? (
            <Activities>
              {getServicesCategories(master.services).join(', ')}
            </Activities>
          ) : null}
          <Rating>
            <RatingEdit
              handleChangeRating={handleChangeRating}
              newRating={newRating}
              rating={rating}
            />
            <Count>{`${rating}(${ratingCount})`}</Count>
          </Rating>
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Header
