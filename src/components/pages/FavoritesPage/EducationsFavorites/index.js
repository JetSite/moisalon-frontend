import { useContext, useRef, useState } from 'react'
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
import { CityContext } from '../../../../searchContext'
import Education from '../../../blocks/Education'

SwiperCore.use([Navigation])

const EducationsFavorites = ({
  title,
  setEducationsEmpty = () => {},
  cabinet = false,
  mobile = false,
  handleDeleted,
}) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const [city] = useContext(CityContext)

  const onBeforeInit = Swiper => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      navigation.prevEl = navigationPrevRef.current
      navigation.nextEl = navigationNextRef.current
    }
  }

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
                          <Education
                            averageScore={item.averageScore}
                            numberScore={item.numberScore}
                            id={item.id}
                            title={item.title}
                            amount={item.amount}
                            photoId={item.photoId}
                            dateStart={item.dateStart}
                            dateEnd={item.dateEnd}
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

export default EducationsFavorites
