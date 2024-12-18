import { ApolloError, useMutation } from '@apollo/client'
import moment from 'moment'
import { useState } from 'react'
import { CREATE_PROMOTION } from 'src/api/graphql/promotion/mutations/createPromotion'
import { UPDATE_PROMOTION } from 'src/api/graphql/promotion/mutations/updatePromotion'
import { IID, ISetState } from 'src/types/common'
import { IPromotionStatus, IPromotions } from 'src/types/promotions'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface IHandleCreateOrUpdateSaleProps {
  setOpenPopup: ISetState<boolean>
  valueType: { [K: string]: IID }
  sale: IPromotions | null
  input: { [K: string]: any }
  promotions: IPromotions[]
}

export type IHandleCreateOrUpdateSale = (
  props: IHandleCreateOrUpdateSaleProps,
) => void

export type IUseSaleMutate = (props: IUseSaleMutateProps) => {
  loading: boolean
  handleCreateOrUpdate: IHandleCreateOrUpdateSale
}

interface IUseSaleMutateProps {
  setErrors: ISetState<string[] | null>
  setSales: ISetState<IPromotions[]>
}

export const usePromotionMutate: IUseSaleMutate = ({ setErrors, setSales }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
  }

  const [createSale] = useMutation(CREATE_PROMOTION, {
    onError,
  })

  const [updateSale] = useMutation(UPDATE_PROMOTION, {
    onError,
  })

  const handleCreateOrUpdate: IHandleCreateOrUpdateSale = async ({
    setOpenPopup,
    input,
    valueType,
    sale,
    promotions,
  }) => {
    setLoading(true)
    const onCompleted = async (data: any) => {
      const prepareData: IPromotions = flattenStrapiResponse(
        data.createPromotion || data.updatePromotion,
      )

      if (input.publishedAt) {
        promotions.push(prepareData)
      }

      setSales(pre => {
        const findSale = pre.find(e => e.id === prepareData.id)
        if (findSale) {
          const newArr = pre.filter(e => e.id !== findSale.id)
          if (input.publishedAt) {
            return newArr
          } else {
            return [prepareData, ...newArr]
          }
        } else {
          return [prepareData, ...pre]
        }
      })
      setLoading(false)
      setOpenPopup(true)
    }
    try {
      const status = input.publishedAt
        ? IPromotionStatus.PUBLISHED
        : IPromotionStatus.DRAFT

      const publishedAt = input.publishedAt ? moment().toISOString() : null
      if (sale?.id) {
        updateSale({
          variables: {
            id: sale.id,
            input: {
              ...input,
              status,
              publishedAt,
            },
          },
          onCompleted,
        })
      } else {
        createSale({
          variables: {
            input: {
              ...input,
              ...valueType,
              status,
              publishedAt,
            },
          },
          onCompleted,
        })
      }
    } catch (error) {
      setLoading(false)
      // Логика обработки ошибок (если нужна)
      console.error('Error while creating/updating sale:', error)
    }
  }

  return {
    loading,
    handleCreateOrUpdate,
  }
}
