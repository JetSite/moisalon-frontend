import { useState } from 'react'
import styled from 'styled-components'
import PhotoAdd from '../CreateSale/PhotoAdd'
import moment from 'moment'
import 'moment/locale/ru'
import { laptopBreakpoint, red } from '../../../styles/variables'
import { PHOTO_URL } from '../../../api/variables'

const EventWrap = styled.div`
  width: ${({ cabinetVariant }) => (cabinetVariant ? '345px' : '375px')};
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`

const EventTop = styled.div`
  width: 100%;
  height: 280px;
  border-bottom: 0.5px solid #000000;
  overflow: hidden;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    height: 133px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const EventContent = styled.div`
  padding: 24px 21px 17px 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  @media (max-width: ${laptopBreakpoint}) {
    height: 147px;
  }
`

// const EventName = styled.p`
//   font-size: 10px;
//   line-height: 16px;
//   text-align: center;
// `;

const EventTitle = styled.p`
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  padding-bottom: 8px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: initial;
  }
`

const EventBottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

const EventData = styled.div`
  border-top: 0.5px solid #000;
  padding-top: 10px;
  width: 100%;
`

const Date = styled.p`
  display: inline-block;
  color: ${red};
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

const EventAddress = styled.p`
  color: #727272;
  font-size: 14px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

const Promo = styled.div`
  margin-left: auto;
`

const PromoText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

const Event = ({
  title,
  promo,
  create = false,
  onAdd,
  photoId = null,
  dateStart,
  dateEnd,
  address,
  cabinetVariant = false,
}) => {
  const [hover, setHover] = useState(false)

  return (
    <EventWrap cabinetVariant={cabinetVariant}>
      {!create ? (
        <EventTop>
          <Image alt="photo" src={`${PHOTO_URL}${photoId}/original`} />
        </EventTop>
      ) : (
        <EventTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <PhotoAdd photoId={photoId} hover={hover && photoId} onAdd={onAdd} />
        </EventTop>
      )}
      <EventContent>
        {/* <EventName>{name}</EventName> */}
        <EventTitle>{title}</EventTitle>
        <EventBottom>
          {dateStart && dateEnd ? (
            <EventData>
              <Date>{moment(dateStart).format('DD MMMM')} -&nbsp;</Date>
              <Date>{moment(dateEnd).format('DD MMMM YYYY')}</Date>
            </EventData>
          ) : null}
          <EventAddress>{address}</EventAddress>
          {promo ? (
            <Promo>
              <PromoText>Промокод</PromoText>
              <PromoText>{promo}</PromoText>
            </Promo>
          ) : null}
        </EventBottom>
      </EventContent>
    </EventWrap>
  )
}

export default Event
