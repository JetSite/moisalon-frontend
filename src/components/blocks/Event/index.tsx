import { FC, useState } from 'react'
import * as Styled from './styled'
import moment from 'moment'
import 'moment/locale/ru'
import { PHOTO_URL } from '../../../api/variables'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import { IProfileType } from '../Cabinet/components/CabinetSales'
import { IEvent } from 'src/types/event'
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../Cabinet/components/ActiveProfile/ProfileManager'
import { DeleteIcon } from '../Sale/styled'

interface IEventProps extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean
  type?: IProfileType
  item: IEvent
  handleClick?: IEntityHandler
  handleDelete?: IEntityDeleteHandler
  noHover?: boolean
  cabinet?: boolean
}

const Event: FC<IEventProps> = ({
  create = false,
  noHover = false,
  type,
  item,
  setPhoto,
  photo,
  handleClick,
  handleDelete,
  cabinet,
}) => {
  const [hover, setHover] = useState(false)
  const [imageHover, setImageHover] = useState(false)

  const photoSrc = `${PHOTO_URL}${item?.cover?.url ?? photo?.url ?? ''}`

  const dateStart = `${moment(item.dateStart).format('DD MMMM ')} ${
    item.timeStart ? moment(item.timeStart, 'HH:mm:ss.SSS').format('HH:mm') : ''
  }`
  const dateEnd = `${moment(item.dateEnd).format('DD MMMM YYYY')} ${
    item.timeEnd ? moment(item.timeEnd, 'HH:mm:ss.SSS').format('HH:mm') : ''
  }`

  return (
    <Styled.EventWrap
      cabinetVariant={cabinet}
      id={item.id}
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick?.(e)}
      role="article"
      tabIndex={0}
    >
      {!create ? (
        <Styled.EventTop
          isDeleted={item.deleted}
          imageHover={imageHover}
          onMouseOver={() => !noHover && setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <Styled.Image alt="photo" src={photoSrc} />
          <DeleteIcon
            visible={imageHover}
            id={item.id}
            onClick={e => {
              e.stopPropagation()
              handleDelete && handleDelete(item.id, !item.publishedAt)
            }}
          />
        </Styled.EventTop>
      ) : (
        <Styled.EventTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {setPhoto && (
            <PhotoAdd photo={photo || null} hover={hover} setPhoto={setPhoto} />
          )}
        </Styled.EventTop>
      )}
      <Styled.EventContent>
        {/* <EventName>{name}</EventName> */}
        <Styled.EventTitle>{item.title}</Styled.EventTitle>
        <Styled.EventBottom>
          {item.dateStart && item.dateEnd ? (
            <Styled.EventData>
              <Styled.Date>{dateStart} -&nbsp;</Styled.Date>
              <Styled.Date>{dateEnd}</Styled.Date>
            </Styled.EventData>
          ) : null}
          <Styled.EventAddress>{item.address}</Styled.EventAddress>
          {/* {item.promo ? (
            <Styled.Promo>
              <Styled.PromoText>Промокод</Styled.PromoText>
              <Styled.PromoText>{item.promo}</Styled.PromoText>
            </Styled.Promo>
          ) : null} */}
        </Styled.EventBottom>
      </Styled.EventContent>
    </Styled.EventWrap>
  )
}

export default Event
