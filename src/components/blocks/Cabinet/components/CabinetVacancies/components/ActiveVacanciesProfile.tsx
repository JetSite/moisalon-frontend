import { FC, MouseEvent, useEffect, useMemo, useState } from 'react'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import { useLazyQuery, useMutation } from '@apollo/client'
import { NOT_PUBLISH_SALE } from 'src/api/graphql/sale/queries/getNotPublishSale'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPromotions } from 'src/types/promotions'
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from 'src/components/blocks/Sale'
import { UPDATE_PROMOTION } from 'src/api/graphql/promotion/mutations/updatePromotion'
import { IPagination } from 'src/types'
import ProfileManager from '../../ActiveProfile/ProfileManager'
import { IPromotionsType } from '../../CabinetSales'
import { VacanciesList } from './VacanciesList'
import { IVacancy } from 'src/types/vacancies'
import CreateVacancy from './CreateVacancy'
import { IProfile } from '../../CabinetSales/components/ProfileSelect'
import { VACANCIES } from 'src/api/graphql/vacancy/queries/getVacancies'
import { NOT_PUBLISH_VACANCIES } from 'src/api/graphql/vacancy/queries/getNotPublishVacancies'
import { useVacancyMutate } from '../utils/useVacancyMutate'

interface ActiveProfileProps {
  activeProfile: ISalon | IBrand
  type: IPromotionsType
  setActiveProfile: ISetState<ISalon | IBrand | null>
}

export type IActiveProfilesView = 'publish' | 'draft'

const ActiveVacanciesProfile: FC<ActiveProfileProps> = ({
  activeProfile,
  type,
  setActiveProfile,
}) => {
  const [view, setView] = useState<IActiveProfilesView>('publish')
  const [vacancy, setVacancy] = useState<IVacancy | null>(null)
  const [createVacancy, setCreateVacancy] = useState(false)
  const {
    vacancies,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    loading,
    pagination,
    fetchloading,
    errors,
    setErrors,
  } = useVacancyMutate({
    view,
    type,
    profileID: activeProfile.id,
  })

  const profile: IProfile = useMemo(
    () => ({
      id: activeProfile.id,
      name: activeProfile.name,
      photo: activeProfile.logo,
      rent: (activeProfile as ISalon).rent || false,
    }),
    [activeProfile],
  )

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === 'publish') {
      setView('publish')
    } else {
      setView('draft')
    }
    setUpdate(true)
  }

  const handleVacancyClick: IEntityHandler = e => {
    if (view === 'publish') return
    const findSale =
      vacancies.find(element => element.id === e.currentTarget.id) || null
    setVacancy(findSale)
    setCreateVacancy(true)
  }

  return (
    <ProfileManager
      type={type}
      profile={profile}
      handleBack={() => {
        setActiveProfile(null)
      }}
      createEntity={createVacancy}
      setCreateEntity={setCreateVacancy}
      createEntityButton="Создать Вакансию"
      view={view}
      handleViewClick={handleClick}
      onCreateEntity={() => {
        setVacancy(null)
      }}
      createEntityComponent={
        <CreateVacancy
          errors={errors}
          setErrors={setErrors}
          type={type}
          activeProfile={activeProfile}
          handleCreateOrUpdate={handleCreateOrUpdate}
          vacancy={vacancy}
          setVacancy={setVacancy}
          loading={loading}
          setCreateVacancy={setCreateVacancy}
        />
      }
      entitiesManagerComponent={
        <VacanciesList
          handleMore={handleMore}
          handleClick={handleVacancyClick}
          loading={fetchloading}
          type={type}
          vacancies={vacancies}
          handleDelete={handleDelete}
          pagination={pagination}
          popupText={
            view === 'publish'
              ? 'После проверки модератором акция будет удалена безвозвратно. Вы уверены?'
              : undefined
          }
        />
      }
    />
  )
}

export default ActiveVacanciesProfile
