import React from 'react'
import Link from 'next/link'
import { pluralize } from '../../../../../utils/pluralize'
import { WrapperItemsMasters, TitleResults, LinkStyled } from './styles'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import MasterItem from '../../../../blocks/MasterCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

const MastersResult = ({ mastersData }) => {
  const { catalogs } = useBaseStore(getStoreData)
  const { city } = useAuthStore(getStoreData)

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog,
  )

  return (
    <>
      {mastersData?.length ? (
        <>
          <TitleResults>
            {`${pluralize(
              mastersData.length || 0,
              'Найден',
              'Найдено',
              'Найдено',
            )} ${mastersData.length || 0} ${pluralize(
              mastersData.length || 0,
              'мастер',
              'мастера',
              'мастеров',
            )}`}
          </TitleResults>
          <WrapperItemsMasters>
            {mastersData?.map(master => (
              <Link
                href={`/${
                  cyrToTranslit(master?.addressFull?.city) || city.slug
                }/master/${master?.seo?.slug || master?.id}`}
                key={master.id}
              >
                <LinkStyled>
                  <MasterItem
                    master={master}
                    catalog={masterSpecializationsCatalog}
                    shareLink={`https://moi.salon/${
                      cyrToTranslit(master?.addressFull?.city) || city.slug
                    }/master/${master?.seo?.slug || master?.id}`}
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
