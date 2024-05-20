import React, { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import Map from '../../../../../blocks/Map'
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
} from './styled'
import defaultNumber from '../../../../../../utils/defaultNumber'
import { IBrand } from 'src/types/brands'

interface Props
  extends Pick<
    IBrand,
    'address' | 'longitude' | 'latitude' | 'email' | 'phones'
  > {
  title: string
}

const Contacts: FC<Props> = ({
  address,
  longitude,
  latitude,
  title,
  email,
  phones,
}) => {
  const [openPhone, setOpenPhone] = useState(true)
  useEffect(() => {
    setOpenPhone(false)
  }, [])

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
            {phones && phones?.phoneNumber ? (
              openPhone ? (
                <Info>
                  <InfoTitle>Телефон:</InfoTitle>
                  <InfoDescription>
                    <a href={`tel:${phones.phoneNumber}`}>
                      {defaultNumber(phones.phoneNumber)}
                    </a>
                  </InfoDescription>
                </Info>
              ) : (
                <Info>
                  <InfoTitle>Телефон:</InfoTitle>
                  <InfoDescription
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setOpenPhone(true)}
                  >
                    <BlurPhone>
                      {defaultNumber(phones.phoneNumber)
                        .split('')
                        .splice(0, 8)
                        .join('')}{' '}
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
                {longitude && latitude && address ? (
                  <Address
                    href={`https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`}
                    target="_blank"
                    rel="nofollow"
                  >
                    {address}
                  </Address>
                ) : null}
              </Info>
            </noindex>
          </InfoBlock>
          <ContentBottom>
            <ContentWrapperElement>
              {longitude && latitude ? (
                <Map address={{ latitude, longitude }} />
              ) : null}
            </ContentWrapperElement>
          </ContentBottom>
        </ContactBody>
      </Wrapper>
    </MainContainer>
  )
}

export default Contacts
