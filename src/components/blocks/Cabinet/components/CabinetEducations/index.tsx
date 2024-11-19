import { useState, FC, useMemo } from 'react'
import { Wrapper, TitlePage, Subtitle } from './styles'
import { IUser } from 'src/types/me'
import { IProfileType } from '../CabinetSales'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import ProfileSelect from '../CabinetSales/components/ProfileSelect'
import ActiveEducationProfile from './components/ActiveEducationProfile'
import { IActiveProfile } from '../ActiveProfile/ProfileManager'

interface Props {
  user: IUser
}

const CabinetEducations: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner
  const [type, setType] = useState<IProfileType>(null)
  const [activeProfile, setActiveProfile] = useState<IActiveProfile>(null)

  const { profiles } = useMemo(
    () => getPrepareData({ salons, masters, brands }),
    [salons, brands, masters],
  )

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    setType(profile.profileType as 'master' | 'salon' | 'brand')
    const foundProfile = profiles.find(({ id }) => id === profile.id)
    if (foundProfile) {
      setActiveProfile(foundProfile)
    } else {
      setActiveProfile(null)
    }
  }

  return (
    <Wrapper>
      <TitlePage>Обучение</TitlePage>
      <Subtitle>
        Нажмите на профиль для просмотра или создания обучений
      </Subtitle>
      <ProfileSelect
        profiles={profiles}
        activeProfile={activeProfile}
        onClickProfile={handleProfileClick}
        quantityTitles={['Одобренные', 'На рассмотрении']}
      />
      {activeProfile && type && (
        <ActiveEducationProfile
          activeProfile={activeProfile}
          type={type}
          setActiveProfile={setActiveProfile}
        />
      )}
    </Wrapper>
  )
}

export default CabinetEducations
