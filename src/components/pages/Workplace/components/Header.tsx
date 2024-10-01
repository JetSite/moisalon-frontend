import { FC } from 'react'
import * as Styled from '../styles'
import BackButton from 'src/components/ui/BackButton'
import { OnlineBookingButton } from 'src/components/blocks/OnlineBookingButton'
import { PHOTO_URL } from 'src/api/variables'
import { ISalonWorkplace } from 'src/types/workplace'
import { ICity } from 'src/types'
import { ISalonPage } from 'src/types/salon'

export interface IWorkplacePageHeaderProps {
  workplace: ISalonWorkplace
  city: ICity
  salonData: ISalonPage
}

export const Header: FC<IWorkplacePageHeaderProps> = ({
  city,
  salonData,
  workplace,
}) => {
  return (
    <>
      <Styled.Wrapper>
        <Styled.Content>
          <BackButton
            type="Аренда – Салон"
            link={`/${city.slug}/rent/${salonData?.id}`}
            name={workplace.title}
          />
        </Styled.Content>
      </Styled.Wrapper>
      <Styled.TopImage photoUrl={PHOTO_URL + workplace.cover?.url}>
        <OnlineBookingButton salon={salonData} workplace={workplace}>
          <Styled.OnlineBooking>
            <Styled.Icon src="/booking-blank.svg" />
            Онлайн бронирование
          </Styled.OnlineBooking>
        </OnlineBookingButton>
        {/* {salonData?.onlineBookingUrl ? (
          <noindex>
            <Styled.OnlineBooking
              as="a"
              target="_blank"
              rel="nofollow"
              href={salonData?.onlineBookingUrl}
            >
              <Styled.Icon src="/booking-blank.svg" />
              Онлайн бронирование
            </Styled.OnlineBooking>
          </noindex>
        ) : (
          <Styled.OnlineBooking
            as="a"
            href={`tel:${salonData.salonPhones[0]?.phoneNumber}`}
          >
            <Styled.Icon src="/booking-blank.svg" />
            Онлайн бронирование
          </Styled.OnlineBooking>
        )} */}
      </Styled.TopImage>
    </>
  )
}
