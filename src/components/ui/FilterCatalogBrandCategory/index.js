import {
  Wrapper,
  ProductFilter,
  ProductFilterItem,
} from "../FilterCatalog/styles";

const FilterCatalogBrandCategory = ({
  setFilterProduct,
  productCategories,
  selectedBrand,
  filterProduct,
}) => {
  const productOptions = productCategories?.map((category) => {
    return {
      label: category.title,
      value: category.id,
    };
  });

  const allOptions = [
    {
      label: "Все категории",
      value: "Все категории",
    },
    ...(productOptions || []),
  ];

  const filterProductHandler = (value) => {
    setFilterProduct(value);
    if (value === "Все категории" && selectedBrand === "Все бренды")
      return;
  };

  return (
    <Wrapper>
      <ProductFilter>
        {allOptions?.length
          ? allOptions.map((item, i) => (
              <ProductFilterItem
                active={
                  filterProduct?.label
                    ? filterProduct?.label === item?.label
                    : "Все категории" === item?.label
                }
                onClick={() => filterProductHandler(item)}
                key={i}
              >
                {item.label}
              </ProductFilterItem>
            ))
          : null}
      </ProductFilter>
    </Wrapper>
  );
};

export default FilterCatalogBrandCategory;
