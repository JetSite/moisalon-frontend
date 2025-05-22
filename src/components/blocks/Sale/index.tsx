import { FC, useState } from 'react'
import * as Styled from './styled'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { PHOTO_URL } from '../../../api/variables'
import { IProfileType } from '../Cabinet/components/CabinetSales'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import { IPromotions } from 'src/types/promotions'
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../Cabinet/components/ActiveProfile/ProfileManager'
import Link from 'next/link'

interface SaleProps extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean
  type?: IProfileType
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

  const renderContent = () => (
    <>
      {!create ? (
        <Styled.SaleTop
          isDeleted={item.deleted}
          imageHover={imageHover}
          onMouseOver={() => !noHover && setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <Styled.Image alt="photo" src={photoSrc} width={400} height={200} />
          {imageHover ? (
            <Styled.DeleteIcon
              visible
              id={item.id}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
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
                {format(parseISO(item?.dateStart), 'dd MMMM yyyy', {
                  locale: ru,
                })}{' '}
                - <br />
              </Styled.Date>
              <Styled.Date>
                {format(parseISO(item?.dateEnd), 'dd MMMM yyyy', {
                  locale: ru,
                })}{' '}
                <br />
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
    </>
  )

  return (
    <Styled.SaleWrap
      onClick={handleClick}
      id={item.id}
      type={type as string}
      onKeyDown={e => e.key === 'Enter' && handleClick?.(e)}
      role="article"
      tabIndex={0}
    >
      {item.publishedAt ? (
        <Link shallow href={'/sales/' + item.id}>
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </Styled.SaleWrap>
  )
}

export default Sale
