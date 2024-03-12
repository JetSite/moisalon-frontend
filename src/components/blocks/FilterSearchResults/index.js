import React from "react";
import {
  Wrapper,
  FilterItem,
  FilterArrowWrap,
  FilterArrow,
  Text,
  FilterWrap,
  Wrap,
  TextFilter,
} from "./styles";

const filters = ["по рейтингу", "по отзывам"];
const typesFilter = {
  RATING: "по рейтингу",
  AVERAGESCORE: "по отзывам",
};
const typesFilterProp = {
  "по рейтингу": "RATING",
  "по отзывам": "AVERAGESCORE",
};

const FilterSearchResults = ({
  view = "list",
  setView,
  salon = false,
  main,
  sortProperty = () => {},
  setSortProperty = () => {},
  sortOrder = null,
  setSortOrder = null,
  master = false,
}) => {
  const handleFilter = (filter) => {
    if (typesFilter[sortProperty] === filter && sortOrder === "ASCENDING") {
      setSortProperty(null);
      setSortOrder(null);
      return;
    }
    setSortProperty(typesFilterProp[filter]);
    if (typesFilter[sortProperty] !== filter) {
      setSortOrder("DESCENDING");
      return;
    }
    if (!sortOrder) {
      setSortOrder("DESCENDING");
    }
    if (sortOrder === "DESCENDING") {
      setSortOrder("ASCENDING");
    }
    if (sortOrder === "ASCENDING") {
      setSortOrder("DESCENDING");
    }
  };

  return (
    <Wrapper view={view}>
      {view === "list" ? (
        <Wrap>
          {filters.map((filter, i) => (
            <FilterItem
              onClick={master || salon ? () => handleFilter(filter) : null}
              salon={salon}
              active={filter === typesFilter[sortProperty]}
              key={i}
            >
              <Text active={filter === typesFilter[sortProperty]}>
                {filter}
              </Text>
              <FilterArrowWrap
                active={
                  sortOrder === "ASCENDING" &&
                  filter === typesFilter[sortProperty]
                }
              >
                <FilterArrow src="/filter-arrow.png" />
              </FilterArrowWrap>
            </FilterItem>
          ))}
        </Wrap>
      ) : null}
      {salon && !main ? (
        <FilterWrap active={view === "list"}>
          <TextFilter onClick={() => setView("list")} active={view === "list"}>
            Список
          </TextFilter>
          <TextFilter onClick={() => setView("map")} active={view === "map"}>
            На карте
          </TextFilter>
        </FilterWrap>
      ) : null}
    </Wrapper>
  );
};

export default FilterSearchResults;
