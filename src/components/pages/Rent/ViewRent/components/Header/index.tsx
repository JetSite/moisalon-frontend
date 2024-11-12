import { MainContainer } from '../../../../../../styles/common'
import { useMutation } from '@apollo/client'
import {
  Wrapper,
  Content,
  Info,
  ImageContent,
  Image,
  OnlineBooking,
  Icon,
  SalonInfo,
  Avatar,
  SalonInfoRight,
  Name,
  SocialInst,
  SocialFb,
  SocialVk,
  Socials,
  ReviewsScore,
  CountReviews,
  City,
  CityText,
  Phones,
  PhoneWrap,
  Phone,
  Working,
  ButtonOnline,
  EditButton,
  SocialsWrapper,
  Rating,
  Count,
  EditButtonsWrapper,
} from './styles'
import BackButton from '../../../../../ui/BackButton'
import { cyrToTranslit } from '../../../../../../utils/translit'
import { pluralize } from '../../../../../../utils/pluralize'
import {
  urlPatternHttps,
  urlPatternHttp,
} from '../../../../../../utils/newUtils/common/checkUrls'
import StarIcon from '../../../../MainPage/components/Header/icons/StarIcon'
import scrollIntoView from 'scroll-into-view'
import {
  TGIcon,
  VBIcon,
  WSIcon,
} from '../../../../Master/ViewMaster/components/Contacts/styled'
import RatingEdit from '../../../../../ui/RatingEdit'
import { FC, useState } from 'react'
import { ISalonPage } from 'src/types/salon'
import { getRating } from 'src/utils/newUtils/getRating'
import { ISetState } from 'src/types/common'
import { RATE_SALON } from 'src/api/graphql/salon/mutations/rateSalon'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { Schedule } from 'src/components/ui/Shedule'
import { PHOTO_URL } from 'src/api/variables'
import { numberForSocials } from 'src/utils/formatNumber'
import { OnlineBookingButton } from 'src/components/blocks/OnlineBookingButton'

interface Props {
  salon: ISalonPage
  isOwner: boolean
  setActiveTab: ISetState<number>
}

