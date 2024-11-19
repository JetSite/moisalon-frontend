import { FC, MouseEvent, useState } from 'react'
import CreateSale from './CreateSale'
import { IProfileWithPromotions, IProfileType } from '..'
import { SalesList } from './SalesList'
import { ISetState } from 'src/types/common'
import { useLazyQuery, useMutation } from '@apollo/client'
import { NOT_PUBLISH_SALE } from 'src/api/graphql/sale/queries/getNotPublishSale'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPromotions } from 'src/types/promotions'
import { UPDATE_PROMOTION } from 'src/api/graphql/promotion/mutations/updatePromotion'
import { IPagination } from 'src/types'
import ProfileManager, {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../../ActiveProfile/ProfileManager'

interface ActiveProfileProps {
  activeProfile: IProfileWithPromotions
  type: IProfileType
  setActiveProfile: ISetState<IProfileWithPromotions | null>
}

type IView = 'publish' | 'draft'

const ActiveSaleProfile: FC<ActiveProfileProps> = ({
  activeProfile,
  type,
  setActiveProfile,
}) => {
  const [view, setView] = useState<IView>('publish')
  const [sale, setSale] = useState<IPromotions | null>(null)
  const [sales, setSales] = useState<IPromotions[]>(
    activeProfile.promotions || [],
  )
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [createSale, setCreateSale] = useState(false)

  const searchID = activeProfile.id

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
      setSales(activeProfile.promotions || [])
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

  const handleSaleClick: IEntityHandler = e => {
    if (view === 'publish') return
    const findSale =
      sales.find(element => element.id === e.currentTarget.id) || null
    setSale(findSale)
    setCreateSale(true)
  }

  const handleDelete: IEntityDeleteHandler = id => {
    if (!activeProfile.promotions) return
    const deleteID = id
    if (view === 'publish') {
      const index = activeProfile.promotions.findIndex(
        sale => sale.id === deleteID,
      )
      const updatedPromotions = activeProfile.promotions.map((sale, i) =>
        i === index ? { ...sale, deleted: true } : sale,
      )
      setSales(updatedPromotions)
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
    <ProfileManager
      type={type}
      profile={activeProfile}
      createEntity={createSale}
      setCreateEntity={setCreateSale}
      createEntityButton="Создать Акцию"
      view={view}
      handleViewClick={handleClick}
      handleBack={() => {
        setActiveProfile(null)
      }}
      onCreateEntity={() => {
        setSale(null)
      }}
      createEntityComponent={
        <CreateSale
          type={type}
          activeProfile={activeProfile}
          setCreateSale={setCreateSale}
          sale={sale}
          setSales={setSales}
        />
      }
      entitiesManagerComponent={
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
      }
    />
  )
}

export default ActiveSaleProfile
