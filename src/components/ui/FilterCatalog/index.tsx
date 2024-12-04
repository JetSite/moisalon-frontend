import { IProduct, IProductCategories } from 'src/types/product'
import * as Styled from './styles'
import { FC, useEffect, useMemo, useState } from 'react'
import { IID, ISetState } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { ISelectOnChange } from 'src/components/blocks/Form/Select'
import Header from '../../pages/Brand/ViewBrand/components/Header'
import {
  ISuggestHandleChange,
  SearchBrandAutosuggest,
} from 'src/components/newUI/Inputs/AutosuggestField/SearchBrand'
import { SearchProductCategoryAutosuggest } from 'src/components/newUI/Inputs/AutosuggestField/SearchProductCategory'
import { useLazyQuery } from '@apollo/client'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPagination } from 'src/types'

type ISelectValue = 'Все категории' | 'Все бренды' | IID

export interface IFilterCatalog {
  label: 'Все категории' | 'Все бренды' | string
  value: ISelectValue
}

const categoryFilterConfig: IFilterCatalog = {
  label: 'Все категории',
  value: 'Все категории',
}

const brandFilterConfig: IFilterCatalog = {
  label: 'Все бренды',
  value: 'Все бренды',
}

interface Props {
  productCategories: IProductCategories[]
  brands?: IBrand[]
  brand?: IBrand
  setProductsData: ISetState<IProduct[]>
  pageSize: number
  setLoading: ISetState<boolean>
  nextPage: number
  setPagination: ISetState<IPagination>
  setNextPage: ISetState<number>
}

const FilterCatalog: FC<Props> = ({
  productCategories,
  setProductsData,
  pageSize,
  setLoading,
  nextPage,
  setPagination,
  setNextPage,
  brands,
  brand,
}) => {
  const [reset, setReset] = useState<'brand' | 'category' | null>(null)
  const [selectBrand, setSelectBrand] = useState<IBrand | null>(
    brands ? null : brand ?? null,
  )
  const [selectCategory, setSelectCategory] =
    useState<IProductCategories | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const [getProducts] = useLazyQuery(PRODUCTS)

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }
    setLoading(true)
    if (selectBrand) {
      getProducts({
        variables: {
          page: nextPage,
          pageSize,
          filtersInput: {
            brand: {
              name: {
                contains: selectBrand.name,
              },
            },
          },
        },
        onCompleted,
      })
    } else if (selectCategory) {
      getProducts({
        variables: {
          page: nextPage,
          pageSize,
          filtersInput: {
            product_categories: {
              title: {
                contains: selectCategory.title,
              },
            },
          },
        },
        onCompleted,
      })
    } else {
      getProducts({
        variables: {
          page: nextPage,
          pageSize,
        },
        onCompleted,
      })
    }
  }, [nextPage])

  const onCompleted = (data: any) => {
    const prepareData: IProduct[] = flattenStrapiResponse(data.products)
    setPagination(data.products.meta.pagination)
    if (data.products.meta.pagination.page > 1) {
      setProductsData(pre => [...pre, ...prepareData])
    } else {
      setProductsData(prepareData)
      setNextPage(1)
    }
    setReset(null)
    setLoading(false)
  }

  const handleChangeCategory: ISuggestHandleChange = data => {
    setLoading(true)

    const categoryFilterString = data?.title || null
    setSelectCategory(data as IProductCategories)
    setSelectBrand(null)
    setReset('brand')

    const filtersInput = {
      ...(brand && { brand: { id: { eq: brand.id } } }),
      ...(categoryFilterString && {
        product_categories: { title: { contains: categoryFilterString } },
      }),
    }
    if (categoryFilterString) {
      getProducts({
        variables: {
          pageSize,
          filtersInput,
        },
        onCompleted,
      })
    } else {
      getProducts({
        variables: {
          pageSize,
          filtersInput: { ...(brand && { brand: { id: { eq: brand.id } } }) },
        },
        onCompleted,
      })
    }
  }

  const handleChangeBrand: ISuggestHandleChange = data => {
    setLoading(true)
    const brandFilterString = data?.name || null
    setSelectBrand(data as IBrand)
    setSelectCategory(null)
    setReset('category')

    if (brandFilterString) {
      getProducts({
        variables: {
          pageSize,
          filtersInput: {
            brand: {
              name: {
                contains: brandFilterString,
              },
            },
          },
        },
        onCompleted,
      })
    } else {
      getProducts({
        variables: {
          pageSize,
        },
        onCompleted,
      })
    }
  }

  return (
    <>
      <Styled.Wrapper>
        <Styled.BrandFilter>
          <SearchProductCategoryAutosuggest
            initialValues={productCategories}
            handleChange={handleChangeCategory}
            defaultValue="Все категории"
            name="productCategory"
            label="Категории продукции"
            color="red"
            fullWidth
            reset={reset === 'category'}
          />
        </Styled.BrandFilter>

        {brands ? (
          <Styled.BrandFilter>
            <SearchBrandAutosuggest
              initialValues={brands}
              handleChange={handleChangeBrand}
              defaultValue="Все бренды"
              name="brands"
              color="red"
              fullWidth
              reset={reset === 'brand'}
            />
          </Styled.BrandFilter>
        ) : null}
      </Styled.Wrapper>
      {brands && selectBrand && (
        <Header brand={selectBrand} isOwner={false} noBackButton />
      )}
    </>
  )
}

export default FilterCatalog
