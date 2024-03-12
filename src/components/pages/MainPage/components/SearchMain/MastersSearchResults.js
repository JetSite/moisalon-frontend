import React, { useCallback, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import {
  CatalogsContext,
  CityContext,
  MeContext,
  SearchMainQueryContext,
} from "../../../../../searchContext";
import { masterSearchQuery } from "../../../../../_graphql-legacy/search/masterSearch";
import { pluralize } from "../../../../../utils/pluralize";
import { MobileVisible, MobileHidden } from "../../../../../styles/common";
import {
  WrapperResults,
  WrapperItemsMasters,
  Title,
  LinkStyled,
  Checkbox,
  Label,
} from "./styled";
import Button from "../../../../ui/Button";
import FilterSearchResults from "../../../../blocks/FilterSearchResults";
import catalogOrDefault from "../../../../../utils/catalogOrDefault";
import MasterItem from "../../../../blocks/MasterCard";
import { cyrToTranslit } from "../../../../../utils/translit";
import { useHistory } from "../../../../../historyContext";
import { useSearchHistory } from "../../../../../hooks/useSearchHistory";
import useCheckMobileDevice from "../../../../../hooks/useCheckMobileDevice";

const MastersSearchResults = ({ masterSearch }) => {
  const [query] = useContext(SearchMainQueryContext);
  const [masterSearchData, setMasterSearchData] = useState(masterSearch);
  const [loading, setLoading] = useState(false);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const catalogs = useContext(CatalogsContext);
  const [city] = useContext(CityContext);
  const [me] = useContext(MeContext);
  const [resumeFilter, setResumeFilter] = useState(null);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [sortProperty, setSortProperty] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const { history } = useHistory();

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog
  );

  const { fetchMore, refetch } = useQuery(masterSearchQuery, {
    variables: {
      input: {
        query: (query && query.query) || "",
        searchWork: resumeFilter,
        city: city ? city : "Москва",
        sortOrder: sortOrder || undefined,
        sortProperty: sortProperty || undefined,
      },
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setLoading(false);
      if (res) {
        setMasterSearchData(res.masterSearch);
      }
    },
  });

  const mastersSearchResult = masterSearchData?.connection.nodes || [];
  const hasNextPage = masterSearchData?.connection?.pageInfo?.hasNextPage;
  const totalCount = masterSearchData?.connection?.totalCount;

  useEffect(() => {
    if (!loadingFirst) {
      if (sortProperty || query?.query) {
        setLoading(true);
        setChosenItemId("");
        refetch({
          input: {
            query: (query && query.query) || "",
            cursor: null,
            searchWork: resumeFilter,
            city: city ? city : "Москва",
            sortOrder: sortOrder || undefined,
            sortProperty: sortProperty || undefined,
          },
        });
      }
    } else {
      setLoadingFirst(false);
    }
  }, [query, resumeFilter, sortOrder, sortProperty]);

  const isMobile = useCheckMobileDevice();

  const { setChosenItemId } = useSearchHistory(
    masterSearchData,
    setMasterSearchData,
    "master",
    isMobile ? -10 : -120
  );

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true);
    setChosenItemId("");
    fetchMore({
      variables: {
        query: (query && query.query) || "",
        city: city ? city : "Москва",
        cursor: masterSearchData?.connection?.pageInfo?.endCursor,
        sortOrder: sortOrder || undefined,
        sortProperty: sortProperty || undefined,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.masterSearch.connection.nodes;
        setFetchMoreLoading(false);
        setMasterSearchData({
          connection: {
            ...fetchMoreResult.masterSearch.connection,
            nodes: [...masterSearchData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.masterSearch.filterDefinition,
        });
      },
    });
  });

  const fetchMoreButton = hasNextPage ? (
    <>
      <MobileHidden>
        <Button
          onClick={onFetchMore}
          size="medium"
          variant="darkTransparent"
          mb="55"
          disabled={fetchMoreLoading}
        >
          Показать еще
        </Button>
      </MobileHidden>
      <MobileVisible>
        <Button
          size="roundSmall"
          variant="withRoundBorder"
          font="roundSmall"
          mb="56"
          onClick={onFetchMore}
          disabled={fetchMoreLoading}
        >
          Показать еще мастеров
        </Button>
      </MobileVisible>
    </>
  ) : null;

  return (
    <>
      <>
        <Title>
          {`${pluralize(totalCount, "Найден", "Найдено", "Найдено")} ${
            totalCount || 0
          } ${pluralize(totalCount || 0, "мастер", "мастера", "мастеров")}`}
        </Title>
        {mastersSearchResult?.length > 0 && (
          <FilterSearchResults
            sortProperty={sortProperty}
            setSortProperty={setSortProperty}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            master
          />
        )}
        {me?.salons?.length > 0 ? (
          <>
            <Checkbox checked={resumeFilter} id="resume" />
            <Label
              onClick={() => setResumeFilter(resumeFilter ? null : true)}
              for="resume"
            >
              Найти резюме
            </Label>
          </>
        ) : null}
        <WrapperItemsMasters>
          {mastersSearchResult?.map((master) => (
            <Link
              href={`/${cyrToTranslit(
                master?.addressFull?.city || city
              )}/master/${master?.seo?.slug || master?.id}`}
              key={master.id}
            >
              <LinkStyled>
                <MasterItem
                  loading={loading}
                  master={master}
                  catalog={masterSpecializationsCatalog}
                  shareLink={`https://moi.salon/${cyrToTranslit(
                    master?.addressFull?.city || city
                  )}/master/${master?.seo?.slug || master?.id}`}
                  type="search-page"
                />
              </LinkStyled>
            </Link>
          ))}
        </WrapperItemsMasters>
        {fetchMoreButton}
      </>
    </>
  );
};

export default MastersSearchResults;
