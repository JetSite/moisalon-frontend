import { FC } from 'react'
import Header from '../../pages/Brand/ViewBrand/components/Header'
import { SearchBrandAutosuggest } from 'src/components/newUI/Inputs/AutosuggestField/SearchBrand'
import { SearchProductCategoryAutosuggest } from 'src/components/newUI/Inputs/AutosuggestField/SearchProductCategory'
import styled from 'styled-components'

import {
  IUseFiltredProductsProps,
  useFiltredProducts,
} from './useFiltredProducts'
import { laptopBreakpoint } from 'src/styles/variables'

interface Props extends IUseFiltredProductsProps {}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`

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
      <Wrapper>
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
            label="Бренды"
            fullWidth
            color="red"
            setSelectBrand={setSelectBrand}
          />
        ) : null}
      </Wrapper>
      {!noBrands && selectBrand && (
        <Header brand={selectBrand} isOwner={false} noBackButton />
      )}
    </>
  )
}

export default FilterCatalog
