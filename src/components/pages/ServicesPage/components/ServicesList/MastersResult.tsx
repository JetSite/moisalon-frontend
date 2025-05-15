import React, { FC } from 'react'
import Link from 'next/link'
import { pluralize } from '../../../../../utils/pluralize'
import { WrapperItemsMasters, TitleResults, LinkStyled } from './styles'
import MasterItem from '../../../../blocks/MasterCard'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { IMaster } from 'src/types/masters'

interface IMastersResultProps {
  masters: IMaster[]
  totalItems?: number
}

const MastersResult: FC<IMastersResultProps> = ({ masters, totalItems }) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <>
      {masters?.length ? (
        <>
          <TitleResults>
            {`${pluralize(totalItems || 0, 'Найден', 'Найдено', 'Найдено')} ${
              totalItems || 0
            } ${pluralize(totalItems || 0, 'мастер', 'мастера', 'мастеров')}`}
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
