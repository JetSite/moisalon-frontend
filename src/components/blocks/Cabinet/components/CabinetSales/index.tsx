import { useState, FC, useMemo } from 'react'
import * as Styled from './styles'
import { IUser } from 'src/types/me'
import ProfileSelect, { IProfileWithType } from './components/ProfileSelect'
import { getPrepareData } from './utils/getPrepareData'
import ActiveSaleProfile from './components/ActiveSaleProfile'
import { IPromotions } from 'src/types/promotions'

export type IProfileType = 'salon' | 'master' | 'brand' | null

export interface IProfileWithPromotions extends IProfileWithType {
  promotions: IPromotions[]
}

interface Props {
  user: IUser
}

const CabinetSales: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner
  const [type, setType] = useState<IProfileType>(null)
  const [activeProfile, setActiveProfile] =
    useState<IProfileWithPromotions | null>(null)

  const { profiles } = useMemo(
    () => getPrepareData({ salons, masters, brands, entityType: 'sales' }),
    [salons, brands, masters],
  )

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    const typedRtofileType = profile.profileType as 'master' | 'salon' | 'brand'
    setType(typedRtofileType)
    const foundProfilePromotions =
      [...(salons || []), ...(masters || []), ...(brands || [])].find(
        ({ id, name }) => id === profile.id && name === profile.name,
      )?.promotions || []
    const foundProfile = profiles.find(({ id }) => id === profile.id)
    if (foundProfile) {
      const foundProfileWithReviews: IProfileWithPromotions = {
        ...foundProfile,
        promotions: foundProfilePromotions,
      }
      setActiveProfile(foundProfileWithReviews)
    } else {
      setActiveProfile(null)
    }
  }

  return (
    <Styled.Wrapper>
      <Styled.TitlePage>Мои акции</Styled.TitlePage>
      <Styled.Subtitle>
        Нажмите на профиль для просмотра или создания акций
      </Styled.Subtitle>
      <ProfileSelect
        profiles={profiles}
        activeProfile={activeProfile}
        onClickProfile={handleProfileClick}
        quantityTitles={['Одобренные', 'На рассмотрении']}
      />
      {activeProfile && type && (
        <ActiveSaleProfile
          activeProfile={activeProfile}
          type={type}
          setActiveProfile={setActiveProfile}
        />
      )}
    </Styled.Wrapper>
  )
}

export default CabinetSales
