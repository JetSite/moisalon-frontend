import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Backdrop,
  Wrapper,
  Header,
  Icons,
  HamburgerMenuIcon,
  CloseIcon,
  Search,
  LogoMobile,
  MobileLogoLink,
  Image,
  Navigation,
  LinksWrap,
  LinkWrap,
  LinkWrapRed,
  ChangeCity,
  TickIconWrap,
  TickIcon,
  Text,
  Divider,
  ProfileBlock,
  ProfileAvatar,
  ProfileName,
  ProfileAvatarImage,
} from "./styles";
import SearchIcon from "../../pages/MainPage/components/Header/icons/SearchIcon";
import CityPingIcon from "../../pages/MainPage/components/Header/icons/CityPingIcon";
import { CityContext, MeContext } from "../../../searchContext";
import { cyrToTranslit } from "../../../utils/translit";
import { useQuery } from "@apollo/client";
import { currentUserSalonsAndMasterQuery } from "../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery";
import { PHOTO_URL } from "../../../../variables";

const HamburgerMenu = ({
  showHamburgerMenu,
  setShowHamburgerMenu,
  setShowCitySelect,
  defaultCity,
  loading,
}) => {
  useEffect(() => {
    if (showHamburgerMenu) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflowY = "scroll";
    };
  });
  const [me, setMe] = useContext(MeContext);
  const [city] = useContext(CityContext);
  const dev = process.env.NEXT_PUBLIC_ENV !== "production";
  const router = useRouter();
  const isLoggedIn = me?.info !== undefined && me?.info !== null;

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: (res) => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      });
    },
  });

  const navLinksTop = [
    { title: "Объявления", link: "/sales", target: "_self" },
    {
      title: "Магазин",
      link: `/${cyrToTranslit(city)}/beautyFreeShop`,
      target: "_self",
    },
    {
      title: "Сдать",
      link: isLoggedIn ? "/createLessorSalon" : "/login",
      target: "_self",
    },
    { title: "Снять", link: `/${cyrToTranslit(city)}/rent`, target: "_self" },
  ];

  const navLinksBottom = [
    {
      title: "Мастера",
      link: `/${cyrToTranslit(city)}/master`,
      target: "_self",
    },
    { title: "Салоны", link: `/${cyrToTranslit(city)}/salon`, target: "_self" },
    { title: "Бренды", link: `/${cyrToTranslit(city)}/brand`, target: "_self" },
    { title: "Бьюти-лента", link: "/beauty-feed", target: "_self" },
    { title: "О проекте", link: "/about", target: "_self" },
    // { title: "Советы", link: "/advices", target: "_self" },
    // {
    //   title: "Услуги",
    //   link: `/${cyrToTranslit(city)}/services`,
    //   target: "_self",
    // },

    // { title: "Обучение", link: "/educations", target: "_self" },
    // { title: "Мероприятия", link: "/events", target: "_self" },
    // { title: "Вакансии", link: "/vacancies", target: "_self" },
    // { title: "Новости", link: "/advices", target: "_self" },
    // { title: "Тренды", link: "/trends", target: "_self" },
    // { title: "Контакты", link: `/${cyrToTranslit(city)}`, target: "_self" },
    // { title: "Избранное", link: "/favorites", target: "_self" },
    // {
    //   title: "Профиль",
    //   link: `${isLoggedIn ? "/masterCabinet" : "/login"}`,
    //   target: "_self",
    // },
  ];

  const searchHandler = () => {
    setShowHamburgerMenu(false);
    router.push(
      {
        pathname: `/${cyrToTranslit(city)}`,
        query: { q: "search" },
      },
      `/${cyrToTranslit(city)}`
    );
  };

  const closeMenu = () => {
    setShowHamburgerMenu(false);
  };

  const handleLogout = async () => {
    const resData = await fetch(
      dev
        ? "https://stage-passport.moi.salon/api/logout"
        : "https://passport.moi.salon/api/logout",
      {
        credentials: "include",
        "Access-Control-Allow-Credentials": true,
      }
    );

    if (resData.status === 200) {
      await refetch();
      router.push(`/${cyrToTranslit(city)}`);
    }
  };

  return (
    <>
      <Backdrop showHamburgerMenu={showHamburgerMenu} onClick={closeMenu} />
      <Wrapper showHamburgerMenu={showHamburgerMenu}>
        <Header me={me} $loading={loading}>
          <Icons>
            <HamburgerMenuIcon onClick={closeMenu}>
              <CloseIcon src="/mobile-close-icon.svg" />
            </HamburgerMenuIcon>
            <Search onClick={searchHandler}>
              <SearchIcon />
            </Search>
          </Icons>
          <LogoMobile>
            <MobileLogoLink onClick={closeMenu}>
              <Link href={`/${cyrToTranslit(city)}`}>
                <a>
                  <Image alt="logo" src="/logo.svg" />
                </a>
              </Link>
            </MobileLogoLink>
          </LogoMobile>
        </Header>
        <Navigation>
          {isLoggedIn ? (
            <Link href={`${isLoggedIn ? "/masterCabinet" : "/login"}`}>
              <ProfileBlock>
                <ProfileAvatar>
                  <ProfileAvatarImage
                    src={
                      me?.info?.avatar
                        ? `${PHOTO_URL}${me?.info?.avatar}/original`
                        : "/empty-photo.svg"
                    }
                  />
                </ProfileAvatar>
                <ProfileName>Профиль</ProfileName>
              </ProfileBlock>
            </Link>
          ) : null}
          <LinksWrap>
            {navLinksTop.map((link, i) => (
              <LinkWrap
                key={i}
                visible={link?.visible}
                active={
                  router?.asPath === link.link && router?.asPath !== "/login"
                }
              >
                <Link href={link.link}>
                  <a target={link.target} onClick={closeMenu}>
                    {link.title}
                  </a>
                </Link>
              </LinkWrap>
            ))}
            <Divider>------------</Divider>
            {navLinksBottom.map((link, i) => (
              <LinkWrap
                key={i}
                visible={link?.visible}
                active={router?.asPath === link.link}
              >
                <Link href={link.link}>
                  <a target={link.target} onClick={closeMenu}>
                    {link.title}
                  </a>
                </Link>
              </LinkWrap>
            ))}
            {isLoggedIn && (
              <LinkWrapRed onClick={() => handleLogout()} color="">
                Выйти
              </LinkWrapRed>
            )}
          </LinksWrap>
        </Navigation>
        <ChangeCity
          onClick={() => {
            setShowCitySelect(true);
            closeMenu();
          }}
        >
          <CityPingIcon />
          <Text>{defaultCity}</Text>
          <TickIconWrap>
            <TickIcon src="/services-tick.svg" />
          </TickIconWrap>
        </ChangeCity>
      </Wrapper>
    </>
  );
};

export default HamburgerMenu;
