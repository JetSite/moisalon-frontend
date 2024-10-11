import { useState, useEffect, FC, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { reviewsForBrand } from '../../../../../_graphql-legacy/brand/reviewsForBrand'
import { reviewsForMaster } from '../../../../../_graphql-legacy/master/reviewsForMaster'
import { reviewsForSalon } from '../../../../../_graphql-legacy/salon/reviewsForSalon'
import * as Styled from './styles'
import { PHOTO_URL } from '../../../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IID } from 'src/types/common'
import { CabinetReviews } from './CabinetReviews'
import ProfileSelect from '../CabinetSales/components/ProfileSelect'
import ActiveProfile from '../CabinetSales/components/ActiveProfile'
import { IUser } from 'src/types/me'
import { IPromotionsType } from '../CabinetSales'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import ProfileItem from '../CabinetSales/components/ProfileItem'

interface Props {
  user: IUser
}

const CabinetListReviews: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner
  const [id, setId] = useState('')
  const [type, setType] = useState<IPromotionsType>(null)
  const [activeProfile, setActiveProfile] = useState<
    ISalon | IMaster | IBrand | null
  >(null)

  const { profiles } = useMemo(
    () => getPrepareData({ salons, masters, brands, entityType: 'reviews' }),
    [salons, brands, masters],
  )

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    setType(profile.profileType as 'master' | 'salon' | 'brand')
    setId(profile.id)
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

  return (
    <Styled.Wrapper>
      <Styled.TitlePage>Отзывы клиентов</Styled.TitlePage>
      <Styled.Subtitle>
        Нажмите на профиль для просмотра его отзывов
      </Styled.Subtitle>
      <ProfileSelect
        profiles={profiles}
        activeProfile={activeProfile}
        onClickProfile={handleProfileClick}
      />

      {activeProfile && type && (
        <CabinetReviews
          type={type}
          loading={false}
          activeProfile={activeProfile}
          setActiveProfile={setActiveProfile}
        />
      )}
    </Styled.Wrapper>
  )
}

export default CabinetListReviews
