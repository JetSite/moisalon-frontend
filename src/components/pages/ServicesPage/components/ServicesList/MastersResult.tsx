import React, { FC } from 'react'
import Link from 'next/link'
import { pluralize } from '../../../../../utils/pluralize'
import { WrapperItemsMasters, TitleResults, LinkStyled } from './styles'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import MasterItem from '../../../../blocks/MasterCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'
import { IMaster } from 'src/types/masters'

interface IMastersResultProps {
  masters: IMaster[]
}

const MastersResult: FC<IMastersResultProps> = ({ masters }) => {
  const { catalogs } = useBaseStore(getStoreData)
  const { city } = useAuthStore(getStoreData)

  // const masterSpecializationsCatalog = catalogOrDefault(
  //   catalogs?.masterSpecializationsCatalog,
  // )

  return (
    <>
      {masters?.length ? (
        <>
          <TitleResults>
            {`${pluralize(
              masters.length || 0,
              'Найден',
              'Найдено',
              'Найдено',
            )} ${masters.length || 0} ${pluralize(
              masters.length || 0,
              'мастер',
              'мастера',
              'мастеров',
            )}`}
          </TitleResults>
          <WrapperItemsMasters>
            {masters?.map(master => (
              <Link href={`/${city.slug}/master/${master?.id}`} key={master.id}>
                <LinkStyled>
                  <MasterItem
                    master={master}
                    shareLink={`https://moisalon-frontend.jetsite.ru/${city.slug}/master/${master?.id}`}
                  />
                </LinkStyled>
              </Link>
            ))}
          </WrapperItemsMasters>
        </>
      ) : (
        <TitleResults>Мастеров не найдено</TitleResults>
      )}
    </>
  )
}

export default MastersResult
