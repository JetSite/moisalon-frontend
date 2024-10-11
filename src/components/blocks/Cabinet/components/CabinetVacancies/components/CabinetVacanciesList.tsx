import { Subtitle, VacanciesWrapper, SkeletonWrap } from '../styles'

import Vacancy from '../../../../Vacancy'
import { FC } from 'react'
import { IApolloRefetch, IID, ISetState } from 'src/types/common'
import { IVacancy } from 'src/types/vacancies'
import ProfileItem from '../../CabinetSales/components/ProfileItem'
import { IBrand } from 'src/types/brands'
import { ISale } from 'src/types/sale'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IPromotionsType } from '../../CabinetSales'

interface Props {
  loading: boolean
  removeVacancy: (id: IID) => void
  vacancies: IVacancy[] | null
  setActiveProfile: ISetState<IBrand | ISalon | IMaster | null>
  activeProfile: IBrand | ISalon | IMaster
  type: IPromotionsType
}

export const CabinetVacanciesList: FC<Props> = ({
  vacancies,
  loading,
  removeVacancy,
  activeProfile,
  setActiveProfile,
  type,
}) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />
  }
  const profile = {
    id: activeProfile?.id,
    name: activeProfile?.name,
    photo: (activeProfile as ISalon)?.logo || (activeProfile as IMaster)?.photo,
    rent: (activeProfile as ISalon)?.rent || false,
  }

  const typeString =
    type === 'master' ? 'мастера' : type === 'salon' ? 'салона' : 'бренда'

  return (
    <VacanciesWrapper>
      <ProfileItem
        onClick={() => {
          setActiveProfile(null)
        }}
        profile={profile}
        type={typeString}
        active={!!activeProfile}
      />
      {vacancies && vacancies.length > 0 ? (
        <>
          {vacancies?.map(item => (
            <Vacancy
              key={item.id}
              id={item.id}
              title={item.title}
              name={`${item.salon ? 'Салон' : item.brand ? 'Бренд' : ''} ${
                item?.salon?.name || item?.brand?.name || ''
              }`}
              type={'master'}
              photos={item.cover}
              amountFrom={item.amountFrom}
              amountTo={item.amountTo}
              removeVacancy={removeVacancy}
            />
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет вакансий</Subtitle>
      )}
    </VacanciesWrapper>
  )
}
