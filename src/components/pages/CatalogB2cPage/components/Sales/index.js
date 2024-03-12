import { useState, useCallback } from "react";
import { Wrapper, Title, Content, WrapButton } from "./styles";
import ProductCard from "../ProductCard";
import Button from "../../../../ui/Button";
import { goodSearch } from "../../../../../_graphql-legacy/goodSearch";
import { useQuery } from "@apollo/client";

const Sales = ({ goods, add, deleteItem, loadingCart, cart }) => {
  const [dataGoods, setDataGoods] = useState(goods);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { fetchMore } = useQuery(goodSearch, {
    variables: {
      input: {
        query: "",
        sales: true,
      },
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
  });

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true);
    fetchMore({
      variables: {
        cursor: dataGoods?.connection?.pageInfo?.endCursor,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.goodsSearch.connection.nodes;
        setFetchMoreLoading(false);
        setDataGoods({
          connection: {
            ...fetchMoreResult.goodsSearch.connection,
            nodes: [...dataGoods.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.goodsSearch.filterDefinition,
        });
      },
    });
  });

  return (
    <Wrapper>
      <Title>% Sale</Title>
      <Content>
        {dataGoods?.connection?.nodes?.length
          ? dataGoods?.connection?.nodes.map((item) => (
              <ProductCard
                add={add}
                cart={cart}
                loadingCart={loadingCart}
                deleteItem={deleteItem}
                key={item.id}
                item={item}
              />
            ))
          : null}
      </Content>
      {dataGoods?.connection?.pageInfo?.hasNextPage ? (
        <WrapButton>
          <Button
            onClick={onFetchMore}
            size="fullWidth"
            variant="withBorder"
            disabled={fetchMoreLoading}
          >
            Показать еще
          </Button>
        </WrapButton>
      ) : null}
    </Wrapper>
  );
};

export default Sales;
