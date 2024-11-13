import { useState, FC, useMemo } from 'react'
import * as Styled from './styles'

import { IUser } from 'src/types/me'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import ProfileSelect from './components/ProfileSelect'
import { getPrepareData } from './utils/getPrepareData'
import ActiveSaleProfile from './components/ActiveSaleProfile'

export type IPromotionsType = 'salon' | 'master' | 'brand' | null

interface Props {
  user: IUser
}

const CabinetSales: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner
  const [type, setType] = useState<IPromotionsType>(null)
  const [activeProfile, setActiveProfile] = useState<
    ISalon | IMaster | IBrand | null
  >(null)

  const { profiles } = useMemo(
    () => getPrepareData({ salons, masters, brands, entityType: 'sales' }),
    [salons, brands, masters],
  )

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    setType(profile.profileType as 'master' | 'salon' | 'brand')
    switch (profile.profileType) {
      case 'master':
        const foundMaster = masters?.find(master => master.id === profile.id)
        setActiveProfile(foundMaster || null)
        break
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

  console.log(masters)

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
