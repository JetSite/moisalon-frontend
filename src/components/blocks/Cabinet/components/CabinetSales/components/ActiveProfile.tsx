import { FC, MouseEvent, useMemo, useState } from 'react'
import * as Styled from '../styles'
import Button from '../../../../../ui/Button'
import { MobileHidden, MobileVisible } from '../../../../../../styles/common'
import CreateSale from './CreateSale'
import { PHOTO_URL } from '../../../../../../api/variables'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { IPromotionsType } from '../../CabinetSales'
import { SalesList } from './SalesList'
import { IID, ISetState } from 'src/types/common'
import ProfileItem from './ProfileItem'
import { useLazyQuery, useMutation } from '@apollo/client'
import { NOT_PUBLISH_SALE } from 'src/api/graphql/sale/queries/getNotPublishSale'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPromotions } from 'src/types/promotions'
import { ISaleDeleteHandler, ISaleHandler } from 'src/components/blocks/Sale'
import { UPDATE_PROMOTION } from 'src/api/graphql/promotion/mutations/updatePromotion'
import { IPagination } from 'src/types'

interface ActiveProfileProps {
  activeProfile: ISalon | IMaster | IBrand
  type: IPromotionsType
  createSale: boolean
  setCreateSale: ISetState<boolean>
  setActiveProfile: ISetState<ISalon | IMaster | IBrand | null>
}

type IView = 'publish' | 'draft'

const ActiveProfile: FC<ActiveProfileProps> = ({
  activeProfile,
  type,
  createSale,
  setCreateSale,
  setActiveProfile,
}) => {
  const [view, setView] = useState<IView>('publish')
  const [sale, setSale] = useState<IPromotions | null>(null)
  const [sales, setSales] = useState<IPromotions[]>(activeProfile.promotions)
  const [pagination, setPagination] = useState<IPagination | null>(null)

  const typeString =
    type === 'master' ? 'мастера' : type === 'salon' ? 'салона' : 'бренда'

  const searchID = activeProfile.id

  const profile = {
    id: activeProfile.id,
    name: activeProfile.name,
    photo: (activeProfile as ISalon).logo || (activeProfile as IMaster).photo,
    rent: (activeProfile as ISalon).rent || false,
  }

  const [deleteSale] = useMutation(UPDATE_PROMOTION, {
    onCompleted: data => {
      refetch({
        variables: { [type as string]: searchID },
        onCompleted: data => {
          const prepareData: IPromotions[] = flattenStrapiResponse(
            data.promotions,
          )
          setSales(prepareData)
          setPagination(data.promotions.meta.pagination)
        },
      })
    },
  })

  const [refetch, { loading }] = useLazyQuery(NOT_PUBLISH_SALE)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === 'publish') {
      setSales(activeProfile.promotions)
      setView('publish')
    } else {
      refetch({
        variables: { [type as string]: searchID },
        onCompleted: data => {
          const prepareData: IPromotions[] = flattenStrapiResponse(
            data.promotions,
          )
          setSales(prepareData)
          setPagination(data.promotions.meta.pagination)
          setView('draft')
        },
      })
    }
  }

  const handleSaleClick: ISaleHandler = e => {
    if (view === 'publish') return
    console.log(e.currentTarget.id)
    const findSale =
      sales.find(element => element.id === e.currentTarget.id) || null
    setSale(findSale)
    setCreateSale(true)
  }

  const handleDelete: ISaleDeleteHandler = (e, id) => {
    const deleteID = id || e.currentTarget.id
    if (view === 'publish') {
      const index = activeProfile.promotions.findIndex(
        sale => sale.id === deleteID,
      )
      activeProfile.promotions[index] = {
        ...activeProfile.promotions[index],
        deleted: true,
      }

      setSales(activeProfile.promotions)
    } else {
      deleteSale({
        variables: {
          id: deleteID,
          input: {
            deleted: true,
          },
        },
      })
    }
  }

  return (
    <>
      <Styled.Back
        onClick={() => {
          setActiveProfile(null)
          setCreateSale(false)
        }}
      >
        Назад
      </Styled.Back>
      <ProfileItem profile={profile} type={typeString} />
      {!createSale ? (
        <>
          <MobileHidden>
            <Button
              size="width374WithoutPadding"
              variant="darkTransparent"
              font="medium"
              onClick={() => {
                setSale(null)
                setCreateSale(true)
              }}
            >
              Создать акцию
            </Button>
            <Styled.ButtonWrapper>
              <Button
                size="width374WithoutPadding"
                onClick={handleClick}
                variant={'red'}
                font="medium"
                name="publish"
                disabled={view === 'publish'}
              >
                Активные
              </Button>
              <Button
                size="width374WithoutPadding"
                onClick={handleClick}
                variant={'red'}
                font="medium"
                name="draft"
                disabled={view === 'draft'}
              >
                Не активные
              </Button>
            </Styled.ButtonWrapper>
          </MobileHidden>
          <MobileVisible>
            <Button
              size="fullWidth"
              onClick={() => {
                setSale(null)
                setCreateSale(true)
              }}
              variant="darkTransparent"
              font="small"
            >
              Создать акцию
            </Button>
            <Styled.ButtonWrapper>
              <Button
                size="fullWidth"
                onClick={handleClick}
                variant={'red'}
                font="small"
                name="publish"
                disabled={view === 'publish'}
              >
                Активные
              </Button>
              <Button
                size="fullWidth"
                onClick={handleClick}
                variant={'red'}
                font="small"
                name="draft"
                disabled={view === 'draft'}
              >
                Не активные
              </Button>
            </Styled.ButtonWrapper>
          </MobileVisible>
          <SalesList
            handleClick={handleSaleClick}
            loading={loading}
            type={type}
            sales={sales}
            refetch={refetch}
            handleDelete={handleDelete}
            searchID={searchID}
            setSales={setSales}
            pagination={pagination}
            setPagination={setPagination}
            popupText={
              view === 'publish'
                ? 'После проверки модератором акция будет удалена безвозвратно. Вы уверены?'
                : undefined
            }
          />
        </>
      ) : (
        <CreateSale
          type={type}
          activeProfile={activeProfile}
          setCreateSale={setCreateSale}
          sale={sale}
          setSales={setSales}
        />
      )}
    </>
  )
}

export default ActiveProfile
