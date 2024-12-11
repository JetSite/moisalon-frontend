import { useRef, useState } from 'react'
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
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import Link from 'next/link'
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../../styles/sliderBlocks'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import Education from '../../../blocks/Education'
import { useBeforeInit } from 'src/components/blocks/Slider/useBeforeInit'

SwiperCore.use([Navigation])

const EducationsFavorites = ({
  title,
  setEducationsEmpty = () => {},
  cabinet = false,
  mobile = false,
  handleDeleted,
}) => {
  const { onBeforeInit, navigationPrevRef, navigationNextRef } = useBeforeInit()
  const [toggle, setToggle] = useState(mobile && cabinet && true)
  const [deleteItem, setDeleteItem] = useState(false)

  let educations
  if (typeof window !== 'undefined') {
    educations = JSON.parse(localStorage.getItem('favorites'))?.educations || []
    if (!educations.length) {
      setEducationsEmpty(true)
    }
  }
  return (
    <Wrapper cabinet={cabinet}>
      <MainContainer>
        {mobile && cabinet ? (
          <ItemToggle
            disabled={!!!educations?.length}
            toggle={!toggle}
            onClick={() => setToggle(!toggle)}
          >
            Обучение {!!educations?.length && `(${educations?.length})`}
          </ItemToggle>
        ) : null}
        {!toggle && educations?.length ? (
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
                  spaceBetween={15}
                  slidesPerView={cabinet ? 1 : 'auto'}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={onBeforeInit}
                >
                  {educations &&
                    educations.map((item, i) => (
                      <SwiperSlide
                        style={{
                          minHeight: '100%',
                          height: 'auto',
                          width: 'auto',
                        }}
                        key={i}
                      >
                        <Link href={`/educations/${item.id}`} passHref>
                          <Education item={item} noHover />
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

export default EducationsFavorites
