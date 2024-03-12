import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { SearchMainQueryContext } from "../../../../../searchContext";
import { educationSearch } from "../../../../../_graphql-legacy/education/educationSearch";
import { MobileVisible, MobileHidden } from "../../../../../styles/common";
import { WrapperItems, Title, LinkStyled } from "./styled";
import Button from "../../../../ui/Button";
import { pluralize } from "../../../../../utils/pluralize";
import Education from "../../../../blocks/Education";

const EducationsSearchResults = () => {
  const [query] = useContext(SearchMainQueryContext);
  const [educationsSearchData, setEducationsSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { fetchMore, refetch } = useQuery(educationSearch, {
    variables: {
      query: (query && query.query) || "",
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setLoading(false);
      if (res) {
        setEducationsSearchData(res.educationSearch);
      }
    },
  });

  const educationsSearchResult = educationsSearchData?.connection.nodes || [];
  const hasNextPage = educationsSearchData?.connection?.pageInfo?.hasNextPage;
  const totalCount = educationsSearchData?.connection?.totalCount;

  useEffect(() => {
    if (query?.query && query.query !== "") {
      setLoading(true);
      refetch({
        variables: {
          query: (query && query.query) || "",
          cursor: null,
        },
      });
    } else {
      setEducationsSearchData(educationSearch);
    }
  }, [query]);

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true);
    fetchMore({
      variables: {
        query: (query && query.query) || "",
        cursor: educationsSearchData?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.educationSearch.connection.nodes;
        setFetchMoreLoading(false);
        setEducationsSearchData({
          connection: {
            ...fetchMoreResult.educationSearch.connection,
            nodes: [...educationsSearchData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.educationSearch.filterDefinition,
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
          Показать еще курсы
        </Button>
      </MobileVisible>
    </>
  ) : null;

  return (
    <>
      {educationsSearchResult?.length ? (
        <>
          <Title>
            {`${pluralize(
              totalCount,
              "Найден",
              "Найдено",
              "Найдено"
            )} ${totalCount} ${pluralize(
              totalCount,
              "курс",
              "курса",
              "курсов"
            )}`}
          </Title>
          <WrapperItems>
            {educationsSearchResult?.map((education) => (
              <Link
                href={`/educations/${education?.seo?.slug || education.id}`}
                key={education.id}
              >
                <a>
                  <LinkStyled>
                    <Education
                      id={education.id}
                      title={education.title}
                      amount={education.amount}
                      photoId={education.photoId}
                      dateStart={education.dateStart}
                      dateEnd={education.dateEnd}
                      averageScore={education.averageScore}
                      numberScore={education.numberScore}
                    />
                  </LinkStyled>
                </a>
              </Link>
            ))}
          </WrapperItems>
          {fetchMoreButton}
        </>
      ) : null}
    </>
  );
};

export default EducationsSearchResults;
