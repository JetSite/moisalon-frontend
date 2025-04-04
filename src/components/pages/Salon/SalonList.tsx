import { useRouter } from 'next/router'
import { FC } from 'react'
import { ISalon } from 'src/types/salon'
import * as Styled from '../MainPage/components/SearchMain/styled'
import SalonCard from 'src/components/blocks/SalonCard'
import Button from 'src/components/ui/Button'
import { MobileHidden, MobileVisible } from 'src/styles/common'
import { IUseSalonSearchResult } from '../MainPage/components/SearchMain/utils/useSalonSearch'
import { defaultValues } from 'src/api/authConfig'

interface Props extends Pick<IUseSalonSearchResult, 'onFetchMore' | 'loading'> {
  updateSalonData: ISalon[]
  rent: boolean
  hasNextPage: boolean
}

export const SalonList: FC<Props> = ({
  updateSalonData,
  rent,
  loading,
  onFetchMore,
  hasNextPage,
}) => {
  const router = useRouter()
  return (
    <>
      <Styled.WrapperItemsSalons>
        {updateSalonData.map(salon => (
          <Styled.SalonCardWrapper
            key={salon.id}
            onClick={() =>
              router.push(
                rent
                  ? `/${salon.city?.slug || defaultValues.city.slug}/rent/${
                      salon.id
                    }`
                  : `/${salon.city?.slug || defaultValues.city.slug}/salon/${
                      salon.id
                    }`,
              )
            }
            id={salon.id.toString()}
          >
            <SalonCard item={salon} rent={rent} loading={loading} />
          </Styled.SalonCardWrapper>
        ))}
      </Styled.WrapperItemsSalons>
      {hasNextPage ? (
        <>
          <MobileHidden>
            <Button
              onClick={onFetchMore}
              size="medium"
              variant="darkTransparent"
              mb="55"
              disabled={loading}
            >
              Показать еще
            </Button>
          </MobileHidden>
          <MobileVisible>
            <Button
              size="roundSmall"
              variant="withRoundBorder"
              font="roundSmall"
              mb="56"
              onClick={onFetchMore}
              disabled={loading}
            >
              Показать еще салоны
            </Button>
          </MobileVisible>
        </>
      ) : null}
    </>
  )
}
