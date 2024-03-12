import { useState, useEffect } from "react";
import { MainContainer } from "../../../../../../styles/common";
import Map from "../../../../../../components/blocks/Map";
import {
  Wrapper,
  Top,
  ContentWrapper,
  ContentWrapperElement,
  Title,
  Bottom,
  PhoneNumber,
  Email,
  ContentWrapperFlex,
  Content,
  Address,
  Socials,
  SocialVk,
  SocialYT,
  SheduleWrap,
  ContentBottom,
  PhoneNumberClose,
  BlurPhone,
  SubwayFlex,
  RouteBlock,
  RouteBlockTitle,
  RouteDescription,
} from "./styled";
import Schedule from "../../../../../ui/Shedule";
import defaultNumber from "../../../../../../utils/defaultNumber";
import SubwayStation from "../../../../../ui/SubwayStation";

const Contacts = ({
  phones,
  email,
  workingHours,
  address,
  socialNetworkUrls,
  route,
}) => {
  const [openPhone, setOpenPhone] = useState(true);

  useEffect(() => {
    setOpenPhone(false);
  }, []);

  return (
    <MainContainer id="contacts">
      <Wrapper>
        <Top>
          <ContentWrapper>
            <Title>Контакты</Title>
          </ContentWrapper>
          <ContentWrapper>
            <Title>График работы</Title>
          </ContentWrapper>
        </Top>
        <Bottom>
          <ContentWrapperFlex>
            <Content>
              {phones?.length ? (
                openPhone ? (
                  <ContentWrapperElement>
                    {phones?.map((item, i) => (
                      <PhoneNumber href={`tel:${item?.phoneNumber}`} key={i}>
                        {defaultNumber(item?.phoneNumber)}
                      </PhoneNumber>
                    ))}
                  </ContentWrapperElement>
                ) : (
                  <ContentWrapperElement>
                    {phones.length &&
                      phones.slice(0, 1).map((item, i) => (
                        <PhoneNumberClose
                          onClick={() => setOpenPhone(true)}
                          key={i}
                        >
                          <BlurPhone>
                            {defaultNumber(item?.phoneNumber)
                              .split("")
                              .splice(0, 6)
                              .join("")}
                          </BlurPhone>
                          Показать номер
                        </PhoneNumberClose>
                      ))}
                  </ContentWrapperElement>
                )
              ) : null}
              <ContentWrapperElement>
                {email ? <Email href={`mailto:${email}`}>{email}</Email> : null}
                <noindex>
                  {address?.full ? (
                    <Address
                      target="blank"
                      rel="nofollow"
                      href={`https://yandex.ru/maps/?pt=${address.longitude},${address.latitude}&z=18&l=map`}
                    >
                      {address?.full}
                    </Address>
                  ) : null}
                </noindex>
              </ContentWrapperElement>
            </Content>
            <SheduleWrap>
              <Schedule workingHours={workingHours} />
            </SheduleWrap>
          </ContentWrapperFlex>
          <RouteBlock>
            <RouteBlockTitle>Описание маршрута:&nbsp;</RouteBlockTitle>
            <RouteDescription>{route}</RouteDescription>
          </RouteBlock>
          {address?.subwayStations?.length ? (
            <SubwayFlex>
              {address?.subwayStations.map((item, key) => (
                <SubwayStation
                  key={key}
                  item={item}
                  index={key}
                  length={address?.subwayStations?.length}
                />
              ))}
            </SubwayFlex>
          ) : null}
          <ContentBottom>
            <ContentWrapperElement>
              {address?.longitude && address?.latitude ? (
                <Map address={address} />
              ) : null}
            </ContentWrapperElement>
            <ContentWrapperElement>
              <noindex>
                <Socials>
                  {socialNetworkUrls?.youTube ? (
                    <SocialYT
                      href={socialNetworkUrls.youTube}
                      target="_blank"
                      rel="nofollow"
                    />
                  ) : null}
                  {socialNetworkUrls?.vKontakte ? (
                    <SocialVk
                      href={socialNetworkUrls.vKontakte}
                      target="_blank"
                      rel="nofollow"
                    />
                  ) : null}
                </Socials>
              </noindex>
            </ContentWrapperElement>
          </ContentBottom>
        </Bottom>
      </Wrapper>
    </MainContainer>
  );
};

export default Contacts;
