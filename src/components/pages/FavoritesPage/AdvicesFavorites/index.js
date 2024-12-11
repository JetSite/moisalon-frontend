import { useRef, useState } from 'react'
import { MainContainer } from '../../../../styles/common'
import {
  Title,
  Wrapper,
  Top,
  Content,
  SwiperWrap,
  SliderWrapper,
} from './styled'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../../styles/sliderBlocks'
import AdviceItem from './components/AdviceItem'
import { useBeforeInit } from 'src/components/blocks/Slider/useBeforeInit'

SwiperCore.use([Navigation])

const AdvicesFavorites = ({ title, setAdviceEmpty }) => {
  const { onBeforeInit, navigationPrevRef, navigationNextRef } = useBeforeInit()
  const [deleteItem, setDeleteItem] = useState(false)

  let advices
  if (typeof window !== 'undefined') {
    advices = JSON.parse(localStorage.getItem('favorites'))?.advices || []
    if (!advices.length) {
      setAdviceEmpty(true)
    }
  }

  return (
    <Wrapper>
      <MainContainer>
        {advices?.length ? (
          <Content>
            <Top>
              <Title>{title}</Title>
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
                      slidesPerView: 1.1,
                    },
                    480: {
                      slidesPerView: 1.7,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                  }}
                >
                  {advices &&
                    advices.map((advice, i) => (
                      <SwiperSlide
                        style={{
                          minHeight: '100%',
                          height: 'auto',
                        }}
                        key={i}
                      >
                        <AdviceItem
                          advice={advice}
                          deleteItem={deleteItem}
                          setDeleteItem={setDeleteItem}
                        />
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

export default AdvicesFavorites
