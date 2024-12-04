import { FC, useRef, useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { MainContainer } from '../../../../styles/common'
import Link from 'next/link'
import {
  Content,
  Wrapper,
  Top,
  Title,
  SwiperWrap,
  SliderWrapper,
  PhoneButton,
  ItemToggle,
} from './styled'
import {
  Bottom,
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../../styles/sliderBlocks'
import { MobileVisible, MobileHidden } from '../../../../styles/common'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'
import { ISetState } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import SalonCard from 'src/components/blocks/SalonCard'

SwiperCore.use([Navigation])

export interface ThingsProps {
  cabinet?: boolean
  noScroll?: boolean
  title?: string
  setActiveTab?: ISetState<string>
  mobile?: boolean
  handleDeleted?: () => void
}

const SalonsFavorites: FC<ThingsProps> = ({
  cabinet = false,
  title,
  setActiveTab = () => {},
  mobile = false,
  handleDeleted,
}) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const onBeforeInit = (Swiper: SwiperClass) => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      if (
        navigation &&
        navigationPrevRef.current &&
        navigationNextRef.current
      ) {
        navigation.prevEl = navigationPrevRef.current
        navigation.nextEl = navigationNextRef.current
      }
    }
  }

  const { city, user } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)

  const [deleteItem, setDeleteItem] = useState<boolean>(false)
  const [toggle, setToggle] = useState(mobile && cabinet && true)

  let salons: ISalon[] = user?.favorite?.salons || []
  if (typeof window !== 'undefined') {
    const salonsLocal =
      JSON.parse(localStorage.getItem('favorites') || '{}')?.salons || []
    if (!salons.length) salons = salonsLocal
  } else return <div />

  if (!salons) setActiveTab('all')

  return (
    <Wrapper>
      <MainContainer>
        {mobile && cabinet ? (
          <ItemToggle
            disabled={!!!salons?.length}
            toggle={!toggle}
            onClick={() => setToggle(!toggle)}
          >
            Салоны {!!salons?.length && `(${salons?.length})`}
          </ItemToggle>
        ) : null}
        {!toggle && salons?.length ? (
          <Content cabinet={cabinet}>
            <Top>
              <Title cabinet={cabinet}>{title}</Title>
              <NavigationWrapper>
                <ButtonPrev color="black" ref={navigationPrevRef} />
                <ButtonNext color="black" ref={navigationNextRef} />
              </NavigationWrapper>
            </Top>
            <SliderWrapper>
              <SwiperWrap>
                <Swiper
                  style={{ padding: '5px', marginLeft: '-5px' }}
                  mousewheel={true}
                  pagination={{ clickable: true }}
                  slidesPerView={3}
                  spaceBetween={27.5}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={onBeforeInit}
                  breakpoints={{
                    320: {
                      slidesPerView: 1.1,
                    },
                    480: {
                      slidesPerView: 1.7,
                    },
                    768: {
                      slidesPerView: cabinet ? 2 : 3,
                      spaceBetween: 15,
                    },
                  }}
                >
                  {salons &&
                    salons.map((salon, i) => (
                      <SwiperSlide
                        style={{ minHeight: '100%', height: 'auto' }}
                        key={i}
                      >
                        <Link
                          href={
                            salon.workplacesCount
                              ? `/${salon.city.slug || city.slug}/rent/${
                                  salon.id
                                }`
                              : `/${salon.city.slug || city.slug}/salon/${
                                  salon.id
                                }`
                          }
                        >
                          <SalonCard
                            handleDeleted={handleDeleted}
                            item={salon}
                          />
                        </Link>
                        {salon.salonPhones.length && !cabinet ? (
                          <MobileHidden>
                            <PhoneButton
                              href={`tel:${salon?.salonPhones[0].phoneNumber}`}
                            >
                              Онлайн-запись
                            </PhoneButton>
                          </MobileHidden>
                        ) : null}
                        {salon?.salonPhones?.length && !cabinet ? (
                          <MobileVisible>
                            <PhoneButton
                              href={`tel:${salon?.salonPhones[0].phoneNumber}`}
                            >
                              Онлайн-запись
                            </PhoneButton>
                          </MobileVisible>
                        ) : null}
                      </SwiperSlide>
                    ))}
                </Swiper>
              </SwiperWrap>
            </SliderWrapper>
            <Bottom></Bottom>
          </Content>
        ) : null}
      </MainContainer>
    </Wrapper>
  )
}

export default SalonsFavorites
