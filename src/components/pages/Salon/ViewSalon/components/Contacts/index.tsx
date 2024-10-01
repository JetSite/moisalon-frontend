import { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import Map from '../../../../../blocks/Map'
import * as Styled from './styled'
import { Schedule } from '../../../../../ui/Shedule'
import defaultNumber from '../../../../../../utils/defaultNumber'
import SubwayStation from '../../../../../ui/SubwayStation'
import {
  IMetroStations,
  ISalonPhones,
  ISocialNetworks,
  IWorkingHours,
} from 'src/types'
import { PHOTO_URL } from 'src/api/variables'

interface Props {
  phones: ISalonPhones[]
  email: string
  workingHours: IWorkingHours[]
  address: string
  socialNetworkUrls: ISocialNetworks[]
  metroStations?: IMetroStations[]
  locationDirections: string
  coordinates: { longitude: number; latitude: number }
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

  return (
    <MainContainer id="contacts">
      <Styled.Wrapper>
        <Styled.Top>
          <Styled.ContentWrapper>
            <Styled.Title>Контакты</Styled.Title>
          </Styled.ContentWrapper>
          <Styled.ContentWrapper>
            <Styled.Title>График работы</Styled.Title>
          </Styled.ContentWrapper>
        </Styled.Top>
        <Styled.Bottom>
          <Styled.ContentWrapperFlex>
            <Styled.Content>
              {phones?.length ? (
                openPhone ? (
                  <Styled.ContentWrapperElement>
                    {phones?.map((item, i) => {
                      console.log(item)

                      return (
                        <Styled.PhoneNumber
                          href={`tel:${item?.phoneNumber}`}
                          key={i}
                        >
                          {defaultNumber(item?.phoneNumber)}
                        </Styled.PhoneNumber>
                      )
                    })}
                  </Styled.ContentWrapperElement>
                ) : (
                  <Styled.ContentWrapperElement>
                    {phones.length &&
                      phones.slice(0, 1).map((item, i) => (
                        <Styled.PhoneNumberClose
                          onClick={() => setOpenPhone(true)}
                          key={i}
                        >
                          <Styled.BlurPhone>
                            {defaultNumber(item?.phoneNumber)
                              .split('')
                              .splice(0, 6)
                              .join('')}
                          </Styled.BlurPhone>
                          Показать номер
                        </Styled.PhoneNumberClose>
                      ))}
                  </Styled.ContentWrapperElement>
                )
              ) : null}
              <Styled.ContentWrapperElement>
                {email ? (
                  <Styled.Email href={`mailto:${email}`}>{email}</Styled.Email>
                ) : null}
                <noindex>
                  {address ? (
                    <Styled.Address
                      target="blank"
                      rel="nofollow"
                      href={`https://yandex.ru/maps/?pt=${coordinates.longitude},${coordinates.latitude}&z=18&l=map`}
                    >
                      {address}
                    </Styled.Address>
                  ) : null}
                </noindex>
              </Styled.ContentWrapperElement>
            </Styled.Content>
            <Styled.SheduleWrap>
              <Schedule workingHours={workingHours} />
            </Styled.SheduleWrap>
          </Styled.ContentWrapperFlex>
          {locationDirections && (
            <Styled.RouteBlock>
              <Styled.RouteBlockTitle>
                Описание маршрута:&nbsp; {locationDirections}
              </Styled.RouteBlockTitle>
              <Styled.RouteDescription>{''}</Styled.RouteDescription>
            </Styled.RouteBlock>
          )}
          {metroStations?.length ? (
            <Styled.SubwayFlex>
              {metroStations.map((item, key) => (
                <SubwayStation
                  key={key}
                  item={item}
                  index={key}
                  length={metroStations?.length}
                />
              ))}
            </Styled.SubwayFlex>
          ) : null}
          <Styled.ContentBottom>
            <Styled.ContentWrapperElement>
              {coordinates?.longitude && coordinates?.latitude ? (
                <Map
                  address={{
                    longitude: coordinates?.longitude,
                    latitude: coordinates.latitude,
                  }}
                />
              ) : null}
            </Styled.ContentWrapperElement>
            <Styled.ContentWrapperElement>
              <noindex>
                <Styled.Socials>
                  {socialNetworkUrls.map(
                    e =>
                      e.s_network.logo?.url && (
                        <Styled.Social
                          icon={
                            e.s_network.logo?.url
                              ? PHOTO_URL + e.s_network.logo?.url
                              : '/vk-icon.svg'
                          }
                          href={e.link}
                          about={e.s_network.title}
                          target="_blank"
                          rel="nofollow"
                        />
                      ),
                  )}
                </Styled.Socials>
              </noindex>
            </Styled.ContentWrapperElement>
          </Styled.ContentBottom>
        </Styled.Bottom>
      </Styled.Wrapper>
    </MainContainer>
  )
}

export default Contacts
