import { FC, useState } from 'react'
import * as Styled from './styled'
import { PHOTO_URL } from '../../../api/variables'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import { IProfileType } from '../Cabinet/components/CabinetSales'
import { IEvent } from 'src/types/event'
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../Cabinet/components/ActiveProfile/ProfileManager'
import { DeleteIcon } from '../Sale/styled'
import Link from 'next/link'
import { formatDateRangeWithTime } from '@/utils/formatDateRangeWithTime'

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

  const dateText = formatDateRangeWithTime(
    item.dateStart,
    item.dateEnd,
    item.timeStart,
    item.timeEnd,
  )
  const renderContent = () => (
    <>
      {!create ? (
        <Styled.EventTop
          isDeleted={item.deleted}
          imageHover={imageHover}
          onMouseOver={() => !noHover && setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <Styled.Image alt="photo" src={photoSrc} width={400} height={200} />
          <DeleteIcon
            visible={imageHover}
            id={item.id}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
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
          {dateText && (
            <Styled.EventData>
              <Styled.Date>
                {dateText.split('\n').map((str, i) => (
                  <Styled.DateSpan key={i}>
                    {str}
                    <br />
                  </Styled.DateSpan>
                ))}
              </Styled.Date>
            </Styled.EventData>
          )}
          <Styled.EventAddress>{item.address}</Styled.EventAddress>
          {/* {item.promo ? (
          <Styled.Promo>
            <Styled.PromoText>Промокод</Styled.PromoText>
            <Styled.PromoText>{item.promo}</Styled.PromoText>
          </Styled.Promo>
        ) : null} */}
        </Styled.EventBottom>
      </Styled.EventContent>
    </>
  )

  return (
    <Styled.EventWrap
      cabinetVariant={cabinet}
      id={item.id}
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick?.(e)}
      role="article"
      tabIndex={0}
    >
      {item.publishedAt ? (
        <Link style={{ maxWidth: 'none' }} shallow href={'/events/' + item.id}>
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </Styled.EventWrap>
  )
}

export default Event
