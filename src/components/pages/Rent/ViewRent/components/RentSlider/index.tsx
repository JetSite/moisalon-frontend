import { FC, useRef } from 'react'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'

import { MainContainer } from '../../../../../../styles/common'
import Link from 'next/link'
import { Content, Wrapper, Top, Title, SwiperWrap } from './styles'
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
  SliderWpapper,
} from '../../../../../../styles/sliderBlocks'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { cyrToTranslit } from '../../../../../../utils/translit'
import RentCard from '../../../../../blocks/RentCard'
import { ISalonPage } from 'src/types/salon'
import { NavigationOptions } from 'swiper/types'

SwiperCore.use([Navigation])

interface Props {
  salon: ISalonPage
  title?: string
}

const RentSlider: FC<Props> = ({ salon, title }) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { city } = useAuthStore(getStoreData)

  const onBeforeInit = (Swiper: SwiperClass) => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation as NavigationOptions
      navigation.prevEl = navigationPrevRef.current
      navigation.nextEl = navigationNextRef.current
    }
  }

  return (
    <Wrapper id="rent">
      <MainContainer>
        <Content>
          <Top>
            <Title>{title}</Title>
            <NavigationWrapper>
              <ButtonPrev ref={navigationPrevRef} />
              <ButtonNext ref={navigationNextRef} />
            </NavigationWrapper>
          </Top>
          <SliderWpapper>
            <SwiperWrap>
              <Swiper
                style={{
                  padding: '5px',
                  marginLeft: '-5px',
                  marginRight: '-9px',
                }}
                mousewheel={true}
                pagination={{ clickable: true }}
                spaceBetween={19}
                slidesPerView={'auto'}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={onBeforeInit}
              >
                {salon?.workplaces.length
                  ? salon?.workplaces.map((item, i) => (
                      <SwiperSlide
                        style={{
                          width: 'auto',
                          minHeight: '100%',
                          height: 'auto',
                        }}
                        key={i}
                      >
                        <Link
                          href={`/${salon.city.slug || city.slug}/rent/${
                            salon?.id
                          }/workplace/${item.id}`}
                        >
                          <RentCard item={item} salon={salon} />
                        </Link>
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </SwiperWrap>
          </SliderWpapper>
        </Content>
      </MainContainer>
    </Wrapper>
  )
}

export default RentSlider
