import styled from 'styled-components'
import { formatRentalPricing } from '../../../utils/newUtils/rentalPricing'
import { laptopBreakpoint } from '../../../styles/variables'
import { FC } from 'react'
import { ISalonPage } from 'src/types/salon'
import { ISalonWorkplace } from 'src/types/workplace'
import { PHOTO_URL } from 'src/api/variables'

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 374px;
  overflow: hidden;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
  }
`
const Top = styled.div`
  position: relative;
  height: 245px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Status = styled.div`
  position: absolute;
  left: 16px;
  bottom: 24px;
  width: 112px;
  height: 36px;
  background: #ff0033;
  border-radius: 50px;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Info = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
  margin-bottom: 9px;
`

const Bottom = styled.div`
  padding: 22px;
  padding-bottom: 14px;
  padding-top: 16px;
`

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
`

const Name = styled.p`
  font-size: 14px;
  margin-left: 8px;
`

const Address = styled.p`
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.28);
`

const Price = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-top: 8px;
`

interface Props {
  item: ISalonWorkplace
  salon: ISalonPage
}

const RentCard: FC<Props> = ({ item, salon }) => {
  return (
    <Wrapper>
      <Top>
        {item.cover ? (
          <Image alt={item.cover.name} src={PHOTO_URL + item.cover.url} />
        ) : null}
        <Status>{item.isAvailableForRent ? 'Свободно' : 'Занято'}</Status>
      </Top>
      <Bottom>
        <Info>
          {salon.logo ? <Avatar src={PHOTO_URL + salon.logo.url} /> : null}
          <Name>{salon.name}</Name>
        </Info>
        <Address>{salon.address}</Address>
        <Price>{formatRentalPricing(item.rentalPeriod)}</Price>
      </Bottom>
    </Wrapper>
  )
}

export default RentCard
