import React from "react";
import { MainContainer } from "../../../../../styles/common";
import { WrapperResults } from "./styled";
import MastersSearchResults from "./MastersSearchResults";
import BrandsSearchResults from "./BrandsSearchResults";
import SalonsSearchResults from "./SalonsSearchResults";
import SalesSearchResults from "./SalesSearchResults";
import EducationsSearchResults from "./EducationsSearchResults";
import EventsSearchResults from "./EventsSearchResults";
import VacanciesSearchResults from "./VacanciesSearchResults";

const SearchResults = ({ me }) => {
  return (
    <MainContainer>
      <WrapperResults>
        <MastersSearchResults />
        <BrandsSearchResults />
        <SalonsSearchResults me={me} view="list" main />
        <SalesSearchResults />
        <EducationsSearchResults />
        <EventsSearchResults />
        <VacanciesSearchResults />
      </WrapperResults>
    </MainContainer>
  );
};

export default SearchResults;
