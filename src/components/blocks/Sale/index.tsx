import { FC, MouseEvent, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ru'
import { laptopBreakpoint } from '../../../styles/variables'
import { PHOTO_URL } from '../../../api/variables'
import { ISale } from 'src/types/sale'
import { IPromotionsType } from '../Cabinet/components/CabinetSales'
import { IPhoto } from 'src/types'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import { IID, ISetState } from 'src/types/common'
import { IProjection } from 'yandex-maps'
import { IPromotions } from 'src/types/promotions'

const SaleWrap = styled.li<{ type: string | undefined }>`
  max-width: 375px;
  width: 47%;
  min-width: 250px;
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

const SaleTop = styled.div<{ imageHover?: boolean; isDeleted?: boolean }>`
  width: 100%;
  height: 163px;
  overflow: hidden;
  position: relative;

  ${({ isDeleted }) =>
    isDeleted &&
    `
    ::after {
      content: 'Ожидание удаления';
      top: 10px;
      right: 10px;
      position: absolute;
      background-color: black;
      color: white;
      padding: 2px;
      border-radius: 4px;
      font-size: small;
    }
  `}
  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
    opacity: ${({ imageHover }) => (imageHover ? 0.4 : 0)};
    transition: opacity 0.3s ease; /* Плавный переход при наведении */
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 50%;
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const DeleteIcon = styled.button`
  position: absolute;
  background: url('/close-cross-red.svg') no-repeat center;
  width: 10px;
  height: 10px;
  top: 10px;
  right: 10px;
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

export type ISaleHandler = (e: MouseEvent<HTMLLIElement>) => void

export type ISaleDeleteHandler = (
  e: MouseEvent<HTMLButtonElement>,
  id: IID,
) => void

interface SaleProps extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean
  type?: IPromotionsType
  item: IPromotions
  handleClick?: ISaleHandler
  handleDelete?: ISaleDeleteHandler
  noHover?: boolean
}

const Sale: FC<SaleProps> = ({
  create = false,
  noHover = false,
  type,
  item,
  setPhoto,
  photo,
  handleClick,
  handleDelete,
}) => {
  const [hover, setHover] = useState(false)
  const [imageHover, setImageHover] = useState(false)

  const photoSrc = item?.cover?.url
    ? `${PHOTO_URL}${item?.cover?.url}`
    : photo?.url
    ? `${PHOTO_URL}${photo?.url}`
    : ''

  return (
    <SaleWrap onClick={handleClick} id={item.id} type={type as string}>
      {!create ? (
        <SaleTop
          isDeleted={item.deleted}
          imageHover={imageHover}
          onMouseOver={() => !noHover && setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <Image alt="photo" src={photoSrc} />
          {imageHover ? (
            <DeleteIcon
              onClick={e => {
                e.stopPropagation()
                handleDelete && handleDelete(e, item.id)
              }}
            />
          ) : null}
        </SaleTop>
      ) : (
        <SaleTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {setPhoto && (
            <PhotoAdd photo={photo || null} setPhoto={setPhoto} hover={hover} />
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
          {item?.promoCode ? (
            <Promo>
              <PromoText>Промокод</PromoText>
              <PromoText>{item.promoCode}</PromoText>
            </Promo>
          ) : null}
        </SaleBottom>
      </SaleContent>
    </SaleWrap>
  )
}

export default Sale
