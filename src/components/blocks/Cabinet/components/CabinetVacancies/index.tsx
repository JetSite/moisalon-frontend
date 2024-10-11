import { useState, FC, useMemo } from 'react'
import { useMutation } from '@apollo/client'
import * as Styled from './styles'

import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'
import { IID } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { CabinetVacanciesList } from './components/CabinetVacanciesList'
import CreateVacancy from './components/CreateVacancy'
import { DELETE_VACANCY } from 'src/api/graphql/vacancy/mutations/deleteVacancy'
import ProfileSelect from '../CabinetSales/components/ProfileSelect'
import { IPromotionsType } from '../CabinetSales'
import { IUser } from 'src/types/me'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import { IMaster } from 'src/types/masters'
import { IVacancy } from 'src/types/vacancies'

interface Props {
  user: IUser
}
const CabinetVacancies: FC<Props> = ({ user }) => {
  const { setUser } = useAuthStore(getStoreEvent)
  const vacanciesUser = user?.vacancies
  const [deleteVacancy] = useMutation(DELETE_VACANCY)

  const removeVacancy = async (vacancyToRemoveId: IID) => {
    await deleteVacancy({
      variables: {
        id: vacancyToRemoveId,
      },
    })
    const updatedVacancies = user?.vacancies?.filter(
      item => item.id !== vacancyToRemoveId,
    )
    if (user) {
      setUser({
        ...user,
        vacancies: updatedVacancies,
      })
    }
  }

  const { salons, brands } = user.owner
  const [id, setId] = useState('')
  const [type, setType] = useState<IPromotionsType>(null)
  const [vacancies, setVacancies] = useState<IVacancy[] | null>(null)
  const [activeProfile, setActiveProfile] = useState<
    ISalon | IMaster | IBrand | null
  >(null)

  const { profiles } = useMemo(
    () =>
      getPrepareData({
        salons,
        brands,
        vacancies: vacanciesUser,
        entityType: 'vacancies',
      }),
    [salons, brands, vacanciesUser],
  )

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    setType(profile.profileType as 'salon' | 'brand')
    setId(profile.id)
    switch (profile.profileType) {
      case 'salon':
        const foundSalon = salons?.find(salon => salon.id === profile.id)
        setActiveProfile(foundSalon || null)
        foundSalon &&
          setVacancies(
            vacanciesUser?.filter(item => item.salon?.id === foundSalon.id) ||
              null,
          )
        break
      case 'brand':
        const foundBrand = brands?.find(brand => brand.id === profile.id)
        setActiveProfile(foundBrand || null)
        foundBrand &&
          setVacancies(
            vacanciesUser?.filter(item => item.brand?.id === foundBrand.id) ||
              null,
          )
        break
      default:
        setActiveProfile(null)
    }
  }

  return (
    <Styled.Wrapper>
      <Styled.TitlePage>Вакансии</Styled.TitlePage>
      <Styled.Subtitle>
        Нажмите на профиль для просмотра или создания вакансий
      </Styled.Subtitle>
      <ProfileSelect
        profiles={profiles}
        activeProfile={activeProfile}
        onClickProfile={handleProfileClick}
        quantityTitles={['Одобренные', 'На рассмотрении']}
      />
      {activeProfile && type && (
        <CabinetVacanciesList
          activeProfile={activeProfile}
          setActiveProfile={setActiveProfile}
          type={type}
          vacancies={vacancies}
          loading={false}
          removeVacancy={removeVacancy}
        />
      )}
    </Styled.Wrapper>
  )
}

export default CabinetVacancies
