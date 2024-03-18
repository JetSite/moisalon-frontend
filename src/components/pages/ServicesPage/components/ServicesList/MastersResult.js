import React, { useContext } from 'react'
import Link from 'next/link'
import {
  CatalogsContext,
  CityContext,
  MeContext,
} from '../../../../../searchContext'
import { pluralize } from '../../../../../utils/pluralize'
import { WrapperItemsMasters, TitleResults, LinkStyled } from './styles'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import MasterItem from '../../../../blocks/MasterCard'
import { cyrToTranslit } from '../../../../../utils/translit'

const MastersResult = ({ mastersData }) => {
  const catalogs = useContext(CatalogsContext)
  const [city] = useContext(CityContext)
  const [me] = useContext(MeContext)

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
                href={`/${cyrToTranslit(
                  master?.addressFull?.city || city,
                )}/master/${master?.seo?.slug || master?.id}`}
                key={master.id}
              >
                <LinkStyled>
                  <MasterItem
                    master={master}
                    catalog={masterSpecializationsCatalog}
                    shareLink={`https://moi.salon/${cyrToTranslit(
                      master?.addressFull?.city || city,
                    )}/master/${master?.seo?.slug || master?.id}`}
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
