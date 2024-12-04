import { FC, useEffect, useRef, useState } from 'react'
import { MainContainer } from '../../../../styles/common'
import {
  Title,
  Wrapper,
  Top,
  Content,
  SwiperWrap,
  SliderWrapper,
  PhoneButton,
  ItemToggle,
} from './styled'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import Link from 'next/link'
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../../styles/sliderBlocks'
import catalogOrDefault from '../../../../utils/catalogOrDefault'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'
import { ThingsProps } from '../SalonsFavorites'
import { IMaster } from 'src/types/masters'
import MasterItem from 'src/components/blocks/MasterCard'

SwiperCore.use([Navigation])

const MastersFavorites: FC<ThingsProps> = ({
  title,
  noScroll = false,
  cabinet = false,
  mobile = false,
  setActiveTab = () => {},
  handleDeleted,
}) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { city, user } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)

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

  const [deleteItem, setDeleteItem] = useState(false)
  const [toggle, setToggle] = useState(mobile && cabinet && true)

  let masters: IMaster[] = user?.favorite?.masters || []
  if (typeof window !== 'undefined') {
    const mastersLocal =
      JSON.parse(localStorage.getItem('favorites') || '{}')?.masters || []
    if (!masters.length) masters = mastersLocal
  } else return <div></div>

  if (!masters?.length) {
    setActiveTab('all')
  }

  return (
    <Wrapper>
      <MainContainer>
        {mobile && cabinet ? (
          <ItemToggle
            disabled={!!!masters?.length}
            toggle={!toggle}
            onClick={() => setToggle(!toggle)}
          >
            Мастера {!!masters?.length && `(${masters?.length})`}
          </ItemToggle>
        ) : null}
        {!toggle && masters?.length ? (
          <Content cabinet={cabinet}>
            <Top>
              <Title cabinet={cabinet}>{title}</Title>
              <NavigationWrapper>
                <ButtonPrev ref={navigationPrevRef} />
                <ButtonNext ref={navigationNextRef} />
              </NavigationWrapper>
            </Top>
            <SliderWrapper>
              <SwiperWrap>
                <Swiper
                  style={{ padding: '5px', marginLeft: '-5px' }}
                  mousewheel={true}
                  pagination={{ clickable: true }}
                  slidesPerView={5}
                  spaceBetween={15}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={onBeforeInit}
                  breakpoints={{
                    320: {
                      slidesPerView: 1.2,
                    },
                    400: {
                      slidesPerView: 1.7,
                    },
                    480: {
                      slidesPerView: 2.2,
                    },
                    600: {
                      slidesPerView: 2.7,
                    },
                    768: {
                      slidesPerView: cabinet ? 3 : 5,
                      spaceBetween: 15,
                    },
                  }}
                >
                  {masters &&
                    masters.map((master, i) => (
                      <SwiperSlide
                        style={{ minHeight: '100%', height: 'auto' }}
                        key={i}
                      >
                        <Link
                          href={`/${
                            cyrToTranslit(master?.city.name) || city.slug
                          }/master/${master?.id}`}
                        >
                          <MasterItem
                            master={master}
                            handleDeleted={handleDeleted}
                            shareLink={`https://moisalon-frontend.jetsite.ru/${city.slug}/master/${master?.id}`}
                          />
                        </Link>
                        {master?.phone && !cabinet ? (
                          <PhoneButton href={`tel:${master?.phone}`}>
                            Онлайн-запись
                          </PhoneButton>
                        ) : null}
                      </SwiperSlide>
                    ))}
                </Swiper>
              </SwiperWrap>
            </SliderWrapper>
          </Content>
        ) : null}
      </MainContainer>
    </Wrapper>
  )
}

export default MastersFavorites
