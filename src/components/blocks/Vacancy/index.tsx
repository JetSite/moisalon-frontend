import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import 'moment/locale/ru'
import { PHOTO_URL } from '../../../api/variables'
import {
  DeleteVacancyBtn,
  Image,
  VacancyBottom,
  VacancyContent,
  VacancyOwner,
  VacancyTitle,
  VacancyTop,
  VacancyWrap,
  VacancyAmount,
} from './style'
import { IApolloRefetch, IID } from 'src/types/common'
import { IPhoto } from 'src/types'
import PhotoAdd from '../Cabinet/components/CabinetVacancies/components/CreateVacancy/PhotoAdd'

interface Props {
  id?: IID
  name?: string
  title: string
  create?: boolean
  photos: IPhoto[] | null
  type?: string
  removeVacancy?: (id: IID) => void
  onAdd?: (photo: IPhoto) => void
  amountFrom?: number
  amountTo?: number
}

const Vacancy: FC<Props> = ({
  id,
  name,
  title,
  amountFrom,
  amountTo,
  create = false,
  onAdd,
  photos,
  type,
  removeVacancy,
}) => {
  const [hover, setHover] = useState(false)
  const { pathname } = useRouter()

  const photoUrl = photos && photos[0].url ? photos[0].url : ''

  const removeVacancyHandler = (vacancyId: IID) => {
    removeVacancy && removeVacancy(vacancyId)
  }

  return (
    <VacancyWrap>
      {!create ? (
        <VacancyTop>
          <Image alt="photo" src={`${PHOTO_URL}${photoUrl}`} />
        </VacancyTop>
      ) : (
        <VacancyTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <PhotoAdd
            photoId={photoUrl}
            hover={hover && photoUrl}
            onAdd={onAdd}
            type={type}
          />
        </VacancyTop>
      )}
      <VacancyContent>
        <VacancyTitle>{title}</VacancyTitle>
        <VacancyOwner>{name}</VacancyOwner>
        <VacancyBottom>
          {amountFrom && amountTo ? (
            <VacancyAmount>от {amountFrom} ₽</VacancyAmount>
          ) : null}
          {pathname === '/masterCabinet' && !create && id ? (
            <DeleteVacancyBtn onClick={() => removeVacancyHandler(id)}>
              Удалить вакансию
            </DeleteVacancyBtn>
          ) : null}
        </VacancyBottom>
      </VacancyContent>
    </VacancyWrap>
  )
}

export default Vacancy
