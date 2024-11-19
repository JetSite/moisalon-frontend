import { useState, FC, useMemo } from 'react'
import * as Styled from './styles'
import ProfileSelect from '../CabinetSales/components/ProfileSelect'
import { IProfileType } from '../CabinetSales'
import { IUser } from 'src/types/me'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import ActiveVacanciesProfile from './components/ActiveVacanciesProfile'
import { IActiveProfile } from '../ActiveProfile/ProfileManager'

interface Props {
  user: IUser
}
const CabinetVacancies: FC<Props> = ({ user }) => {
  const vacanciesUser = user?.vacancies
  const { salons, brands } = user.owner
  const [type, setType] = useState<IProfileType>(null)
  const [activeProfile, setActiveProfile] = useState<IActiveProfile>(null)

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
    setType(profile.profileType as 'master' | 'salon')
    const foundProfile = profiles.find(({ id }) => id === profile.id)
    if (foundProfile) {
      setActiveProfile(foundProfile)
    } else {
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
