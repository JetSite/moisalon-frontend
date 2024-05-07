import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import catalogOrDefault from '../../../../utils/catalogOrDefault'
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
import SalonCard from './components/SalonCard'
import { MobileVisible, MobileHidden } from '../../../../styles/common'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'
import { NavigationOptions } from 'swiper/types'

SwiperCore.use([Navigation])

export interface ThingsProps {
  cabinet?: boolean
  noScroll?: boolean
  title?: string
  setActiveTab: Dispatch<SetStateAction<string>>
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
      const navigation = Swiper.params.navigation as NavigationOptions
      navigation.prevEl = navigationPrevRef.current
      navigation.nextEl = navigationNextRef.current
    }
  }

  const { city, me } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)

  const [deleteItem, setDeleteItem] = useState<boolean>(false)
  const [toggle, setToggle] = useState(mobile && cabinet && true)

  const salons = me?.favorite?.salons

  useEffect(() => {
    if (!salons) setActiveTab('all')
  }, [salons])

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
                            salon.salonWorkplacesCount
                              ? `/${cyrToTranslit(
                                  salon.cities.cityName || city,
                                )}/rent/${salon.id}`
                              : `/${cyrToTranslit(
                                  salon.cities.cityName || city,
                                )}/salon/${salon.id}`
                          }
                        >
                          <SalonCard
                            salon={salon}
                            deleteItem={deleteItem}
                            setDeleteItem={setDeleteItem}
                            handleDeleted={handleDeleted || (() => {})}
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
