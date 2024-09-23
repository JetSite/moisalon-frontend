import { IProductCategories } from 'src/types/product'
import * as Styled from './styles'
import { FC } from 'react'
import { IID, ISetState } from 'src/types/common'
import { IBrand } from 'src/types/brands'

export interface IFilterCatalog {
  label: string | 'Все категории' | 'Все бренды'
  value: IID | 'Все категории' | 'Все бренды'
}

interface Props {
  productCategories: IProductCategories[]
  setSelectBrand: ISetState<IBrand | null>
  brands: IBrand[]
}

const FilterCatalog: FC<Props> = ({
  setFilterProduct,
  productCategories,
  selectedBrand,
  filterProduct,
  brands,
  setSelectBrand,
}) => {
  // const [brandActive, setBrandActive] = useState();
  // const [typeActive, setTypeActive] = useState();
  // const [showFilterBlock, setShowFilterBlock] = useState(false);

  // const brandFilterHandler = (brand) => {
  //   setBrandActive(brand.id !== brandActive ? brand.id : null);
  //   setFilter(brand.name);
  // };

  // const typeFilterHandler = (type) => {
  //   setTypeActive(type.id !== typeActive ? type.id : null);
  //   setFilter(type.name);
  // };

  const productOptions: IFilterCatalog[] = productCategories?.map(category => {
    return {
      label: category.title,
      value: category.id,
    }
  })

  const allOptions: IFilterCatalog[] = [
    {
      label: 'Все категории',
      value: 'Все категории',
    },
    ...(productOptions || []),
  ]

  const brandOptions = brands?.map(category => {
    return {
      label: category.name,
      value: category.name,
    }
  })

  const allBOptions: IFilterCatalog[] = [
    {
      label: 'Все бренды',
      value: 'Все бренды',
    },
    ...(brandOptions || []),
  ]

  const filterProductHandler = value => {
    setFilterProduct(value)
    if (value === 'Все категории' && selectedBrand === 'Все бренды') return
  }

  const filterBrandHandler = e => {
    console.log(e.target.value)

    setSelectBrand(e.target.value)
    // setFilterBrand(e.target.value === "Все бренды" ? null : e.target.value);
    // if (e.target.value === "Все бренды" && selectedProduct === "Все категории")
    //   return;
    // window.scrollTo({
    //   top: 1600,
    //   behavior: "smooth",
    // });
  }

  return (
    <Styled.Wrapper>
      <Styled.ProductFilter>
        {/* <SelectStyled
          name="productCategories"
          label="Категории продукции"
          options={allPOptions || []}
          value={selectedProduct}
          onChange={filterProductHandler}
          fullWidth={true}
          color={variant}
        /> */}
        {allOptions?.length
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
          : null}
      </Styled.ProductFilter>

      {/* {type !== 'product' ? ( */}
      <Styled.BrandFilter>
        <Styled.SelectStyled
          name="brandCategories"
          label="Бренды"
          options={allBOptions || []}
          value={selectedBrand}
          onChange={filterBrandHandler}
          fullWidth={true}
          color={'red'}
        />
      </Styled.BrandFilter>
      {/* ) : null} */}

      {/* <Filters variant={variant}>
        <Category
        onClick={() => setShowFilterBlock(!showFilterBlock)}
        >
          Категории
        </Category>
        <RestFilters variant={variant}>Фильтры</RestFilters>
      </Filters>
      {showFilterBlock && (
        <FilterBlock>
          {brands.map((brand) => (
          <FilterItem
            key={brand.id}
            active={brand.id === brandActive}
            onClick={() => brandFilterHandler(brand)}
          >
            {brand.name}
          </FilterItem>
        ))}
          {types.map((type) => (
            <FilterItem
              key={type.id}
              active={type.id === typeActive}
              onClick={() => typeFilterHandler(type)}
              variant={variant}
            >
              {type.name}
            </FilterItem>
          ))}
        </FilterBlock>
      )} */}
    </Styled.Wrapper>
  )
}

export default FilterCatalog
