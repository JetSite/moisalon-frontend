import { FC, useState } from 'react'
import * as Styled from './styled'
import moment from 'moment'
import 'moment/locale/ru'
import { PHOTO_URL } from '../../../api/variables'
import { IPromotionsType } from '../Cabinet/components/CabinetSales'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import { IPromotions } from 'src/types/promotions'
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../Cabinet/components/ActiveProfile/ProfileManager'

interface SaleProps extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean
  type?: IPromotionsType
  item: IPromotions
  handleClick?: IEntityHandler
  handleDelete?: IEntityDeleteHandler
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

  const photoSrc = `${PHOTO_URL}${item?.cover?.url ?? photo?.url ?? ''}`

  return (
    <Styled.SaleWrap onClick={handleClick} id={item.id} type={type as string}>
      {!create ? (
        <Styled.SaleTop
          isDeleted={item.deleted}
          imageHover={imageHover}
          onMouseOver={() => !noHover && setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <Styled.Image alt="photo" src={photoSrc} />
          {imageHover ? (
            <Styled.DeleteIcon
              id={item.id}
              onClick={e => {
                e.stopPropagation()
                handleDelete && handleDelete(item.id)
              }}
            />
          ) : null}
        </Styled.SaleTop>
      ) : (
        <Styled.SaleTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {setPhoto && (
            <PhotoAdd photo={photo || null} setPhoto={setPhoto} hover={hover} />
          )}
        </Styled.SaleTop>
      )}
      <Styled.SaleContent>
        <div>
          {/* <SaleName>{item?.title}</SaleName> */}
          <Styled.SaleTitle>{item?.title}</Styled.SaleTitle>
        </div>
        <Styled.SaleBottom>
          {item?.dateStart && item?.dateEnd ? (
            <Styled.SaleData>
              <Styled.Date>
                {moment(item?.dateStart).format('DD MMMM YYYY')} - <br />
              </Styled.Date>
              <Styled.Date>
                {moment(item?.dateEnd).format('DD MMMM YYYY')} <br />
              </Styled.Date>
            </Styled.SaleData>
          ) : null}
          {item?.promoCode ? (
            <Styled.Promo>
              <Styled.PromoText>Промокод</Styled.PromoText>
              <Styled.PromoText>{item.promoCode}</Styled.PromoText>
            </Styled.Promo>
          ) : null}
        </Styled.SaleBottom>
      </Styled.SaleContent>
    </Styled.SaleWrap>
  )
}

export default Sale
