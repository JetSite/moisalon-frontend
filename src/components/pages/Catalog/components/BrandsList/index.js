import FilterCatalogBrandCategory from "../../../../ui/FilterCatalogBrandCategory";
import ChooseBrand from "../ChooseBrand";
import List from "./List";

import { Wrapper, Content, ContentBottom } from "./styles";

const BrandsList = ({
  setFilterProduct,
  productCategories,
  filterProduct,
  brandsData,
  brandSearchData,
}) => {
  return (
    <Wrapper>
      <Content>
        <FilterCatalogBrandCategory
          variant="white"
          setFilterProduct={setFilterProduct}
          productCategories={productCategories}
          filterProduct={filterProduct}
        />
      </Content>
      <ChooseBrand brandsData={brandsData} filterProduct={filterProduct} />
      <ContentBottom>
        <List filterProduct={filterProduct} brandSearchData={brandSearchData} />
      </ContentBottom>
    </Wrapper>
  );
};

export default BrandsList;
