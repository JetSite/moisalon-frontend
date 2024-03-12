import { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

SwiperCore.use([Navigation]);

const Wrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding: 28px 20px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
`;

const Slider = styled(Swiper)`
  margin-top: 26px;
`;

const Item = styled.div`
  width: 572px;
  height: 369px;
  background: ${(props) => `url(${props.background}) no-repeat center`};
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 294px;
    height: 171px;
  }
`;

const MobileSalonPhotos = ({ salon }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const onBeforeInit = (Swiper) => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;
    }
  };

  return (
    <Wrapper>
      <Title>Фотографии салона</Title>
      {salon.photos.length ? (
        <Slider
          mousewheel={true}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={12}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={onBeforeInit}
          breakpoints={{
            320: {
              slidesPerView: 0.9,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            600: {
              slidesPerView: 2.4,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
        >
          {salon.photos.map((item, i) => (
            <SwiperSlide key={i}>
              <Item background={item.url} />
            </SwiperSlide>
          ))}
        </Slider>
      ) : null}
    </Wrapper>
  );
};

export default MobileSalonPhotos;
