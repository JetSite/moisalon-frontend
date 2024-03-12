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
  ContentBottom,
  PhoneNumberClose,
  SocialsWrapper,
  VKIcon,
  OKIcon,
  TGIcon,
  WSIcon,
  VBIcon,
  YTIcon,
  BlurPhone,
} from "./styled";
import defaultNumber from "../../../../../../utils/defaultNumber";
import { numberForSocials } from "../../../../../../utils/formatNumber";

const Contacts = ({ phone, email, address, socials }) => {
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
        </Top>
        <Bottom>
          <ContentWrapperFlex>
            <Content>
              {phone?.phoneNumber ? (
                openPhone ? (
                  <ContentWrapperElement>
                    <PhoneNumber href={`tel:${phone?.phoneNumber}`}>
                      {defaultNumber(phone?.phoneNumber)}
                    </PhoneNumber>
                  </ContentWrapperElement>
                ) : (
                  <ContentWrapperElement>
                    {phone?.phoneNumber ? (
                      <PhoneNumberClose onClick={() => setOpenPhone(true)}>
                        <BlurPhone>
                          {defaultNumber(phone?.phoneNumber)
                            .split("")
                            .splice(0, 6)
                            .join("")}{" "}
                        </BlurPhone>
                        Показать номер
                      </PhoneNumberClose>
                    ) : null}
                  </ContentWrapperElement>
                )
              ) : null}
              <ContentWrapperElement>
                {email ? <Email href={`mailto:${email}`}>{email}</Email> : null}
                <noindex>
                  {address?.full ? (
                    <Address
                      href={`https://yandex.ru/maps/?pt=${address.longitude},${address.latitude}&z=18&l=map`}
                      target="_blank"
                      rel="nofollow"
                    >
                      {address?.full}
                    </Address>
                  ) : null}
                </noindex>
              </ContentWrapperElement>
            </Content>
            <SocialsWrapper>
              {socials?.vKontakte ? (
                <noindex>
                  <a
                    href={socials?.vKontakte}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <VKIcon />{" "}
                  </a>
                </noindex>
              ) : null}
              {socials?.odnoklassniki ? (
                <noindex>
                  <a
                    href={socials?.odnoklassniki}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <OKIcon />
                  </a>
                </noindex>
              ) : null}
              {socials?.youTube ? (
                <noindex>
                  <a
                    href={socials?.youTube}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <YTIcon />
                  </a>
                </noindex>
              ) : null}
              {phone?.haveTelegram ? (
                <noindex>
                  <a
                    href={`https://tlgg.ru/${numberForSocials(
                      phone?.phoneNumber
                    )}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <TGIcon />
                  </a>
                </noindex>
              ) : null}
              {phone?.haveWhatsApp ? (
                <noindex>
                  <a
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                      phone?.phoneNumber
                    )}`}
                  >
                    <WSIcon />
                  </a>
                </noindex>
              ) : null}
              {phone?.haveViber ? (
                <noindex>
                  <a
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={`viber://chat?number=%2B${numberForSocials(
                      phone?.phoneNumber
                    )}`}
                  >
                    <VBIcon />
                  </a>
                </noindex>
              ) : null}
            </SocialsWrapper>
          </ContentWrapperFlex>
          <ContentBottom>
            <ContentWrapperElement>
              {address?.longitude && address?.latitude ? (
                <Map address={address} />
              ) : null}
            </ContentWrapperElement>
          </ContentBottom>
        </Bottom>
      </Wrapper>
    </MainContainer>
  );
};

export default Contacts;
