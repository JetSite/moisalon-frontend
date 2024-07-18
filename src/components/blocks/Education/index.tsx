import { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import PhotoAdd from '../CreateEducation/PhotoAdd'
import moment from 'moment'
import 'moment/locale/ru'
import { laptopBreakpoint, red } from '../../../styles/variables'
import Rating from '../../ui/Rating'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage.js'
import { PHOTO_URL } from '../../../api/variables'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { IPhoto } from 'src/types'

const EducationWrap = styled.div`
  width: 375px;
  height: 340px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  color: #000;
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

const EducationTop = styled.div`
  width: 100%;
  height: 163px;
  border-radius: 5px;
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

const EducationContent = styled.div`
  padding: 30px 25px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 177px;
  @media (max-width: ${laptopBreakpoint}) {
    height: 147px;
    padding: 15px 20px;
    padding-top: 8px;
  }
`

const EducationName = styled.p`
  font-size: 10px;
  line-height: 16px;
  text-align: center;
`

const EducationTitle = styled.p`
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

const EducationBottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

const EducationData = styled.div``

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

const Favorite = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  cursor: pointer;
  right: 20px;
  top: -8px;

  @media (max-width: ${laptopBreakpoint}) {
    right: 15px;
    top: -12px;
  }
`

interface IEducationProps {
  averageScore?: number
  numberScore?: number
  title: string
  amount?: number
  create?: boolean
  onAdd?: (photoId: number) => void
  photo?: IPhoto
  dateStart?: Date
  dateEnd?: Date
  timeStart?: string
  timeEnd?: string
  id: string
  setDeleteItem?: (deleteItem: boolean) => void
  deleteItem?: boolean
  handleDeleted?: () => void
}

const Education: FC<IEducationProps> = ({
  averageScore = 0,
  numberScore = 0,
  title,
  amount,
  create = false,
  onAdd,
  photo = null,
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  id,
  setDeleteItem = () => {},
  deleteItem = false,
  handleDeleted,
}) => {
  const [hover, setHover] = useState(false)
  const [isFavorite, setIsFavorit] = useState(false)

  const photoUrl = photo?.url || null

  useEffect(() => {
    if (!create) {
      const isInStorage = inStorage('educations', {
        id,
        title,
        amount,
        photo,
        dateStart,
        dateEnd,
      })
      setIsFavorit(!!isInStorage)
    }
  }, [])

  const addFavorite = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('educations', {
      id,
      title,
      amount,
      photo,
      dateStart,
      dateEnd,
    })
    setIsFavorit(!isFavorite)
    setDeleteItem && setDeleteItem(!deleteItem)
    handleDeleted && handleDeleted()
  }

  return (
    <EducationWrap>
      {!create ? (
        <EducationTop>
          <Favorite onClick={e => addFavorite(e)}>
            <HeartFullFill fill={isFavorite} />
          </Favorite>
          {photoUrl && <Image alt="photo" src={`${PHOTO_URL}${photoUrl}`} />}
        </EducationTop>
      ) : (
        <EducationTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* <PhotoAdd
            photoId={photoId}
            hover={hover && photoId}
            onAdd={onAdd}
            type={type}
          /> */}
        </EducationTop>
      )}
      <EducationContent>
        <div>
          {/* <EducationName>{name}</EducationName> */}
          <EducationTitle>{title}</EducationTitle>
        </div>
        <EducationBottom>
          {dateStart && dateEnd && create ? (
            <EducationData>
              <Date>
                {moment(dateStart).format('DD MMMM YYYY')} {timeStart} - <br />
              </Date>
              <Date>
                {moment(dateEnd).format('DD MMMM YYYY')} {timeEnd}
              </Date>
            </EducationData>
          ) : null}
          {dateStart && dateEnd && !create ? (
            <EducationData>
              <Date>
                {moment(dateStart).format('DD MMMM YYYY HH:MM')} - <br />
              </Date>
              <Date>{moment(dateEnd).format('DD MMMM YYYY HH:MM')}</Date>
            </EducationData>
          ) : null}
          {amount ? (
            <Promo>
              <PromoText>Стоимость</PromoText>
              <PromoText>
                {new Intl.NumberFormat('ru-RU').format(amount)} руб.
              </PromoText>
            </Promo>
          ) : null}
        </EducationBottom>
        <Rating position="start" rating={averageScore} />
      </EducationContent>
    </EducationWrap>
  )
}

export default Education
