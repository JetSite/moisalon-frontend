import { useRef, useContext } from "react";
import { MainContainer } from "../../../../../../styles/common";
import {
  Title,
  Wrapper,
  Top,
  SwiperWrap,
  BlockLink,
  MainStockBrand,
  StockBrand,
  StockBlock,
  DescriptionBlock,
  DescriptionTitle,
  Description,
  MainImage,
  TitleBlock,
  Image,
  GoOver,
  SecondTitle,
} from "./styled";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import Link from "next/link";
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
  SliderWpapper,
} from "../../../../../../styles/sliderBlocks";
import { cyrToTranslit } from "../../../../../../utils/translit";
import { CityContext } from "../../../../../../searchContext";

SwiperCore.use([Navigation]);

const Stock = ({ items, title }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [city] = useContext(CityContext);

  const onBeforeInit = (Swiper) => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;
    }
  };

  return (
      <MainContainer id="actions">
        <Wrapper>
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
                style={{ padding: "5px", marginLeft: "-5px" }}
                mousewheel={true}
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={22}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={onBeforeInit}
              >
                {items.map((item, i) => (
                  <SwiperSlide
                    style={{ minHeight: "100%", height: "auto" }}
                    key={i}
                  >
                    <StockBlock>
                      <MainStockBrand>
                        <DescriptionBlock>
                          <DescriptionTitle>{item.name}</DescriptionTitle>
                          <Description>{item.description}</Description>
                          <Link href={`/${cyrToTranslit(city)}`}>
                            <GoOver>В магазин</GoOver>
                          </Link>
                        </DescriptionBlock>
                        <MainImage>
                          <img src={item.img} alt="" />
                        </MainImage>
                      </MainStockBrand>
                      <BlockLink>
                        <StockBrand>
                          <TitleBlock>
                            <SecondTitle>{item.second.name}</SecondTitle>
                            <Link href={`/${cyrToTranslit(city)}`}>
                              <GoOver>В магазин</GoOver>
                            </Link>
                          </TitleBlock>
                          <Image>
                            <img src={item.second.img} alt="" />
                          </Image>
                        </StockBrand>
                        <StockBrand>
                          <TitleBlock>
                            <SecondTitle>{item.last.name}</SecondTitle>
                            <Link href={`/${cyrToTranslit(city)}`}>
                              <GoOver>В магазин</GoOver>
                            </Link>
                          </TitleBlock>
                          <Image>
                            <img src={item.last.img} alt="" />
                          </Image>
                        </StockBrand>
                      </BlockLink>
                    </StockBlock>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperWrap>
          </SliderWpapper>
        </Wrapper>
      </MainContainer>
  );
};

export default Stock;
