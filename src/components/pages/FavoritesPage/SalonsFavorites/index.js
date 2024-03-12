import { useContext, useRef, useState } from "react";
import catalogOrDefault from "../../../../utils/catalogOrDefault";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { MainContainer } from "../../../../styles/common";
import Link from "next/link";
import {
  Content,
  Wrapper,
  Top,
  Title,
  SwiperWrap,
  SliderWrapper,
  PhoneButton,
  ItemToggle,
} from "./styled";
import {
  Bottom,
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
} from "../../../../styles/sliderBlocks";
import SalonCard from "./components/SalonCard";
import { MobileVisible, MobileHidden } from "../../../../styles/common";
import { CatalogsContext, CityContext } from "../../../../searchContext";
import { cyrToTranslit } from "../../../../utils/translit";

SwiperCore.use([Navigation]);

const SalonsFavorites = ({
  cabinet = false,
  title,
  setSalonEmpty = () => {},
  mobile = false,
  handleDeleted,
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
  const catalogs = useContext(CatalogsContext);
  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog
  );

  const [deleteItem, setDeleteItem] = useState(false);
  const [toggle, setToggle] = useState(mobile && cabinet && true);

  let salons;

  if (typeof window !== "undefined") {
    salons = JSON.parse(localStorage.getItem("favorites"))?.salons || [];
    if (!salons.length) {
      setSalonEmpty(true);
    }
  }

  return (
    <Wrapper>
      <MainContainer>
        {mobile && cabinet ? (
          <ItemToggle
            disabled={!!!salons?.length}
            toggle={!toggle}
            onClick={() => setToggle(!toggle)}
          >
            Салоны {!!salons?.length && `(${salons?.length})`}
          </ItemToggle>
        ) : null}
        {!toggle && salons?.length ? (
          <Content cabinet={cabinet}>
            <Top>
              <Title cabinet={cabinet}>{title}</Title>
              <NavigationWrapper>
                <ButtonPrev color="black" ref={navigationPrevRef} />
                <ButtonNext color="black" ref={navigationNextRef} />
              </NavigationWrapper>
            </Top>
            <SliderWrapper>
              <SwiperWrap>
                <Swiper
                  style={{ padding: "5px", marginLeft: "-5px" }}
                  mousewheel={true}
                  pagination={{ clickable: true }}
                  slidesPerView={3}
                  spaceBetween={27.5}
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
                      slidesPerView: cabinet ? 2 : 3,
                      spaceBetween: 15,
                    },
                  }}
                >
                  {salons &&
                    salons.map((salon, i) => (
                      <SwiperSlide
                        style={{ minHeight: "100%", height: "auto" }}
                        key={i}
                      >
                        <Link
                          href={
                            salon?.lessor
                              ? `/${cyrToTranslit(
                                  salon?.address?.city || city
                                )}/rent/${salon?.seo?.slug || salon.id}`
                              : `/${cyrToTranslit(
                                  salon?.address?.city || city
                                )}/salon/${salon?.seo?.slug || salon.id}`
                          }
                        >
                          <a>
                            <SalonCard
                              salon={salon}
                              catalog={salonActivitiesCatalog}
                              deleteItem={deleteItem}
                              setDeleteItem={setDeleteItem}
                              handleDeleted={handleDeleted}
                            />
                          </a>
                        </Link>
                        {salon?.phones?.length && !cabinet ? (
                          <MobileHidden>
                            <PhoneButton
                              href={`tel:${salon?.phones[0].phoneNumber}`}
                            >
                              Онлайн-запись
                            </PhoneButton>
                          </MobileHidden>
                        ) : null}
                        {salon?.phones?.length && !cabinet ? (
                          <MobileVisible>
                            <PhoneButton
                              href={`tel:${salon?.phones[0].phoneNumber}`}
                            >
                              Онлайн-запись
                            </PhoneButton>
                          </MobileVisible>
                        ) : null}
                      </SwiperSlide>
                    ))}
                </Swiper>
              </SwiperWrap>
            </SliderWrapper>
            <Bottom></Bottom>
          </Content>
        ) : null}
      </MainContainer>
    </Wrapper>
  );
};

export default SalonsFavorites;
