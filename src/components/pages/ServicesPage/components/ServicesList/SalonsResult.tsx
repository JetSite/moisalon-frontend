import React, { FC } from 'react'
import Link from 'next/link'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { WrapperItemsSalons, TitleResults, SalonCardWrapper } from './styles'
import SalonCard from '../../../../blocks/SalonCard'
import { pluralize } from '../../../../../utils/pluralize'
import { ISalon } from 'src/types/salon'

interface ISalonsResultProps {
  salons: ISalon[]
  totalItems?: number
}

const SalonsResult: FC<ISalonsResultProps> = ({ salons, totalItems }) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <>
      {salons?.length ? (
        <>
          <TitleResults>
            {`${pluralize(
              totalItems,
              'Найден',
              'Найдено',
              'Найдено',
            )} ${totalItems} ${pluralize(
              totalItems,
              'салон',
              'салона',
              'салонов',
            )}`}
          </TitleResults>
          <WrapperItemsSalons>
            {salons?.map(salon => (
              <Link key={salon?.id} href={`/${city.slug}/salon/${salon.id}`}>
                <SalonCardWrapper>
                  <SalonCard
                    item={salon}
                    shareLink={`https://moisalon-frontend.jetsite.ru/${city.slug}/salon/${salon.id}`}
                  />
                </SalonCardWrapper>
              </Link>
            ))}
          </WrapperItemsSalons>
        </>
      ) : (
        <TitleResults>Салонов не найдено</TitleResults>
      )}
    </>
  )
}

export default SalonsResult
