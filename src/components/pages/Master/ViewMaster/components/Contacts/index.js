import { useState, useEffect } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import Map from '../../../../../../components/blocks/Map'
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
} from './styled'
import defaultNumber from '../../../../../../utils/defaultNumber'
import { numberForSocials } from '../../../../../../utils/formatNumber'

const Contacts = ({
  phone,
  email,
  address,
  addressCoordinates,
  socials,
  haveTelegram,
  haveWhatsApp,
  haveViber,
}) => {
  const [openPhone, setOpenPhone] = useState(true)

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
              {phone ? (
                openPhone ? (
                  <ContentWrapperElement>
                    <PhoneNumber href={`tel:${phone}`}>
                      {defaultNumber(phone)}
                    </PhoneNumber>
                  </ContentWrapperElement>
                ) : (
                  <ContentWrapperElement>
                    {phone ? (
                      <PhoneNumberClose onClick={() => setOpenPhone(true)}>
                        <BlurPhone>
                          {defaultNumber(phone).split('').splice(0, 6).join('')}{' '}
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
                  {address ? (
                    <Address
                      href={`https://yandex.ru/maps/?pt=${addressCoordinates.longitude},${addressCoordinates.latitude}&z=18&l=map`}
                      target="_blank"
                      rel="nofollow"
                    >
                      {address}
                    </Address>
                  ) : null}
                </noindex>
              </ContentWrapperElement>
            </Content>
            <SocialsWrapper>
              {socials &&
                !!socials.length &&
                socials.map(social => (
                  <noindex key={social.s_network.title}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noreferrer nofollow"
                    >
                      {social.s_network.title}
                    </a>
                  </noindex>
                ))}
              {haveTelegram ? (
                <noindex>
                  <a
                    href={`https://tlgg.ru/${numberForSocials(phone)}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <TGIcon />
                  </a>
                </noindex>
              ) : null}
              {haveWhatsApp ? (
                <noindex>
                  <a
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={`https://api.whatsapp.com/send?phone=${numberForSocials(
                      phone,
                    )}`}
                  >
                    <WSIcon />
                  </a>
                </noindex>
              ) : null}
              {haveViber ? (
                <noindex>
                  <a
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={`viber://chat?number=%2B${numberForSocials(phone)}`}
                  >
                    <VBIcon />
                  </a>
                </noindex>
              ) : null}
            </SocialsWrapper>
          </ContentWrapperFlex>
          <ContentBottom>
            <ContentWrapperElement>
              {addressCoordinates?.longitude && addressCoordinates?.latitude ? (
                <Map address={addressCoordinates} />
              ) : null}
            </ContentWrapperElement>
          </ContentBottom>
        </Bottom>
      </Wrapper>
    </MainContainer>
  )
}

export default Contacts
