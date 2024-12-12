import { Dispatch, FC, SetStateAction, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { MainContainer, MobileVisible } from '../../../styles/common'
import {
  Title,
  Wrapper,
  Top,
  Content,
  SwiperWrap,
  ShowAllWrapper,
  BottomMobile,
  SliderWrapper,
  TitleIconWrapper,
} from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import {
  Bottom,
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../styles/sliderBlocks'
import Skeleton from '../../pages/MainPage/components/SearchMain/MainSearchSkeleton'
import EditIcons from '../../ui/EditIcons'
import CityPingIcon from '../../pages/MainPage/components/Header/icons/CityPingIcon'
import CitySelect from '../../pages/MainPage/components/CitySelect/CitySelect'
import { IChildren, ISetState } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IDeleteFunction } from './components/SliderItems/BrandSlide'
import { customProps } from './customProps'
import { ICity, IPhoto } from 'src/types'
import { IProduct } from 'src/types/product'
import { IVacancy } from 'src/types/vacancies'
import { IPromotions } from 'src/types/promotions'
import { useBeforeInit } from './useBeforeInit'

SwiperCore.use([Navigation])
export type SlideType =
  | 'masters'
  | 'salons'
  | 'brands'
  | 'goods'
  | 'ribbon'
  | 'photos'
  | 'vacancies'
  | 'ads'
  | 'rentSalons'
  | 'rentWorkplaces'

interface Props {
  children?: IChildren
  type: SlideType
  items:
    | IMaster[]
    | IBrand[]
    | ISalon[]
    | IPhoto[]
    | IProduct[]
    | IVacancy[]
    | IPromotions[]
  title?: string
  typeObject?: IMaster | IBrand | ISalon | IPhoto | IPromotions | null
  noBottom?: boolean
  noAll?: boolean
  noAllButton?: boolean
  loading?: boolean
  bgColor?: string
  isOwner?: boolean
  isEditing?: boolean
  setIsEditing?: ISetState<boolean>
  deleteFunction?: IDeleteFunction
  pt?: number
  pb?: number
  pl?: number
  isCityChangeable?: boolean
  noFirstSlide?: boolean
  salon?: ISalonPage
  mobileTitleWidth?: boolean
  noPadding?: boolean
  noAllPadding?: boolean
  city: ICity
  id?: string
}

const Slider: FC<Props> = ({
  children,
  type,
  items,
  title,
  typeObject = null,
  noBottom = false,
  noAll = false,
  noAllButton = false,
  loading = false,
  bgColor = '#fff',
  isOwner = false,
  isEditing = false,
  setIsEditing,
  deleteFunction,
  pt = 0,
  pb = 0,
  pl = 5,
  isCityChangeable = false,
  noFirstSlide = false,
  salon = null,
  mobileTitleWidth = false,
  noPadding = false,
  noAllPadding = false,
  city,
  id,
}) => {
  const { onBeforeInit, navigationPrevRef, navigationNextRef } = useBeforeInit()

  const [showCitySelect, setShowCitySelect] = useState(false)
  const router = useRouter()
  const landingMaster = router.pathname === '/for_master'
  const landingSalon = router.pathname === '/for_salon'
  const landingBrand = router.pathname === '/for_brand'

  const customTypeProps = useMemo(
    () =>
      customProps({
        type,
        landingMaster,
        bgColor,
        salon,
        city,
        router,
      }),
    [type, landingMaster, bgColor, salon, city, router],
  )

  const firstSlide = useMemo(() => {
    const firstSlide = items?.length
      ? customProps({
          type,
          item: items[0],
          typeObject,
          bgColor,
          isEditing,
          deleteFunction,
          salon,
          landingMaster,
          city,
          router,
        })
      : null

    return firstSlide ? firstSlide.firstSlide : null
  }, [
    type,
    items,
    typeObject,
    bgColor,
    isEditing,
    deleteFunction,
    salon,
    landingMaster,
    city,
    router,
  ])

  return (
    <Wrapper id={id ?? type} load={loading} type={type} bgColor={bgColor}>
      <MainContainer>
        {!loading ? (
          <Content
            bgWithIcons={type === 'masters'}
            pt={pt}
            pb={pb}
            noAllPadding={noAllPadding}
            noPadding={noPadding ? noPadding : items?.length === 1}
          >
            <Top>
              {isCityChangeable ? (
                <MobileVisible>
                  <TitleIconWrapper
                    onClick={() => {
                      setShowCitySelect(true)
                    }}
                  >
                    <CityPingIcon color="#fff" />
                  </TitleIconWrapper>
                </MobileVisible>
              ) : null}
              <Title
                bgColor={bgColor}
                empty={items?.length === 0}
                mobileTitleWidth={mobileTitleWidth}
              >
                <span>{title}</span>
                {isOwner ? <EditIcons setIsEditing={setIsEditing} /> : null}
              </Title>
              {items?.length > 0 && (
                <NavigationWrapper>
                  <ButtonPrev
                    ref={navigationPrevRef}
                    color={bgColor === '#000' ? 'white' : ''}
                  />
                  <ButtonNext
                    ref={navigationNextRef}
                    color={bgColor === '#000' ? 'white' : ''}
                  />
                </NavigationWrapper>
              )}
            </Top>
            {items?.length ? (
              <SliderWrapper>
                <SwiperWrap pl={items?.length > 2 ? 0 : pl}>
                  <Swiper
                    mousewheel={true}
                    pagination={{ clickable: true }}
                    slidesPerView={'auto'}
                    initialSlide={0}
                    spaceBetween={18}
                    navigation={{
                      prevEl: navigationPrevRef.current,
                      nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={onBeforeInit}
                    breakpoints={{
                      320: {
                        centeredSlides: items?.length === 1,
                      },
                      700: {
                        centeredSlides: false,
                      },
                    }}
                  >
                    {firstSlide && !noFirstSlide && (
                      <SwiperSlide
                        style={{
                          minHeight: '100%',
                          height: 'auto',
                          width: 'auto',
                        }}
                      >
                        {firstSlide}
                      </SwiperSlide>
                    )}
                    {items?.map((item, i) => {
                      const slide = customProps({
                        type,
                        item,
                        typeObject,
                        bgColor,
                        isEditing,
                        deleteFunction,
                        salon,
                        landingMaster,
                        city,
                        router,
                      })

                      return (
                        <SwiperSlide
                          style={{
                            minHeight: '100%',
                            height: 'auto',
                            width: 'auto',
                          }}
                          key={i}
                        >
                          {slide.sliderItem}
                        </SwiperSlide>
                      )
                    })}
                    {items?.length >=
                      (customTypeProps.slidesCountWhenAllShow as number) &&
                      !customTypeProps.isAllPage &&
                      !noAll && (
                        <SwiperSlide
                          style={{
                            minHeight: '100%',
                            height: 'auto',
                            width: 'auto',
                            marginRight: 0,
                          }}
                        >
                          {customTypeProps.showAllSlide}
                        </SwiperSlide>
                      )}
                  </Swiper>
                </SwiperWrap>
              </SliderWrapper>
            ) : null}
            {children}
            {!landingMaster &&
            !landingSalon &&
            !landingBrand &&
            !noAllButton ? (
              <ShowAllWrapper>{customTypeProps.showAllLink}</ShowAllWrapper>
            ) : null}
            {!noBottom ? <Bottom>{customTypeProps.bottom}</Bottom> : null}
            {landingSalon || landingBrand ? customTypeProps.landingItem : null}
          </Content>
        ) : null}
      </MainContainer>
      {!loading && !noBottom ? (
        <BottomMobile>{customTypeProps.bottom}</BottomMobile>
      ) : null}

      {/* {loading ? <ColorLinearProgress /> : null} */}
      {loading ? <Skeleton /> : null}
      <CitySelect
        showCitySelect={showCitySelect}
        setShowCitySelect={setShowCitySelect}
      />
    </Wrapper>
  )
}

export default Slider
