import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import PhotoAdd from '../CreateEducation/PhotoAdd'
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
} from './style'
import { IApolloRefetch, IID } from 'src/types/common'

interface Props {
  id: IID
  name?: string
  title: string
  create?: boolean
  photo: string
  type?: string
  removeVacancy?: () => void
  onAdd?: () => void
  amountFrom?: string
  amountTo?: string
}

const Vacancy: FC<Props> = ({
  id,
  name,
  title,
  create = false,
  onAdd,
  photo,
  type,
  removeVacancy,
}) => {
  const [hover, setHover] = useState(false)
  const { pathname } = useRouter()

  const removeVacancyHandler = (vacancyId: IID) => {
    removeVacancy && removeVacancy()
  }

  return (
    <VacancyWrap>
      {!create ? (
        <VacancyTop>
          <Image alt="photo" src={`${PHOTO_URL}${photo}`} />
        </VacancyTop>
      ) : (
        <VacancyTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <PhotoAdd
            photoId={photo}
            hover={hover && photo}
            onAdd={onAdd}
            type={type}
          />
        </VacancyTop>
      )}
      <VacancyContent>
        <VacancyTitle>{title}</VacancyTitle>
        <VacancyOwner>{name}</VacancyOwner>
        <VacancyBottom>
          {/* {amountFrom && amountTo ? (
            <VacancyAmount>от {amountFrom} ₽</VacancyAmount>
          ) : null} */}
          {pathname === '/masterCabinet' && !create ? (
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
