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
import { IProfileType } from '../Cabinet/components/CabinetSales'
import { IVacancy } from 'src/types/vacancies'
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd'
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../Cabinet/components/ActiveProfile/ProfileManager'
import Link from 'next/link'

interface Props extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean
  type?: IProfileType
  item: IVacancy
  handleClick?: IEntityHandler
  handleDelete?: IEntityDeleteHandler
  noHover?: boolean
}

const Vacancy: FC<Props> = ({
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
  const { pathname } = useRouter()

  const photoSrc = `${PHOTO_URL}${item?.cover?.url ?? photo?.url ?? ''}`

  const renderContent = () => (
    <>
      {!create ? (
        <VacancyTop>
          <Image alt="photo" src={photoSrc} />
        </VacancyTop>
      ) : (
        <VacancyTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {setPhoto && (
            <PhotoAdd photo={photo || null} setPhoto={setPhoto} hover={hover} />
          )}
        </VacancyTop>
      )}
      <VacancyContent>
        <VacancyTitle>{item.title}</VacancyTitle>
        <VacancyOwner>{item.salon?.name || item.brand?.name}</VacancyOwner>
        <VacancyBottom>
          {item.amountFrom && item.amountTo ? (
            <VacancyAmount>от {item.amountFrom} ₽</VacancyAmount>
          ) : null}
          {pathname === '/masterCabinet' && !create && item.id ? (
            <DeleteVacancyBtn
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                handleDelete && handleDelete(item.id)
              }}
            >
              Удалить вакансию
            </DeleteVacancyBtn>
          ) : null}
        </VacancyBottom>
      </VacancyContent>
    </>
  )

  return (
    <VacancyWrap id={item.id} onClick={handleClick}>
      {item.publishedAt ? (
        <Link shallow href={'/vacancies/' + item.id}>
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </VacancyWrap>
  )
}

export default Vacancy
