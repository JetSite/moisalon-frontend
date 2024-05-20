import { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import Map from '../../../../../blocks/Map'
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
} from './styled'
import { Schedule } from '../../../../../ui/Shedule'
import defaultNumber from '../../../../../../utils/defaultNumber'
import SubwayStation from '../../../../../ui/SubwayStation'
import {
  IMetroStations,
  ISalonPhones,
  ISocialNetworks,
  IWorkingHours,
} from 'src/types'

interface Props {
  phones: ISalonPhones[]
  email: string
  workingHours: IWorkingHours[]
  address: string
  socialNetworkUrls: ISocialNetworks[]
  metroStations?: IMetroStations[]
  locationDirections: string
  coordinates: { longitude: string; latitude: string }
}

const Contacts: FC<Props> = ({
  phones,
  email,
  workingHours,
  address,
  socialNetworkUrls,
  metroStations,
  locationDirections,
  coordinates,
}) => {
  const [openPhone, setOpenPhone] = useState<boolean>(true)

  useEffect(() => {
    setOpenPhone(false)
  }, [])

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
                              .split('')
                              .splice(0, 6)
                              .join('')}
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
                  {address ? (
                    <Address
                      target="blank"
                      rel="nofollow"
                      href={`https://yandex.ru/maps/?pt=${coordinates.longitude},${coordinates.latitude}&z=18&l=map`}
                    >
                      {address}
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
            <RouteBlockTitle>
              Описание маршрута:&nbsp; {locationDirections}
            </RouteBlockTitle>
            <RouteDescription>{''}</RouteDescription>
          </RouteBlock>
          {metroStations?.length ? (
            <SubwayFlex>
              {metroStations.map((item, key) => (
                <SubwayStation
                  key={key}
                  item={item}
                  index={key}
                  length={metroStations?.length}
                />
              ))}
            </SubwayFlex>
          ) : null}
          <ContentBottom>
            <ContentWrapperElement>
              {coordinates?.longitude && coordinates?.latitude ? (
                <Map address={address} />
              ) : null}
            </ContentWrapperElement>
            <ContentWrapperElement>
              <noindex>
                <Socials>
                  {socialNetworkUrls.map(e => (
                    <SocialYT href={e.link} target="_blank" rel="nofollow">
                      {e.title}
                    </SocialYT>
                  ))}
                </Socials>
              </noindex>
            </ContentWrapperElement>
          </ContentBottom>
        </Bottom>
      </Wrapper>
    </MainContainer>
  )
}

export default Contacts
