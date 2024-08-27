import { FC, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ru'
import { laptopBreakpoint } from '../../../styles/variables'
import { PHOTO_URL } from '../../../api/variables'
import { ISale } from 'src/types/sale'
import { IPromotionsType } from '../Cabinet/components/CabinetSales'
import { IPhoto } from 'src/types'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import { ISetState } from 'src/types/common'
import { IProjection } from 'yandex-maps'
import { IPromotions } from 'src/types/promotions'

const SaleWrap = styled.div<{ type: string | undefined }>`
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

interface SaleProps extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean
  type: IPromotionsType
  item: IPromotions
}

const Sale: FC<SaleProps> = ({
  create = false,
  type,
  item,
  setPhoto,
  photo,
}) => {
  const [hover, setHover] = useState(false)

  console.log(item)

  return (
    <SaleWrap type={type as string}>
      {!create ? (
        <SaleTop>
          <Image
            alt="photo"
            src={`${PHOTO_URL}${item?.cover?.url || photo?.url}`}
          />
        </SaleTop>
      ) : (
        <SaleTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {setPhoto && (
            <PhotoAdd
              photo={photo || null}
              setPhoto={setPhoto}
              hover={hover && !!item?.cover?.id}
            />
          )}
        </SaleTop>
      )}
      <SaleContent>
        <div>
          {/* <SaleName>{item?.title}</SaleName> */}
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
          {item?.value ? (
            <Promo>
              <PromoText>Промокод</PromoText>
              <PromoText>{item.value}</PromoText>
            </Promo>
          ) : null}
        </SaleBottom>
      </SaleContent>
    </SaleWrap>
  )
}

export default Sale
