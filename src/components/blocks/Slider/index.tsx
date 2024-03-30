import {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { MainContainer, MobileVisible } from '../../../styles/common'
import {
  Title,
  Wrapper,
  Top,
  Content,
  SwiperWrap,
  ShowAll,
  ShowAllWrapper,
  BottomMobile,
  SliderWrapper,
  ButtonWrap,
  ButtonWrapBrandLanding,
  SeeAllGoods,
  SeeAllMain,
  SeeAllBody,
  SeeAllText,
  SeeAllBodyText,
  TickIconWrap,
  TickIcon,
  Text,
  ChangeCity,
  TitleIconWrapper,
} from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import Link from 'next/link'
import {
  Bottom,
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from '../../../styles/sliderBlocks'
import Skeleton from '../../pages/MainPage/components/SearchMain/MainSearchSkeleton'
import {
  MasterSlide,
  SalonSlide,
  BrandSlide,
  GoodSlide,
  RibbonSlide,
  PortfolioSlide,
  VacancySlide,
  AdSlide,
  RentSalonSlide,
  WorkplaceSlide,
} from './components/SliderItems'
import {
  AllMastersSlide,
  AllSalonsSlide,
  AllBrandsSlide,
  AllGoodsSlide,
  AllAdsSlide,
  AllRentSalons,
  AllRentWorkplaces,
} from './components/ShowAllSlides'
import {
  MasterBottomButton,
  SalonBottomButton,
  BrandBottomButton,
  GoodBottomButton,
  RibbonBottomButton,
  AdBottomButton,
  WorkplaceBottomButton,
} from './components/BottomButtons'
import Button from '../../ui/Button'
import EditIcons from '../../ui/EditIcons'
import { CityContext, MeContext } from '../../../searchContext'
import { cyrToTranslit } from '../../../utils/translit'
import CityPingIcon from '../../pages/MainPage/components/Header/icons/CityPingIcon'
import CitySelect from '../../pages/MainPage/components/CitySelect/CitySelect'
import { IChildren, IID } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IDeleteFunction } from './components/SliderItems/BrandSlide'

SwiperCore.use([Navigation])
export type SlideType =
  | 'masters'
  | 'salons'
  | 'brands'
  | 'goods'
  | 'ribbon'
  | 'portfolio'
  | 'diploms'
  | 'vacancies'
  | 'ads'
  | 'rentSalons'
  | 'rentWorkplaces'

interface Props {
  children?: IChildren
  type: SlideType
  items: IMaster[] | IBrand[] | ISalon[]
  title: string
  typeObject?: { addressFull: { city: string } } | null
  noBottom?: boolean
  noAll?: boolean
  noAllButton?: boolean
  loading?: boolean
  bgColor?: string
  isOwner?: boolean
  isEditing?: boolean
  setIsEditing?: Dispatch<SetStateAction<boolean>>
  deleteFunction?: IDeleteFunction
  pt?: number
  pb?: number
  pl?: number
  isCityChangeable?: boolean
  noFirstSlide?: boolean
  salon?: ISalonPage
  mobileTitleWidth?: boolean
  noPadding?: boolean
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
}) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const onBeforeInit = (Swiper: SwiperCore) => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      if (navigation) {
        navigation.prevEl = navigationPrevRef.current
        navigation.nextEl = navigationNextRef.current
      }
    }
  }

  const [city] = useContext(CityContext)
  const [showCitySelect, setShowCitySelect] = useState(false)
  const [me, setMe] = useContext(MeContext)
  const router = useRouter()
  const landingMaster = router.pathname === '/for_master'
  const landingSalon = router.pathname === '/for_salon'
  const landingBrand = router.pathname === '/for_brand'

  let defaultCity

  if (typeof window !== 'undefined' && window.localStorage) {
    defaultCity = me?.info?.city
      ? me.info.city
      : localStorage.getItem('citySalon')
      ? localStorage.getItem('citySalon')
      : me?.locationByIp
      ? me?.locationByIp?.data?.city
      : ''
  }
  type ICustomProps = (
    type: SlideType,
    item?: IMaster | null,
    typeObject?: { addressFull: { city: string } } | null,
  ) => {
    sliderItem: ReactElement
    isAllPage?: boolean
    slidesCountWhenAllShow?: number
    showAllSlide?: ReactElement
    showAllLink?: ReactElement
    bottom?: ReactElement
    landingItem?: ReactElement
    firstSlide?: ReactElement
  }

  const customProps: ICustomProps = (
    type: SlideType,
    item: IMaster | IBrand | ISalon | null = null,
    typeObject: { addressFull: { city: string } } | null = null,
  ) => {
    switch (type) {
      case 'masters':
        return {
          sliderItem: <MasterSlide item={item as IMaster} />,
          isAllPage: router.pathname === '/[city]/master',
          slidesCountWhenAllShow: 5,
          showAllSlide: <AllMastersSlide />,
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/master`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          bottom: <MasterBottomButton bgColor={bgColor} />,
        }
      case 'salons':
        return {
          sliderItem: (
            <SalonSlide
              item={item as ISalon}
              isEditing={isEditing}
              deleteFunction={deleteFunction as IDeleteFunction}
            />
          ),
          isAllPage: router.pathname === `/[city]/salon`,
          slidesCountWhenAllShow: 3,
          showAllSlide: <AllSalonsSlide />,
          showAllLink: (
            <Link
              href={
                !landingMaster
                  ? `/${cyrToTranslit(city)}/salon`
                  : `/${cyrToTranslit(city)}/rent`
              }
            >
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          bottom: <SalonBottomButton bgColor={bgColor} />,
          landingItem: (
            <ButtonWrap>
              <Button
                style={{ padding: 0 }}
                onClick={() => router.push('/createLessorSalon')}
                size="medium"
                variant="red"
                font="medium"
              >
                Зарегистрировать салон
              </Button>
            </ButtonWrap>
          ),
        }
      case 'brands':
        return {
          sliderItem: (
            <BrandSlide
              item={item as IBrand}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
            />
          ),
          isAllPage: router.pathname === '/[city]/brand',
          slidesCountWhenAllShow: 6,
          showAllSlide: <AllBrandsSlide />,
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/brand`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          bottom: <BrandBottomButton bgColor={bgColor} />,
          landingItem: (
            <ButtonWrapBrandLanding>
              <Button
                onClick={() => router.push('/login')}
                size="medium"
                variant="red"
                font="medium"
              >
                Разместить каталог
              </Button>
            </ButtonWrapBrandLanding>
          ),
        }
      case 'goods':
        return {
          firstSlide: (
            <Link
              href={
                router.query.id === '62fb9f7884fe720001f6771c'
                  ? `/${cyrToTranslit(
                      typeObject?.addressFull?.city || city,
                    )}/beautyFreeShop`
                  : `/${cyrToTranslit(
                      typeObject?.addressFull?.city || city,
                    )}/brand/${router.query.id}/products`
              }
            >
              <SeeAllMain>
                <SeeAllGoods>
                  <SeeAllText>Показать все товары бренда</SeeAllText>
                </SeeAllGoods>
                <SeeAllBody>
                  <SeeAllBodyText>Перейти в магазин</SeeAllBodyText>
                </SeeAllBody>
              </SeeAllMain>
            </Link>
          ),
          sliderItem: <GoodSlide item={item} />,
          slidesCountWhenAllShow: 6,
          showAllSlide: <AllGoodsSlide />,
          bottom: <GoodBottomButton />,
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
        }
      case 'ribbon':
        return {
          sliderItem: <RibbonSlide item={item} />,
          // bottom: <RibbonBottomButton />,
        }
      case 'portfolio':
        return {
          sliderItem: (
            <PortfolioSlide
              item={item}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
            />
          ),
        }
      case 'diploms':
        return {
          sliderItem: (
            <PortfolioSlide
              item={item}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
            />
          ),
        }
      case 'vacancies':
        return {
          sliderItem: <VacancySlide item={item} />,
        }
      case 'ads':
        return {
          sliderItem: <AdSlide item={item} />,
          bottom: <AdBottomButton bgColor={bgColor} />,
          slidesCountWhenAllShow: 3,
          showAllSlide: <AllAdsSlide />,
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/sales`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
        }
      case 'rentSalons':
        return {
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/rent`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          sliderItem: <RentSalonSlide item={item} />,
          slidesCountWhenAllShow: 3,
          showAllSlide: <AllRentSalons />,

          bottom: <SalonBottomButton bgColor={bgColor} />,
        }
      case 'rentWorkplaces':
        return {
          sliderItem: <WorkplaceSlide item={item} salon={salon} />,
          slidesCountWhenAllShow: 3,
          showAllSlide: <AllRentWorkplaces salon={salon} />,
          showAllLink: (
            <Link
              href={`/${cyrToTranslit(salon?.salonAddress)}/rent/${salon?.id}`}
            >
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          bottom: <WorkplaceBottomButton bgColor={bgColor} />,
        }
      // default:
      //   return { sliderItem: <></> }
    }
  }

  return (
    <Wrapper id={type} loading={loading} type={type} bgColor={bgColor}>
      <MainContainer>
        {!loading ? (
          <Content
            bgWithIcons={type === 'masters'}
            pt={pt}
            pb={pb}
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
                {title} {isOwner && <EditIcons setIsEditing={setIsEditing} />}
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
                <SwiperWrap pl={items?.length === 1 ? 0 : pl}>
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
                    {customProps(type).firstSlide && !noFirstSlide && (
                      <SwiperSlide
                        style={{
                          minHeight: '100%',
                          height: 'auto',
                          width: 'auto',
                        }}
                      >
                        {
                          customProps(type, items[0] as IMaster, typeObject)
                            .firstSlide
                        }
                      </SwiperSlide>
                    )}
                    {items?.map((item, i) => (
                      <SwiperSlide
                        style={{
                          minHeight: '100%',
                          height: 'auto',
                          width: 'auto',
                        }}
                        key={i}
                      >
                        {customProps(type, item as IMaster).sliderItem}
                      </SwiperSlide>
                    ))}
                    {items?.length >=
                      (customProps(type).slidesCountWhenAllShow as number) &&
                      !customProps(type).isAllPage &&
                      !noAll && (
                        <SwiperSlide
                          style={{
                            minHeight: '100%',
                            height: 'auto',
                            width: 'auto',
                            marginRight: 0,
                          }}
                        >
                          {customProps(type).showAllSlide}
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
              <ShowAllWrapper>{customProps(type).showAllLink}</ShowAllWrapper>
            ) : null}
            {!noBottom ? <Bottom>{customProps(type).bottom}</Bottom> : null}
            {landingSalon || landingBrand
              ? customProps(type).landingItem
              : null}
          </Content>
        ) : null}
      </MainContainer>
      {!loading && !noBottom ? (
        <BottomMobile>{customProps(type).bottom}</BottomMobile>
      ) : null}

      {/* {loading ? <ColorLinearProgress /> : null} */}
      {loading ? <Skeleton /> : null}
      <CitySelect
        setMeInfo={setMe}
        showCitySelect={showCitySelect}
        setShowCitySelect={setShowCitySelect}
      />
    </Wrapper>
  )
}

export default Slider
