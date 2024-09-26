import { IMaster } from 'src/types/masters'
import { IProfileWithType } from '../components/ProfileSelect'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'

export type IgetPrepareData = (props: IgetPrepareDataProps) => {
  profiles: IProfileWithType[]
}

interface IgetPrepareDataProps {
  masters?: IMaster[]
  salons?: ISalon[]
  brands?: IBrand[]
}

export const getPrepareData: IgetPrepareData = ({
  masters,
  salons,
  brands,
}) => {
  const profiles: IProfileWithType[] = [
    ...(masters?.map(master => ({
      id: master.id,
      name: master.name,
      photo: master.photo,
      rent: false,
      profileType: 'master' as const,
      type: 'мастера',
    })) || []),
    ...(salons?.map(salon => ({
      id: salon.id,
      name: salon.name,
      photo: salon.logo,
      rent: salon.rent,
      profileType: 'salon' as const,
      type: salon.rent ? 'салона арендодателя' : 'салона',
    })) || []),
    ...(brands?.map(brand => ({
      id: brand.id,
      name: brand.name,
      photo: brand.logo,
      rent: false,
      profileType: 'brand' as const,
      type: 'бренда',
    })) || []),
  ]
  return { profiles }
}
