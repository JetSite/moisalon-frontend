import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MainContainer, MobileVisible } from "../../../styles/common";
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
} from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import Link from "next/link";
import {
  Bottom,
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from "../../../styles/sliderBlocks";
import Skeleton from "../../pages/MainPage/components/SearchMain/MainSearchSkeleton";
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
} from "./components/SliderItems";
import {
  AllMastersSlide,
  AllSalonsSlide,
  AllBrandsSlide,
  AllGoodsSlide,
  AllAdsSlide,
  AllRentSalons,
  AllRentWorkplaces,
} from "./components/ShowAllSlides";
import {
  MasterBottomButton,
  SalonBottomButton,
  BrandBottomButton,
  GoodBottomButton,
  RibbonBottomButton,
  AdBottomButton,
  WorkplaceBottomButton,
} from "./components/BottomButtons";
import Button from "../../ui/Button";
import EditIcons from "../../ui/EditIcons";
import { CityContext, MeContext } from "../../../searchContext";
import { cyrToTranslit } from "../../../utils/translit";
import CityPingIcon from "../../pages/MainPage/components/Header/icons/CityPingIcon";
import CitySelect from "../../pages/MainPage/components/CitySelect/CitySelect";

SwiperCore.use([Navigation]);

const Slider = ({
  children,
  type,
  items,
  title,
  typeObject = null,
  noBottom = false,
  noAll = false,
  noAllButton = false,
  noScroll = false,
  loading = false,
  catalog = null,
  bgColor = "#fff",
  isOwner = false,
  isEditing = false,
  setIsEditing,
  deleteFunction,
  pt = 0,
  pb = 0,
  pl = 5,
  addProductToCart,
  deleteItemFromCart,
  cart,
  loadingCart,
  isCityChangeable = false,
  landing = false,
  noFirstSlide = false,
  salon = null,
  cityPinIcon = false,
  mobileTitleWidth = false,
  noPadding = null,
  chooseProductOneClick = null,
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const onBeforeInit = (Swiper) => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;
    }
  };

  const [city] = useContext(CityContext);
  const [showCitySelect, setShowCitySelect] = useState(false);
  const [me, setMe] = useContext(MeContext);
  const router = useRouter();
  const landingMaster = router.pathname === "/for_master";
  const landingSalon = router.pathname === "/for_salon";
  const landingBrand = router.pathname === "/for_brand";

  let defaultCity;

  if (typeof window !== "undefined" && window.localStorage) {
    defaultCity = me?.info?.city
      ? me.info.city
      : localStorage.getItem("citySalon")
      ? localStorage.getItem("citySalon")
      : me?.locationByIp
      ? me?.locationByIp?.data?.city
      : "";
  }

  const customProps = (type, item = null, typeObject = null) => {
    switch (type) {
      case "masters":
        return {
          sliderItem: <MasterSlide item={item} catalog={catalog} />,
          isAllPage: router.pathname === "/[city]/master",
          slidesCountWhenAllShow: 5,
          showAllSlide: <AllMastersSlide />,
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/master`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          bottom: <MasterBottomButton bgColor={bgColor} />,
        };
      case "salons":
        return {
          sliderItem: (
            <SalonSlide
              item={item}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
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
                onClick={() => router.push("/createLessorSalon")}
                size="medium"
                variant="red"
                font="medium"
              >
                Зарегистрировать салон
              </Button>
            </ButtonWrap>
          ),
        };
      case "brands":
        return {
          sliderItem: (
            <BrandSlide
              item={item}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
            />
          ),
          isAllPage: router.pathname === "/[city]/brand",
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
                onClick={() => router.push("/login")}
                size="medium"
                variant="red"
                font="medium"
              >
                Разместить каталог
              </Button>
            </ButtonWrapBrandLanding>
          ),
        };
      case "goods":
        return {
          firstSlide: (
            <Link
              href={
                router.query.id === "62fb9f7884fe720001f6771c"
                  ? `/${cyrToTranslit(
                      typeObject?.addressFull?.city || city
                    )}/beautyFreeShop`
                  : `/${cyrToTranslit(
                      typeObject?.addressFull?.city || city
                    )}/brand/${router.query.id}/products`
              }
            >
              <a>
                <SeeAllMain>
                  <SeeAllGoods>
                    <SeeAllText>Показать все товары бренда</SeeAllText>
                  </SeeAllGoods>
                  <SeeAllBody>
                    <SeeAllBodyText>Перейти в магазин</SeeAllBodyText>
                  </SeeAllBody>
                </SeeAllMain>
              </a>
            </Link>
          ),
          sliderItem: (
            <GoodSlide
              item={item}
              chooseProductOneClick={chooseProductOneClick}
            />
          ),
          slidesCountWhenAllShow: 6,
          showAllSlide: <AllGoodsSlide />,
          bottom: <GoodBottomButton bgColor={bgColor} />,
          showAllLink: (
            <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
        };
      case "ribbon":
        return {
          sliderItem: <RibbonSlide item={item} />,
          // bottom: <RibbonBottomButton />,
        };
      case "portfolio":
        return {
          sliderItem: (
            <PortfolioSlide
              item={item}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
            />
          ),
        };
      case "diploms":
        return {
          sliderItem: (
            <PortfolioSlide
              item={item}
              isEditing={isEditing}
              deleteFunction={deleteFunction}
            />
          ),
        };
      case "vacancies":
        return {
          sliderItem: <VacancySlide item={item} />,
        };
      case "ads":
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
        };
      case "rentSalons":
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
        };
      case "rentWorkplaces":
        return {
          sliderItem: <WorkplaceSlide item={item} salon={salon} />,
          slidesCountWhenAllShow: 3,
          showAllSlide: <AllRentWorkplaces salon={salon} />,
          showAllLink: (
            <Link
              href={`/${cyrToTranslit(salon?.address?.city)}/rent/${
                salon?.seo?.slug || salon?.id
              }`}
            >
              <ShowAll bgColor={bgColor}>Показать все</ShowAll>
            </Link>
          ),
          bottom: <WorkplaceBottomButton bgColor={bgColor} />,
        };
    }
  };

  return (
    <Wrapper id={type} $loading={loading} type={type} bgColor={bgColor}>
      <MainContainer>
        {!loading ? (
          <Content
            bgWithIcons={type === "masters"}
            pt={pt}
            pb={pb}
            noPadding={noPadding ? noPadding : items?.length === 1}
          >
            <Top>
              {isCityChangeable ? (
                <MobileVisible>
                  <TitleIconWrapper
                    onClick={() => {
                      setShowCitySelect(true);
                    }}
                  >
                    <CityPingIcon color="#fff" />
                  </TitleIconWrapper>
                </MobileVisible>
              ) : null}
              <Title
                bgColor={bgColor}
                empty={items.length === 0}
                mobileTitleWidth={mobileTitleWidth}
              >
                {title} {isOwner && <EditIcons setIsEditing={setIsEditing} />}
              </Title>
              {items.length > 0 && (
                <NavigationWrapper>
                  <ButtonPrev
                    ref={navigationPrevRef}
                    color={bgColor === "#000" ? "white" : ""}
                  />
                  <ButtonNext
                    ref={navigationNextRef}
                    color={bgColor === "#000" ? "white" : ""}
                  />
                </NavigationWrapper>
              )}
            </Top>
            {items.length ? (
              <SliderWrapper>
                <SwiperWrap pl={items?.length === 1 ? 0 : pl}>
                  <Swiper
                    mousewheel={true}
                    pagination={{ clickable: true }}
                    slidesPerView={"auto"}
                    initialSlide={0}
                    spaceBetween={18}
                    navigation={{
                      prevEl: navigationPrevRef.current,
                      nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={onBeforeInit}
                    breakpoints={{
                      320: {
                        centeredSlides: items.length === 1,
                      },
                      700: {
                        centeredSlides: false,
                      },
                    }}
                  >
                    {customProps(type)?.firstSlide && !noFirstSlide && (
                      <SwiperSlide
                        style={{
                          minHeight: "100%",
                          height: "auto",
                          width: "auto",
                        }}
                      >
                        {customProps(type, typeObject).firstSlide}
                      </SwiperSlide>
                    )}
                    {items.map((item, i) => (
                      <SwiperSlide
                        style={{
                          minHeight: "100%",
                          height: "auto",
                          width: "auto",
                        }}
                        key={i}
                      >
                        {customProps(type, item).sliderItem}
                      </SwiperSlide>
                    ))}
                    {items.length >= customProps(type).slidesCountWhenAllShow &&
                      !customProps(type).isAllPage &&
                      !noAll && (
                        <SwiperSlide
                          style={{
                            minHeight: "100%",
                            height: "auto",
                            width: "auto",
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
  );
};

export default Slider;
