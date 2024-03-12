import { useState } from "react";
import scrollIntoView from "scroll-into-view";
import {
  Wrapper,
  Title,
  ItemWrap,
  CheckboxWrapper,
  Checkbox,
  Label,
  ShowAll,
} from "./styles";

const Filters = ({
  productCategories,
  brandSearchData,
  setFilterProduct,
  filterProduct,
  setFilterBrand,
  filterBrand,
  setCustomQuery,
}) => {
  const [allProductFilter, setAllProductFilter] = useState(false);
  const [allBrandFilter, setAllBrandFilter] = useState(false);

  const handleClickProduct = (item) => {
    if (filterProduct.find((el) => el.id === item.id)) {
      const arr = filterProduct.filter((el) => el.id !== item.id);
      setFilterProduct(arr);
      setCustomQuery("");
    } else {
      setFilterProduct([...filterProduct, { title: item.title, id: item.id }]);
      setCustomQuery("");
    }
  };

  const handleClickBrand = (item) => {
    if (filterBrand.find((el) => el.id === item.id)) {
      const arr = filterBrand.filter((el) => el.id !== item.id);
      setFilterBrand(arr);
      setCustomQuery("");
    } else {
      setFilterBrand([...filterBrand, { title: item.name, id: item.id }]);
      setCustomQuery("");
    }
  };

  return (
    <Wrapper id="filters">
      <Title>РАЗДЕЛ</Title>
      {productCategories
        ?.slice(0, allProductFilter ? productCategories.length + 1 : 12)
        .map((item) => (
          <ItemWrap key={item.id}>
            <CheckboxWrapper onClick={() => handleClickProduct(item)}>
              <Checkbox
                checked={filterProduct.find((el) => el.id === item.id)}
                type="checkbox"
                name="agreement"
              />
              <Label>{item.title}</Label>
            </CheckboxWrapper>{" "}
          </ItemWrap>
        ))}
      {!allProductFilter ? (
        <ShowAll onClick={() => setAllProductFilter(true)}>
          Показать все{" "}
        </ShowAll>
      ) : (
        <ShowAll
          onClick={() => {
            setAllProductFilter(false);
            const element = document.getElementById("filters");
            scrollIntoView(element, {
              time: 500,
              align: {
                top: 0,
                topOffset: 200,
              },
            });
          }}
        >
          Скрыть все{" "}
        </ShowAll>
      )}
      <Title>Бренд</Title>
      {brandSearchData?.brandsSearch?.connection?.nodes
        ?.slice(
          0,
          allBrandFilter
            ? brandSearchData?.brandsSearch?.connection?.nodes?.length + 1
            : 12
        )
        .map((item) => (
          <ItemWrap key={item.id}>
            <CheckboxWrapper onClick={() => handleClickBrand(item)}>
              <Checkbox
                checked={filterBrand.find((el) => el.id === item.id)}
                type="checkbox"
                name="agreement"
              />
              <Label>{item.name}</Label>
            </CheckboxWrapper>{" "}
          </ItemWrap>
        ))}
      {!allBrandFilter ? (
        <ShowAll onClick={() => setAllBrandFilter(true)}>Показать все </ShowAll>
      ) : (
        <ShowAll
          onClick={() => {
            setAllBrandFilter(false);
            const element = document.getElementById("filters");
            scrollIntoView(element, {
              time: 500,
              align: {
                top: 0,
                topOffset: 200,
              },
            });
          }}
        >
          Скрыть все{" "}
        </ShowAll>
      )}
    </Wrapper>
  );
};

export default Filters;
