import { useRef, useState, useContext } from "react";
import { MainContainer } from "../../../../styles/common";
import {
  Title,
  Wrapper,
  Top,
  SwiperWrap,
  SliderWrapper,
  Empty,
  ItemToggle,
} from "./styled";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import Link from "next/link";
import {
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from "../../../../styles/sliderBlocks";
import Button from "../../../ui/Button";
import Good from "./components/Good";
import { cyrToTranslit } from "../../../../utils/translit";
import { CityContext } from "../../../../searchContext";

SwiperCore.use([Navigation]);

const GoodsFavorites = ({
  title,
  setProductEmpty = () => {},
  cabinet = false,
  mobile = false,
  handleDeleted,
}) => {
  const navigationPrevRef = useRef(null);
  const [city] = useContext(CityContext);
  const navigationNextRef = useRef(null);

  const onBeforeInit = (Swiper) => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;
    }
  };

  const [deleteItem, setDeleteItem] = useState(false);
  const [toggle, setToggle] = useState(mobile && cabinet && true);

  let products;
  if (typeof window !== "undefined") {
    products = JSON.parse(localStorage.getItem("favorites"))?.products || [];
    if (!products.length) {
      setProductEmpty(true);
    }
  }

  return (
    <MainContainer>
      {mobile && cabinet ? (
        <ItemToggle
          disabled={!!!products?.length}
          toggle={!toggle}
          onClick={() => setToggle(!toggle)}
        >
          Товары {!!products?.length && `(${products?.length})`}
        </ItemToggle>
      ) : null}
      {!toggle && products?.length ? (
        <Wrapper cabinet={cabinet}>
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
                style={{ padding: "5px", marginLeft: "-5px" }}
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
                    slidesPerView: 1.4,
                  },
                  480: {
                    slidesPerView: 2.2,
                  },
                  600: {
                    slidesPerView: 2.7,
                  },
                  768: {
                    slidesPerView: cabinet ? 3 : 5,
                    spaceBetween: 15,
                  },
                }}
              >
                {products &&
                  products.map((product, i) => (
                    <SwiperSlide
                      style={{
                        minHeight: "100%",
                      }}
                      key={i}
                    >
                      <Link
                        href={`/${cyrToTranslit(city)}/product/${product?.id}`}
                      >
                        <a>
                          <Good
                            cabinet={cabinet}
                            product={product}
                            deleteItem={deleteItem}
                            setDeleteItem={setDeleteItem}
                            handleDeleted={handleDeleted}
                          />
                        </a>
                      </Link>
                      {/* {!cabinet ? (
                        <Button size="fullWidth" variant="red" mt="10">
                          Купить
                        </Button>
                      ) : null} */}
                    </SwiperSlide>
                  ))}
              </Swiper>
            </SwiperWrap>
          </SliderWrapper>
        </Wrapper>
      ) : null}
    </MainContainer>
  );
};

export default GoodsFavorites;
