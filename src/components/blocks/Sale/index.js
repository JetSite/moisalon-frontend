import { useState } from 'react'
import styled from 'styled-components'
import PhotoAdd from '../CreateSale/PhotoAdd'
import moment from 'moment'
import 'moment/locale/ru'
import { laptopBreakpoint } from '../../../styles/variables'
import { PHOTO_URL } from '../../../variables'

const SaleWrap = styled.div`
  width: 375px;
  height: 340px;
  border: ${({ type }) => (type === 'slider' ? 'none' : '1px solid #f0f0f0')};
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
  }
`

const SaleTop = styled.div`
  width: 100%;
  height: 163px;
  overflow: hidden;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    height: 50%;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SaleContent = styled.div`
  padding: 30px 25px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 177px;
  background-color: #fff;
  @media (max-width: ${laptopBreakpoint}) {
    height: 50%;
    padding: 15px 20px;
    padding-top: 8px;
  }
`

const SaleName = styled.p`
  font-size: 10px;
  line-height: 16px;
  text-align: center;
`

const SaleTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  margin-top: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: initial;
  }
`

const SaleBottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

const SaleData = styled.div``

const Date = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
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

const Sale = ({ create = false, onAdd, type, item }) => {
  const [hover, setHover] = useState(false)

  return (
    <SaleWrap type={type}>
      {!create ? (
        <SaleTop>
          <Image alt="photo" src={`${PHOTO_URL}${item?.photoId}/original`} />
        </SaleTop>
      ) : (
        <SaleTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <PhotoAdd
            photoId={item?.photoId}
            hover={hover && item?.photoId}
            onAdd={onAdd}
            type={type}
          />
        </SaleTop>
      )}
      <SaleContent type={type}>
        <div>
          <SaleName>{item?.name}</SaleName>
          <SaleTitle>{item?.title}</SaleTitle>
        </div>
        <SaleBottom>
          {item?.dateStart && item?.dateEnd ? (
            <SaleData>
              <Date>
                {moment(item?.dateStart).format('DD MMMM YYYY')} - <br />
              </Date>
              <Date>
                {moment(item?.dateEnd).format('DD MMMM YYYY')} <br />
              </Date>
            </SaleData>
          ) : null}
          {item?.promo ? (
            <Promo>
              <PromoText>Промокод</PromoText>
              <PromoText>{item?.promo}</PromoText>
            </Promo>
          ) : null}
        </SaleBottom>
      </SaleContent>
    </SaleWrap>
  )
}

export default Sale
