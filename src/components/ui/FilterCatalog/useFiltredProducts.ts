import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { IPagination } from 'src/types'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import { IProduct } from 'src/types/product'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

export interface IUseFiltredProductsResult {
  selectCategory: string | null
  selectBrand: IBrand | null
  setSelectCategory: ISetState<string | null>
  setSelectBrand: ISetState<IBrand | null>
}

export interface IUseFiltredProductsProps {
  nextPage: number
  setProductsData: ISetState<IProduct[]>
  pageSize: number
  setLoading: ISetState<boolean>
  setPagination: ISetState<IPagination>
  setNextPage: ISetState<number>
  noBrands?: boolean
  brand?: IBrand
}

type UseFiltredProducts = (
  props: IUseFiltredProductsProps,
) => IUseFiltredProductsResult

export const useFiltredProducts: UseFiltredProducts = ({
  setProductsData,
  nextPage,
  pageSize,
  setLoading,
  setPagination,
  setNextPage,
  noBrands,
  brand,
}) => {
  const [getProducts] = useLazyQuery(PRODUCTS)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [selectCategory, setSelectCategory] = useState<string | null>(null)
  const [selectBrand, setSelectBrand] = useState<IBrand | null>(
    noBrands ? null : brand ?? null,
  )

  const onCompleted = (data: any) => {
    const prepareData: IProduct[] = flattenStrapiResponse(data.products)
    setPagination(data.products.meta.pagination)
    if (data.products.meta.pagination.page > 1) {
      setProductsData(pre => [...pre, ...prepareData])
    } else {
      setProductsData(prepareData)
      setNextPage(1)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }

    const filtersInput = {
      ...(selectBrand && { brand: { id: { eq: selectBrand.id } } }),
      ...(selectCategory && {
        product_categories: { title: { contains: selectCategory } },
      }),
    }

    setLoading(true)

    getProducts({
      variables: {
        page: nextPage,
        pageSize,
        filtersInput,
      },
      onCompleted,
    })
  }, [selectBrand, selectCategory, nextPage])

  useEffect(() => {
    setNextPage(1)
  }, [selectBrand, selectCategory])

  return {
    selectCategory,
    selectBrand,
    setSelectCategory,
    setSelectBrand,
  }
}
