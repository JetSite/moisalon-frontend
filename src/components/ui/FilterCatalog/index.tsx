import { FC } from 'react'
import Header from '../../pages/Brand/ViewBrand/components/Header'
import { SearchBrandAutosuggest } from 'src/components/newUI/Inputs/AutosuggestField/SearchBrand'
import { SearchProductCategoryAutosuggest } from 'src/components/newUI/Inputs/AutosuggestField/SearchProductCategory'

import {
  IUseFiltredProductsProps,
  useFiltredProducts,
} from './useFiltredProducts'

interface Props extends Omit<IUseFiltredProductsProps, ''> {}

const FilterCatalog: FC<Props> = ({
  setProductsData,
  pageSize,
  setLoading,
  nextPage,
  setPagination,
  setNextPage,
  noBrands,
  brand,
}) => {
  const { selectCategory, selectBrand, setSelectCategory, setSelectBrand } =
    useFiltredProducts({
      setProductsData,
      nextPage,
      pageSize,
      setLoading,
      setPagination,
      setNextPage,
      noBrands,
      brand,
    })

  return (
    <>
      <SearchProductCategoryAutosuggest
        name="productCategories"
        clearFilterTitle="Все категории"
        label="Категории продукции"
        fullWidth
        color="red"
        setSelectValue={setSelectCategory}
      />
      {!noBrands ? (
        <SearchBrandAutosuggest
          name="brands"
          clearFilterTitle="Все бренды"
          label="Категории продукции"
          fullWidth
          color="red"
          setSelectBrand={setSelectBrand}
        />
      ) : null}
      {!noBrands && selectBrand && (
        <Header brand={selectBrand} isOwner={false} noBackButton />
      )}
    </>
  )
}

export default FilterCatalog
