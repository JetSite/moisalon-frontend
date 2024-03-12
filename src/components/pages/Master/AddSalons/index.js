import { useContext, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  SearchMainQueryContext,
  EmptySearchQuery,
} from "../../../../searchContext";
import {
  SalonsContent,
  Title,
  ListWrapper,
  SalonItemWrapper,
  Published,
} from "./styled";
import Button from "../../../ui/Button";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import { searchQuery } from "../../../../_graphql-legacy/search/searchQuery";
import { addUserSalonsMutation } from "../../../../_graphql-legacy/master/addUserSalonsMutation";
import { removeUserSalonsMutation } from "../../../../_graphql-legacy/master/removeUserSalonsMutation";
import SalonItem from "../../../blocks/SalonCard";

const AddSalons = ({ master, refetchMaster }) => {
  const [query] = useContext(SearchMainQueryContext);

  const dataSearch = (master && master?.salonIds) || [];

  const [addSalons] = useMutation(addUserSalonsMutation, {
    onCompleted: () => {
      refetchMaster();
    },
  });
  const [removeSalons] = useMutation(removeUserSalonsMutation, {
    onCompleted: () => {
      refetchMaster();
    },
  });

  const querySearch = {
    ...EmptySearchQuery,
    query: (query && query.query) || "",
    city: "",
  };

  const { data, loading, fetchMore } = useQuery(searchQuery, {
    variables: { input: querySearch },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const salonsSearchResult = data?.salonSearch?.salonsConnection;
  const slicedList = salonsSearchResult?.nodes;
  const hasNextPage =
    data?.salonSearch?.salonsConnection?.pageInfo?.hasNextPage;

  const onFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        input: {
          ...EmptySearchQuery,
          ...query,
          city: "",
        },
        cursor: data?.salonSearch?.salonsConnection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.salonSearch.salonsConnection.nodes;
        const pageInfo = fetchMoreResult.salonSearch.salonsConnection.pageInfo;

        return newNodes.length
          ? {
              ...previousResult,
              salonSearch: {
                ...previousResult.salonSearch,
                salonsConnection: {
                  ...previousResult.salonSearch.salonsConnection,
                  pageInfo,
                  nodes: [
                    ...previousResult.salonSearch.salonsConnection.nodes,
                    ...newNodes,
                  ],
                },
              },
            }
          : previousResult;
      },
    });
  });

  const fetchMoreButton = hasNextPage ? (
    <Button
      onClick={onFetchMore}
      variant="withRoundBorder"
      size="roundSmall"
      font="roundMedium"
    >
      Загрузить ещё
    </Button>
  ) : null;

  const handlePublish = useCallback(
    (ev, id, published) => {
      ev.preventDefault();
      if (!published) {
        addSalons({
          variables: {
            ids: [id],
            masterId: master?.id,
          },
        });
      } else {
        removeSalons({
          variables: {
            ids: [id],
            masterId: master?.id,
          },
        });
      }
    },
    [addSalons, removeSalons, master]
  );

  const salonsList = slicedList?.map((item) => {
    return (
      <SalonItemWrapper
        key={item?.salon?.id}
        onClick={(e) =>
          handlePublish(
            e,
            item?.salon?.id,
            dataSearch.find((el) => el === item?.salon?.id)
          )
        }
      >
        <SalonItem item={item?.salon} />
        <Published
          published={dataSearch.find((el) => el === item?.salon?.id)}
        />
      </SalonItemWrapper>
    );
  });

  return (
    <SalonsContent>
      <Title>Добавить салоны</Title>
      <Search />
      {query?.query?.length > 0 ? (
        <>
          <SearchResults
            searchResults={salonsList}
            // dataSearch={dataSearch}
            handlePublish={handlePublish}
          />
          {fetchMoreButton}
        </>
      ) : (
        <>
          <ListWrapper>{salonsList}</ListWrapper>
          {fetchMoreButton}
        </>
      )}
    </SalonsContent>
  );
};

export default AddSalons;
