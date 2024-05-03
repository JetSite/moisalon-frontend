import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { getCart } from '../../../_graphql-legacy/cart/getCart'
import { goodSearch } from '../../../_graphql-legacy/goodSearch'
import Catalog from '../Catalog'
import Header from './components/Header'
import { Wrapper, NoProducts } from './styles'
// import FilterCatalog from "../../ui/FilterCatalog";
import useCheckMobileDevice from '../../../hooks/useCheckMobileDevice'

const BeautyFreeShopPage = ({
  brand,
  me,
  dataProductCategories,
  // dataScore,
  // refetchBrand,
  // refetchScore,
  // goods,
}) => {
  const [filter, setFilter] = useState(null)
  // const [goodsData, setGoodsData] = useState(goods?.goodsSearch);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const [refetchLoading, setRefetchLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('Все категории')

  const isMobile = useCheckMobileDevice()

  // const { setChosenItemId } = useSearchHistory(
  //   goodsData,
  //   setGoodsData,
  //   "product",
  //   isMobile ? -10 : -170
  // );

  // const {
  //   data: dataCart,
  //   refetch: refetchCart,
  //   loading: loadingCart,
  // } = useQuery(getCart, {
  //   onCompleted: (res) => {
  //     setProductsState(res?.getCartB2b?.contents || []);
  //   },
  // });

  // const { fetchMore, refetch } = useQuery(goodSearch, {
  //   variables: {
  //     input: {
  //       brandId: [brand.id],
  //       query: "",
  //       isB2b: true,
  //       categoryId:
  //         !filter?.value || filter?.value === "Все категории"
  //           ? null
  //           : [filter?.value],
  //     },
  //   },
  //   skip: true,
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: (res) => {
  //     if (res) {
  //       setRefetchLoading(false);
  //       setGoodsData(res.goodsSearch);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   if (!filter?.value || filter?.value === "Все категории") {
  //     setGoodsData(goods?.goodsSearch);
  //   } else {
  //     setRefetchLoading(true);
  //     refetch();
  //   }
  // }, [filter]);
  // const cart = dataCart?.getCartB2b?.contents || [];

  // const loadMore = useCallback(() => {
  //   setFetchMoreLoading(true);
  //   setChosenItemId("");
  //   fetchMore({
  //     variables: {
  //       cursor: goodsData?.connection?.pageInfo?.endCursor,
  //       input: {
  //         query: "",
  //         brandId: [brand.id],
  //         isB2b: true,
  //         // categoryId:
  //         //   !filter?.value || filter?.value === "Все категории"
  //         //     ? null
  //         //     : [filter?.value],
  //       },
  //     },
  //     updateQuery(previousResult, { fetchMoreResult }) {
  //       const newNodes = fetchMoreResult.goodsSearch.connection.nodes;
  //       setFetchMoreLoading(false);
  //       setGoodsData({
  //         connection: {
  //           ...fetchMoreResult.goodsSearch.connection,
  //           nodes: [...goodsData.connection.nodes, ...newNodes],
  //         },
  //         filterDefinition: fetchMoreResult.goodsSearch.filterDefinition,
  //       });
  //     },
  //   });
  // });

  // const products = goodsData?.connection?.nodes || [];

  const products = []

  return (
    <>
      <Head>
        {brand?.seo?.title ? <title>{brand?.seo?.title}</title> : null}
        {brand?.seo?.description ? (
          <meta name="description" content={brand?.seo?.description} />
        ) : null}
        {brand?.photo?.url ? (
          <meta property="og:image" content={brand?.photo?.url} />
        ) : null}
      </Head>
      <Header
        // refetchBrand={refetchBrand}
        // refetchScore={refetchScore}
        me={me}
        brand={brand}
        // dataScore={dataScore}
      />
      {/* <Wrapper>
        <FilterCatalog
          productCategories={dataProductCategories}
          setFilterProduct={setFilter}
          filterProduct={filter}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </Wrapper> */}
      {brand?.products && !!brand?.products?.length ? (
        <Catalog
          // cart={cart}
          // refetchCart={refetchCart}
          products={brand.products}
          // hasNextPage={goodsData?.connection?.pageInfo?.hasNextPage}
          // fetchMore={loadMore}
          // loading={fetchMoreLoading}
          // loadingCart={loadingCart}
          // refetchLoading={refetchLoading}
          noTitle
          me={me}
          brand={brand}
        />
      ) : (
        <Wrapper>
          <NoProducts>Товары не найдены</NoProducts>
        </Wrapper>
      )}
    </>
  )
}

export default BeautyFreeShopPage
