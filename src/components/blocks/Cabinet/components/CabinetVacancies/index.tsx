import { useState, FC, useMemo } from 'react'
import { useMutation } from '@apollo/client'
import * as Styled from './styles'

import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'
import { IID } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import ProfileSelect from '../CabinetSales/components/ProfileSelect'
import { IPromotionsType } from '../CabinetSales'
import { IUser } from 'src/types/me'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import { IVacancy } from 'src/types/vacancies'
import ActiveVacanciesProfile from './components/ActiveVacanciesProfile'

interface Props {
  user: IUser
}
const CabinetVacancies: FC<Props> = ({ user }) => {
  const vacanciesUser = user?.vacancies
  const { salons, brands } = user.owner
  const [type, setType] = useState<IPromotionsType>(null)
  const [activeProfile, setActiveProfile] = useState<ISalon | IBrand | null>(
    null,
  )

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
    switch (profile.profileType) {
      case 'salon':
        const foundSalon = salons?.find(salon => salon.id === profile.id)
        setActiveProfile(foundSalon || null)
        break
      case 'brand':
        const foundBrand = brands?.find(brand => brand.id === profile.id)
        setActiveProfile(foundBrand || null)
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
        <ActiveVacanciesProfile
          activeProfile={activeProfile}
          setActiveProfile={setActiveProfile}
          type={type}
        />
      )}
    </Styled.Wrapper>
  )
}

export default CabinetVacancies
