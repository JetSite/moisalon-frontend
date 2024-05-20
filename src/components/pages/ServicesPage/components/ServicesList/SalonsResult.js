import React from 'react'
import Link from 'next/link'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { WrapperItemsSalons, TitleResults, SalonCardWrapper } from './styles'
import SalonCard from '../../../../blocks/SalonCard'
import { pluralize } from '../../../../../utils/pluralize'
import { cyrToTranslit } from '../../../../../utils/translit'

const SalonsResult = ({ salonsData }) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <>
      {salonsData?.length ? (
        <>
          <TitleResults>
            {`${pluralize(salonsData.length, 'Найден', 'Найдено', 'Найдено')} ${
              salonsData.length
            } ${pluralize(salonsData.length, 'салон', 'салона', 'салонов')}`}
          </TitleResults>
          <WrapperItemsSalons>
            {salonsData?.map(salon => (
              <Link
                key={salon?.id}
                href={`/${
                  cyrToTranslit(salon?.address?.city) || city.citySlug
                }/salon/${salon.seo?.slug || salon.id}`}
              >
                <SalonCardWrapper>
                  <SalonCard
                    seatCount={salon.seatCount}
                    item={salon}
                    shareLink={`https://moi.salon/${
                      cyrToTranslit(salon?.address?.city) || city.citySlug
                    }/salon/${salon.seo?.slug || salon.id}`}
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
