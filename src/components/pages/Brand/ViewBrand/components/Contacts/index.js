import React, { useState, useEffect } from "react";
import { MainContainer } from "../../../../../../styles/common";
import Map from "../../../../../../components/blocks/Map";
import {
  Title,
  Top,
  Wrapper,
  ContactBody,
  MapBlock,
  InfoBlock,
  Info,
  InfoTitle,
  InfoDescription,
  BlurPhone,
  Address,
  ContentBottom,
  ContentWrapperElement,
} from "./styled";
import defaultNumber from "../../../../../../utils/defaultNumber";

const Contacts = ({ address, addressFull, title, email, phone }) => {
  const [openPhone, setOpenPhone] = useState(true);
  useEffect(() => {
    setOpenPhone(false);
  }, []);

  return (
    <MainContainer id="contacts">
      <Wrapper>
        <Top>
          <Title>{title}</Title>
        </Top>
        <ContactBody>
          <InfoBlock>
            <Info>
              <InfoTitle>Почтовый адрес:</InfoTitle>
              <InfoDescription>{address}</InfoDescription>
            </Info>
            {phone ? (
              openPhone ? (
                <Info>
                  <InfoTitle>Телефон:</InfoTitle>
                  <InfoDescription>
                    <a href={`tel:${phone}`}>{defaultNumber(phone)}</a>
                  </InfoDescription>
                </Info>
              ) : (
                <Info>
                  <InfoTitle>Телефон:</InfoTitle>
                  <InfoDescription
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => setOpenPhone(true)}
                  >
                    <BlurPhone>
                      {defaultNumber(phone).split("").splice(0, 8).join("")}{" "}
                    </BlurPhone>
                    Показать номер
                  </InfoDescription>
                </Info>
              )
            ) : null}
            {/* <Info>
              <InfoTitle>Отдел по работе с персоналом:</InfoTitle>
              <InfoDescription>{phone}</InfoDescription>
            </Info>
            <Info>
              <InfoTitle>Экспортный отдел:</InfoTitle>
              <InfoDescription>{email}</InfoDescription>
            </Info> */}
            <Info>
              <InfoTitle>Электронная почта:</InfoTitle>
              <InfoDescription>
                <a href={`mailto:${email}`}>{email}</a>
              </InfoDescription>
            </Info>
            <noindex>
              <Info>
                <InfoTitle>Адрес:</InfoTitle>
                {addressFull?.longitude &&
                addressFull.latitude &&
                addressFull?.full ? (
                  <Address
                    href={`https://yandex.ru/maps/?pt=${addressFull.longitude},${addressFull.latitude}&z=18&l=map`}
                    target="_blank"
                    rel="nofollow"
                  >
                    {addressFull.full}
                  </Address>
                ) : null}
              </Info>
            </noindex>
          </InfoBlock>
          <ContentBottom>
            <ContentWrapperElement>
              {addressFull?.longitude && addressFull?.latitude ? (
                <Map address={addressFull} />
              ) : null}
            </ContentWrapperElement>
          </ContentBottom>
        </ContactBody>
      </Wrapper>
    </MainContainer>
  );
};

export default Contacts;
