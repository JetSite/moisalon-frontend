import { FC, useEffect, useRef, useState } from 'react'
import { MainContainer } from '../../../../styles/common'
import {
  Title,
  Wrapper,
  Top,
  Content,
  SwiperWrap,
  SliderWrapper,
  Empty,
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
import BrandItem from './components/BrandItem'
import { cyrToTranslit } from '../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { ThingsProps } from '../SalonsFavorites'
import { IBrand } from 'src/types/brands'
import { useBeforeInit } from 'src/components/blocks/Slider/useBeforeInit'
SwiperCore.use([Navigation])

const BrandsFavorites: FC<ThingsProps> = ({
  title,
  setActiveTab = () => {},
  cabinet = false,
  mobile = false,
  handleDeleted,
}) => {
  const { city, user } = useAuthStore(getStoreData)
  const { onBeforeInit, navigationPrevRef, navigationNextRef } = useBeforeInit()
  const [deleteItem, setDeleteItem] = useState(false)
  const [toggle, setToggle] = useState(mobile && cabinet && true)

  let brands: IBrand[] = user?.favorite?.brands || []
  if (typeof window !== 'undefined') {
    const brandLocal =
      JSON.parse(localStorage.getItem('favorites') || '{}')?.brands || []
    if (!brands.length) brands = brandLocal
  } else return <div></div>
  if (!brands?.length) {
    setActiveTab('all')
    return null
  }
  return (
    <Wrapper cabinet={cabinet}>
      <MainContainer>
        {mobile && cabinet ? (
          <ItemToggle
            disabled={!!!brands?.length}
            toggle={!toggle}
            onClick={() => setToggle(!toggle)}
          >
            Бренды {!!brands?.length && `(${brands?.length})`}
          </ItemToggle>
        ) : null}
        {!toggle && brands?.length ? (
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
                  slidesPerView={6}
                  spaceBetween={22}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={onBeforeInit}
                  breakpoints={{
                    320: {
                      slidesPerView: 1.5,
                    },
                    370: {
                      slidesPerView: 1.8,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 2.4,
                      spaceBetween: 10,
                    },
                    600: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: cabinet ? 3 : 6,
                      spaceBetween: 15,
                    },
                  }}
                >
                  {brands &&
                    brands.map((brand, i) => (
                      <SwiperSlide
                        style={{ minHeight: '100%', height: 'auto' }}
                        key={i}
                      >
                        <Link
                          href={`/${
                            cyrToTranslit(brand.city?.name) || city.slug
                          }/brand/${brand.id}`}
                        >
                          <BrandItem
                            brand={brand}
                            deleteItem={deleteItem}
                            setDeleteItem={setDeleteItem}
                            handleDeleted={handleDeleted}
                          />
                        </Link>
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

export default BrandsFavorites
