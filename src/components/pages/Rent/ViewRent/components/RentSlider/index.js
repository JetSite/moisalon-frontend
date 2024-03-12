import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { MainContainer } from "../../../../../../styles/common";
import Link from "next/link";
import { Content, Wrapper, Top, Title, SwiperWrap } from "./styles";
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
  SliderWpapper,
} from "../../../../../../styles/sliderBlocks";
import { CityContext } from "../../../../../../searchContext";
import { cyrToTranslit } from "../../../../../../utils/translit";
import RentCard from "../../../../../blocks/RentCard";
SwiperCore.use([Navigation]);

const RentSlider = ({ salon, title }) => {
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
                  padding: "5px",
                  marginLeft: "-5px",
                  marginRight: "-9px",
                }}
                mousewheel={true}
                pagination={{ clickable: true }}
                spaceBetween={19}
                slidesPerView={"auto"}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={onBeforeInit}
              >
                {salon?.rooms.map((item) =>
                  item?.seats.map((el, i) => (
                    <SwiperSlide
                      style={{
                        width: "auto",
                        minHeight: "100%",
                        height: "auto",
                      }}
                      key={i}
                    >
                      <Link
                        href={`/${cyrToTranslit(
                          salon?.address?.city || city
                        )}/rent/${salon?.id}/room/${item.id}/seat/${
                          el?.seo?.slug || el?.id
                        }`}
                      >
                        <a>
                          <RentCard item={el} salon={salon} />
                        </a>
                      </Link>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </SwiperWrap>
          </SliderWpapper>
        </Content>
      </MainContainer>
    </Wrapper>
  );
};

export default RentSlider;
