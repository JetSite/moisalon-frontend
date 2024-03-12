import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { MainContainer } from "../../../../../../styles/common";
import { selectedGroupNames } from "../../../../../../utils/serviceCatalog";
import BackButton from "../../../../../ui/BackButton";
import RatingEdit from "../../../../../ui/RatingEdit";
import {
  favoritesInStorage,
  inStorage,
} from "../../../../../../utils/favoritesInStorage";
import {
  Wrapper,
  Socials,
  Phone,
  HiddenSocials,
  Telegram,
  WhatsApp,
  Viber,
  SocialsWrapper,
  Logo,
  Name,
  NameWrapper,
  Favorite,
  NameContent,
  Bell,
  Activities,
  Rating,
  SkeletonCircle,
  EditButton,
  Count,
  WebSite,
  More,
  ActiveSocials,
  ChatIcon,
} from "./styled";
import { createScopesSalon } from "../../../../../../_graphql-legacy/salon/createScopesSalon";
import { CityContext } from "../../../../../../searchContext";
import { cyrToTranslit } from "../../../../../../utils/translit";
import ChatMessagePopup from "../../../../../ui/ChatMessagePopup";
import {
  urlPatternHttps,
  urlPatternHttp,
} from "../../../../../../utils/checkUrls";
import { numberForSocials } from "../../../../../../utils/formatNumber";

const Header = ({
  salon,
  salonActivitiesCatalog,
  isOwner,
  me,
  scoreSalonCount,
  loadingScore,
  refetchSalon,
  refetchScore,
}) => {
  const router = useRouter();
  const logo = salon.logo ? (
    <Logo background={`url(${salon.logo.url})`} />
  ) : (
    <SkeletonCircle />
  );
  const [city] = useContext(CityContext);
  const [isFavorite, setIsFavorit] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [chatMessagePopup, setChatMessagePopup] = useState(false);

  useEffect(() => {
    const isInStorage = inStorage("salons", salon);
    setIsFavorit(!!isInStorage);
  }, []);

  const addFavorite = (e, salon) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesInStorage("salons", salon);
    setIsFavorit(!isFavorite);
  };

  const [createScore] = useMutation(createScopesSalon, {
    onCompleted: () => {
      refetchSalon();
      refetchScore();
    },
  });

  const handleChangeRating = (num) => {
    if (scoreSalonCount || loadingScore) return;
    createScore({
      variables: {
        value: num,
        salonId: salon.id,
      },
    });
  };

  return (
    <>
      <MainContainer>
        <ChatMessagePopup
          open={chatMessagePopup}
          setChatMessagePopup={setChatMessagePopup}
          me={me}
          userId={salon.ownerId}
          origin="SALON"
          originData={salon}
        />
        <Wrapper>
          <BackButton
            type="Салон"
            link={isOwner ? "/masterCabinet" : `/${cyrToTranslit(city)}/salon`}
            name={salon.name}
          />
        </Wrapper>
        <Wrapper>
          <Socials>
            <noindex>
              {salon?.onlineBookingUrl ? (
                <Phone
                  active={true}
                  href={salon?.onlineBookingUrl}
                  target="_blank"
                  rel="nofollow"
                />
              ) : (
                <Phone
                  active={
                    salon?.phones &&
                    salon.phones[0] &&
                    salon.phones[0].phoneNumber
                  }
                  href={
                    salon?.phones &&
                    salon.phones[0] &&
                    salon.phones[0].phoneNumber
                      ? `tel:${salon.phones[0].phoneNumber}`
                      : ""
                  }
                />
              )}
            </noindex>
            {logo}
            <SocialsWrapper>
              <ActiveSocials
                // active={
                //   salon?.phones &&
                //   salon.phones[0] &&
                //   (salon?.phones[0]?.haveTelegram ||
                //     salon?.phones[0]?.haveWhatsApp ||
                //     salon?.phones[0]?.haveViber)
                // }
                active
                onClick={() => setShowSocials(!showSocials)}
              />
              <noindex>
                <HiddenSocials showSocials={showSocials}>
                  <ChatIcon
                    title="Написать в чат"
                    showSocials={showSocials}
                    onClick={() => setChatMessagePopup(true)}
                  />
                  {salon?.phones[0]?.haveTelegram ? (
                    <Telegram
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://tlgg.ru/${numberForSocials(
                        salon?.phones[0]?.phoneNumber
                      )}`}
                    />
                  ) : null}
                  {salon?.phones[0]?.haveWhatsApp ? (
                    <WhatsApp
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                        salon?.phones[0]?.phoneNumber
                      )}`}
                    />
                  ) : null}
                  {salon?.phones[0]?.haveViber ? (
                    <Viber
                      target="_blank"
                      rel="nofollow"
                      showSocials={showSocials}
                      href={`viber://chat?number=%2B${numberForSocials(
                        salon?.phones[0]?.phoneNumber
                      )}`}
                    />
                  ) : null}
                </HiddenSocials>
              </noindex>
            </SocialsWrapper>
          </Socials>
          <NameWrapper>
            <NameContent>
              <Name
                dangerouslySetInnerHTML={{
                  __html: salon.name,
                }}
              />
              <Favorite
                isFavorite={isFavorite}
                onClick={(e) => addFavorite(e, salon)}
              />
              <Bell />
            </NameContent>
            {isOwner ? (
              <EditButton
                onClick={() =>
                  router.push(
                    {
                      pathname: "/createSalon",
                      query: { id: salon?.id },
                    },
                    "/createSalon"
                  )
                }
              >
                Редактировать профиль
              </EditButton>
            ) : null}
          </NameWrapper>
          {salon?.activities?.length < 8 || showAllActivities ? (
            <Activities>
              {selectedGroupNames(
                salon?.activities,
                salonActivitiesCatalog,
                ", "
              )}
              {showAllActivities ? (
                <More onClick={() => setShowAllActivities(!showAllActivities)}>
                  Скрыть
                </More>
              ) : null}
            </Activities>
          ) : (
            <Activities>
              {selectedGroupNames(
                salon?.activities?.slice(0, 8),
                salonActivitiesCatalog,
                ", "
              )}
              <More onClick={() => setShowAllActivities(!showAllActivities)}>
                Показать все
              </More>
            </Activities>
          )}
          <noindex>
            {salon?.webSiteUrl ? (
              <WebSite
                href={
                  urlPatternHttps.test(salon?.webSiteUrl) ||
                  urlPatternHttp.test(salon?.webSiteUrl)
                    ? salon?.webSiteUrl
                    : `https://${salon?.webSiteUrl}`
                }
                target="_blank"
                rel="noreferrer nofollow"
              >
                {salon.webSiteUrl}
              </WebSite>
            ) : null}
          </noindex>
          <Rating>
            <RatingEdit
              handleChangeRating={handleChangeRating}
              userValue={scoreSalonCount ? scoreSalonCount?.value : 0}
              count={Math.round(salon?.averageScore)}
              me={me}
            />
            <Count>{Math.round(salon?.numberScore) || 0}</Count>
          </Rating>
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default Header;