const Header: FC<Props> = ({ isOwner, salon, setActiveTab }) => {
  const [newRating, setNewRating] = useState<number>(0)
  const { me } = useAuthStore(getStoreData)
  const { rating, ratingCount } = getRating(salon.ratings, newRating)
  const isRateBefore = salon.ratings.find(e => e.user.id === me?.info.id)
  const [rateSalon, { loading }] = useMutation(RATE_SALON)
  const socials: { [K: string]: string } = {}
  salon.socialNetworks.forEach(e => {
    socials[e.title] = e.link
  })

  const handleAnchorClick = () => {
    setActiveTab(4)
    const element = document.getElementById('rent')
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

  return (
    <MainContainer>
      <Wrapper>
        <BackButton
          type="Аренда"
          link={isOwner ? '/masterCabinet' : `/${salon.city.slug}/rent`}
          name={salon.name}
        />
        <Content>
          <Info>
            <SalonInfo>
              <Avatar src={PHOTO_URL + salon.logo?.url} />
              <SalonInfoRight>
                <Name>{salon.name}</Name>
                <Rating>
                  <RatingEdit
                    handleChangeRating={handleChangeRating}
                    newRating={newRating}
                    rating={rating}
                  />
                  {ratingCount ? (
                    <Count>{`${rating}(${ratingCount})`}</Count>
                  ) : null}
                </Rating>
                <noindex>
                  <Socials>
                    {socials.facebook ? (
                      <a
                        href={socials.facebook}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <SocialFb />
                      </a>
                    ) : null}
                    {socials.Instagram ? (
                      <a
                        href={socials.Instagram}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <SocialInst />
                      </a>
                    ) : null}
                    {socials.vKontakte ? (
                      <a
                        href={
                          urlPatternHttps.test(socials.vKontakte) ||
                          urlPatternHttp.test(socials.vKontakte)
                            ? socials.vKontakte
                            : `https://${socials.vKontakte}`
                        }
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <SocialVk />
                      </a>
                    ) : null}
                  </Socials>
                </noindex>
              </SalonInfoRight>
            </SalonInfo>
            <ReviewsScore onClick={() => handleAnchorClick()}>
              <div style={{ position: 'relative', top: 1 }}>
                <StarIcon />
              </div>
              <CountReviews>{`${salon.reviewsCount} ${pluralize(
                salon.reviewsCount || 0,
                'Отзыв',
                'Отзыва',
                'Отзывов',
              )}`}</CountReviews>
            </ReviewsScore>
            <City>
              <div style={{ position: 'relative', top: 3 }}>
                <Icon src="/icon-city.svg" />
              </div>
              <CityText>{salon?.address}</CityText>
            </City>
            {salon?.salonPhones?.length ? (
              <Phones>
                {salon?.salonPhones?.map((item, i) => (
                  <PhoneWrap key={i}>
                    <div style={{ position: 'relative', top: -4 }}>
                      <Icon src="/header-phone-icon.svg" />
                    </div>
                    <Phone href={`tel:${item?.phoneNumber}`}>
                      {item?.phoneNumber}
                    </Phone>
                  </PhoneWrap>
                ))}
              </Phones>
            ) : null}
            {salon?.salonPhones[0]?.haveTelegram ||
            salon?.salonPhones[0]?.haveWhatsApp ||
            salon?.salonPhones[0]?.haveViber ? (
              <SocialsWrapper>
                {salon?.salonPhones[0]?.haveTelegram ? (
                  <noindex>
                    <a
                      href={`https://tlgg.ru/${numberForSocials(
                        salon?.salonPhones[0]?.phoneNumber,
                      )}`}
                      target="_blank"
                      rel="noreferrer nofollow"
                    >
                      <TGIcon />
                    </a>
                  </noindex>
                ) : null}
                {salon?.salonPhones[0]?.haveWhatsApp ? (
                  <noindex>
                    <a
                      target="_blank"
                      rel="noreferrer nofollow"
                      href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                        salon?.salonPhones[0]?.phoneNumber,
                      )}`}
                    >
                      <WSIcon />
                    </a>
                  </noindex>
                ) : null}
                {salon?.salonPhones[0]?.haveViber ? (
                  <noindex>
                    <a
                      target="_blank"
                      rel="noreferrer nofollow"
                      href={`viber://chat?number=%2B${numberForSocials(
                        salon?.salonPhones[0]?.phoneNumber,
                      )}`}
                    >
                      <VBIcon />
                    </a>
                  </noindex>
                ) : null}
              </SocialsWrapper>
            ) : null}
            {salon?.workingHours ? (
              <Working>
                <Icon src="/icon-clock.svg" />
                <Schedule workingHours={salon?.workingHours} />
              </Working>
            ) : null}
            <noindex>
              <ButtonOnline>
                <OnlineBookingButton salon={salon}>
                  Онлайн бронирование
                </OnlineBookingButton>
              </ButtonOnline>

              {/* {salon?.onlineBookingUrl ? (
                <ButtonOnline
                  target="_blank"
                  rel="nofollow"
                  href={
                    urlPatternHttps.test(salon?.onlineBookingUrl) ||
                    urlPatternHttp.test(salon?.onlineBookingUrl)
                      ? salon?.onlineBookingUrl
                      : `https://${salon?.onlineBookingUrl}`
                  }
                >
                  Онлайн бронирование
                </ButtonOnline>
              ) : (
                <ButtonOnline
                  href={`tel:${salon?.salonPhones[0]?.phoneNumber}`}
                >
                  Онлайн бронирование
                </ButtonOnline>
              )} */}
            </noindex>
          </Info>
          <ImageContent>
            {salon?.photos[0]?.url && (
              <Image
                alt={salon.photos[0].name}
                src={PHOTO_URL + salon?.photos[0]?.url}
              />
            )}
            <noindex>
              <OnlineBookingButton salon={salon}>
                <OnlineBooking>Онлайн бронирование</OnlineBooking>
              </OnlineBookingButton>
              {/* {salon?.onlineBookingUrl ? (
                <OnlineBooking
                  target="_blank"
                  rel="nofollow"
                  href={
                    urlPatternHttps.test(salon?.onlineBookingUrl) ||
                    urlPatternHttp.test(salon?.onlineBookingUrl)
                      ? salon?.onlineBookingUrl
                      : `https://${salon?.onlineBookingUrl}`
                  }
                >
                  <Icon src="/booking-blank.svg" />
                  Онлайн бронирование
                </OnlineBooking>
              ) : (
                <OnlineBooking
                  href={`tel:${salon?.salonPhones[0]?.phoneNumber}`}
                >
                  Онлайн бронирование
                </OnlineBooking>
              )} */}
            </noindex>
          </ImageContent>
        </Content>
        {isOwner ? (
          <EditButtonsWrapper>
            <EditButton
              shallow
              href={{
                pathname: '/createLessorSalon',
                query: { id: salon?.id },
              }}
            >
              Редактировать профиль
            </EditButton>
            <EditButton
              shallow
              href={{
                pathname: '/rentSalonSeat',
                query: { id: salon?.id },
              }}
            >
              Редактировать рабочие места
            </EditButton>
          </EditButtonsWrapper>
        ) : null}
      </Wrapper>
    </MainContainer>
  )
}

export default Header
