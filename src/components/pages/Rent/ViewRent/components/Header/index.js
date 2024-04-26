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
} from '../../../../../../utils/checkUrls'
import StarIcon from '../../../../../pages/MainPage/components/Header/icons/StarIcon'
import scrollIntoView from 'scroll-into-view'
import Schedule from '../../../../../ui/Shedule'
import { useRouter } from 'next/router'
import {
  TGIcon,
  VBIcon,
  WSIcon,
} from '../../../../Master/ViewMaster/components/Contacts/styled'
import { createScopesSalon } from '../../../../../../_graphql-legacy/salon/createScopesSalon'
import RatingEdit from '../../../../../ui/RatingEdit/index.tsx'
import { numberForSocials } from '../../../../../../utils/formatNumber'

const Header = ({
  me,
  isOwner,
  salon,
  dataReviews,
  setActiveTab,
  scoreSalonCount,
  loadingScore,
  refetchSalon,
  refetchScore,
}) => {
  const router = useRouter()
  const handleAnchorClick = () => {
    setActiveTab(4)
    const element = document.getElementById('reviews')
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

  const [createScore] = useMutation(createScopesSalon, {
    onCompleted: () => {
      refetchSalon()
      refetchScore()
    },
  })
  const handleChangeRating = num => {
    if (scoreSalonCount || loadingScore) return
    createScore({
      variables: {
        value: num,
        salonId: salon.id,
      },
    })
  }

  const { city } = useAuthStore(getStoreData)
  return (
    <MainContainer>
      <Wrapper>
        <BackButton
          type="Аренда"
          link={isOwner ? '/masterCabinet' : `/${cyrToTranslit(city)}/rent`}
          name={salon.name}
        />
        <Content>
          <Info>
            <SalonInfo>
              <Avatar src={salon?.logo?.url} />
              <SalonInfoRight>
                <Name>{salon?.name}</Name>
                <Rating>
                  <RatingEdit
                    handleChangeRating={handleChangeRating}
                    userValue={scoreSalonCount ? scoreSalonCount?.value : 0}
                    count={Math.round(salon?.averageScore)}
                    me={me}
                  />
                  <Count>{Math.round(salon?.numberScore) || 0}</Count>
                </Rating>
                <noindex>
                  <Socials>
                    {/* {salon?.socialNetworkUrls?.facebook ? (
                      <a
                        href={salon?.socialNetworkUrls?.facebook}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <SocialFb />
                      </a>
                    ) : null}
                    {salon?.socialNetworkUrls?.instagram ? (
                      <a
                        href={!salon?.socialNetworkUrls?.instagram}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <SocialInst />
                      </a>
                    ) : null} */}
                    {salon?.socialNetworkUrls?.vKontakte ? (
                      <a
                        href={
                          urlPatternHttps.test(
                            salon?.socialNetworkUrls?.vKontakte,
                          ) ||
                          urlPatternHttp.test(
                            salon?.socialNetworkUrls?.vKontakte,
                          )
                            ? salon?.socialNetworkUrls?.vKontakte
                            : `https://${salon?.socialNetworkUrls?.vKontakte}`
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
              <CountReviews>{`${dataReviews?.length} ${pluralize(
                dataReviews?.length || 0,
                'Отзыв',
                'Отзыва',
                'Отзывов',
              )}`}</CountReviews>
            </ReviewsScore>
            <City>
              <div style={{ position: 'relative', top: 3 }}>
                <Icon src="/icon-city.svg" />
              </div>
              <CityText>{salon?.address?.full}</CityText>
            </City>
            {salon?.phones?.length ? (
              <Phones>
                {salon?.phones?.map((item, i) => (
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
            {salon?.phones[0]?.haveTelegram ||
            salon?.phones[0]?.haveWhatsApp ||
            salon?.phones[0]?.haveViber ? (
              <SocialsWrapper>
                {salon?.phones[0]?.haveTelegram ? (
                  <noindex>
                    <a
                      href={`https://tlgg.ru/${numberForSocials(
                        salon?.phones[0]?.phoneNumber,
                      )}`}
                      target="_blank"
                      rel="noreferrer nofollow"
                    >
                      <TGIcon />
                    </a>
                  </noindex>
                ) : null}
                {salon?.phones[0]?.haveWhatsApp ? (
                  <noindex>
                    <a
                      target="_blank"
                      rel="noreferrer nofollow"
                      href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                        salon?.phones[0]?.phoneNumber,
                      )}`}
                    >
                      <WSIcon />
                    </a>
                  </noindex>
                ) : null}
                {salon?.phones[0]?.haveViber ? (
                  <noindex>
                    <a
                      target="_blank"
                      rel="noreferrer nofollow"
                      href={`viber://chat?number=%2B${numberForSocials(
                        salon?.phones[0]?.phoneNumber,
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
              {salon?.onlineBookingUrl ? (
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
                <ButtonOnline href={`tel:${salon?.phones[0]?.phoneNumber}`}>
                  Онлайн бронирование
                </ButtonOnline>
              )}
            </noindex>
          </Info>
          <ImageContent>
            <Image src={salon?.photos[0]?.url} />
            <noindex>
              {salon?.onlineBookingUrl ? (
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
                <OnlineBooking href={`tel:${salon?.phones[0]?.phoneNumber}`}>
                  Онлайн бронирование
                </OnlineBooking>
              )}
            </noindex>
          </ImageContent>
        </Content>
        {isOwner ? (
          <EditButtonsWrapper>
            <EditButton
              onClick={() =>
                router.push(
                  {
                    pathname: '/createLessorSalon',
                    query: { id: salon?.id },
                  },
                  '/createLessorSalon',
                )
              }
            >
              Редактировать профиль
            </EditButton>
            <EditButton
              onClick={() =>
                router.push(
                  {
                    pathname: '/rentSalonSeat',
                    query: { id: salon?.id },
                  },
                  '/rentSalonSeat',
                )
              }
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
