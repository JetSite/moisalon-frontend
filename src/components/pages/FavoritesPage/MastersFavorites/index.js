import { useRef, useState } from 'react'
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
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import Link from 'next/link'
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../../styles/sliderBlocks'
import catalogOrDefault from '../../../../utils/catalogOrDefault'
import MasterItem from './components/MasterItem'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

SwiperCore.use([Navigation])

const MastersFavorites = ({
  title,
  noScroll = false,
  setMasterEmpty = () => {},
  cabinet = false,
  mobile = false,
}) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { city } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)
  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog,
  )

  const onBeforeInit = Swiper => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      navigation.prevEl = navigationPrevRef.current
      navigation.nextEl = navigationNextRef.current
    }
  }

  const [deleteItem, setDeleteItem] = useState(false)
  const [toggle, setToggle] = useState(mobile && cabinet && true)

  let masters
  if (typeof window !== 'undefined') {
    masters = JSON.parse(localStorage.getItem('favorites'))?.masters || []
    if (!masters.length) {
      setMasterEmpty(true)
    }
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
                          href={`/${cyrToTranslit(
                            master?.addressFull?.city || city,
                          )}/master/${master?.seo?.slug || master?.id}`}
                        >
                          <MasterItem
                            master={master}
                            catalog={masterSpecializationsCatalog}
                            deleteItem={deleteItem}
                            setDeleteItem={setDeleteItem}
                          />
                        </Link>
                        {master?.phone?.phoneNumber && !cabinet ? (
                          <PhoneButton
                            href={`tel:${master?.phone?.phoneNumber}`}
                          >
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
