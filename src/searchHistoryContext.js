import { useState, useContext, createContext, useMemo } from "react";

const SearchHistoryContext = createContext(null);

const SearchHistory = () => {
  const [searchData, setSearchData] = useState();
  const [chosenItemId, setChosenItemId] = useState();

  const searchHistoryContext = useMemo(
    () => ({
      searchData,
      setSearchData,
      chosenItemId,
      setChosenItemId,
    }),
    [searchData, setSearchData, chosenItemId, setChosenItemId]
  );
  return searchHistoryContext;
};

export const useSearchHistoryContext = () => {
  return useContext(SearchHistoryContext);
};

export const SearchHistoryProvider = ({ children }) => {
  const searchHistoryContext = SearchHistory();

  return (
    <SearchHistoryContext.Provider value={searchHistoryContext}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
