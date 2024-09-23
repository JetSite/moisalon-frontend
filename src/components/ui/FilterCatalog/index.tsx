import { IProduct, IProductCategories } from 'src/types/product'
import * as Styled from './styles'
import { FC, useEffect, useMemo, useState } from 'react'
import { IID, ISetState } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { ISelectOnChange } from 'src/components/blocks/Form/Select'
import Header from '../../pages/Brand/ViewBrand/components/Header'

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
  setSelectBrand: ISetState<IBrand | null>
  brands: IBrand[]
  setProductsData: ISetState<IProduct[]>
  dataProducts: IProduct[]
  productsData: IProduct[]
}

const FilterCatalog: FC<Props> = ({
  setFilterProduct,
  productCategories,
  selectedBrand,
  filterProduct,
  brands,
  setSelectBrand,
  setProductsData,
  dataProducts,
  productsData,
}) => {
  const [selectCategoryFilter, setSelectCategoryFilter] =
    useState<ISelectValue>(categoryFilterConfig.value)
  const [selectBrandFilter, setSelectBrandFilter] = useState<ISelectValue>(
    brandFilterConfig.value,
  )

  const allBOptions: IFilterCatalog[] = useMemo(
    () => [
      brandFilterConfig,
      ...(brands?.map(category => ({
        label: category.name,
        value: category.id,
      })) || []),
    ],
    [brands],
  )

  const allOptions: IFilterCatalog[] = useMemo(
    () => [
      categoryFilterConfig,
      ...(productCategories?.map(category => ({
        label: category.title,
        value: category.id,
      })) || []),
    ],
    [brands],
  )
  // useEffect(() => {
  //   if (dataProducts.length > productsData.length) {
  //     const arr: IFilterCatalog[] = []
  //     productsData.forEach(e => {
  //       arr.push(
  //         ...e.product_categories.map(category => {
  //           return {
  //             label: category.title,
  //             value: category.id,
  //           }
  //         }),
  //       )
  //     })
  //     setAllOptions([categoryConfig, ...new Set(arr)])
  //   } else {
  //     setAllOptions([
  //       categoryConfig,
  //       ...productCategories?.map(category => {
  //         return {
  //           label: category.title,
  //           value: category.id,
  //         }
  //       }),
  //     ])
  //   }
  // }, [brands, productsData])

  const filterProductHandler: ISelectOnChange = event => {
    console.log('filterProductHandler', event)
    setSelectCategoryFilter(event.target.value as IID)
  }
  const filterBrandHandler: ISelectOnChange = event => {
    console.log('filterBrandHandler', event)
    setSelectBrandFilter(event.target.value as IID)
  }

  // const brandFilterHandler = brand => {
  //   setBrandActive(brand.id !== brandActive ? brand.id : null)
  //   setFilterProduct(brand.name)
  // }

  // const typeFilterHandler = type => {
  //   setTypeActive(type.id !== typeActive ? type.id : null)
  //   setFilterProduct(type.name)
  // }

  // const filterProductHandler = value => {
  //   // console.log('value', value.value)
  //   setSelectedProduct(value)
  //   setFilterProduct(value)
  //   if (value === 'Все категории' && brandActive.value === 'Все бренды') {
  //     setSelectBrand(null)
  //     return
  //   }
  // }

  // const filterBrandHandler = e => {
  //   const findBrand =
  //     brands.find(brand => brand.name === e.target.value) || null
  //   setBrandActive(
  //     findBrand
  //       ? { label: findBrand?.name, value: findBrand?.id }
  //       : categoryConfig,
  //   )
  //   setSelectBrand(findBrand)
  //   findBrand
  //     ? setProductsData(findBrand.products)
  //     : setProductsData(dataProducts)
  //   // setFilterBrand(e.target.value === "Все бренды" ? null : e.target.value);

  //   console.log(e.target.value)

  //   if (
  //     e.target.value === 'Все бренды' &&
  //     selectedProduct.value === 'Все категории'
  //   ) {
  //     setSelectBrand(null)
  //     return
  //   }
  //   window.scrollTo({
  //     top: 1600,
  //     behavior: 'smooth',
  //   })
  // }

  return (
    <>
      <Styled.Wrapper>
        <Styled.ProductFilter>
          <Styled.SelectStyled
            name="productCategories"
            label="Категории продукции"
            options={allOptions || []}
            value={selectCategoryFilter}
            onChange={filterProductHandler}
            fullWidth={true}
            color={'red'}
          />
          {/* {allOptions?.length
        ? allOptions.map((item, i) => (
            <Styled.ProductFilterItem
              active={
                filterProduct?.label
                  ? filterProduct?.label === item?.label
                  : 'Все категории' === item?.label
              }
              onClick={() => filterProductHandler(item)}
              key={i}
            >
              {item.label}
            </Styled.ProductFilterItem>
          ))
        : null} */}
        </Styled.ProductFilter>

        <Styled.BrandFilter>
          <Styled.SelectStyled
            name="brandCategories"
            label="Бренды"
            options={allBOptions || []}
            value={selectBrandFilter}
            onChange={filterBrandHandler}
            fullWidth={true}
            color={'red'}
          />
        </Styled.BrandFilter>
      </Styled.Wrapper>
      {selectBrandFilter !== 'Все бренды' &&
        brands.find(e => e.id === selectBrandFilter) && (
          <Header
            brand={brands.find(e => e.id === selectBrandFilter)}
            isOwner={false}
            noBackButton
          />
        )}
    </>
  )
}

export default FilterCatalog
