import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "../../../../layouts/MainLayout";
import { brandQuery } from "../../../../_graphql-legacy/brand/brandQuery";
import { brandSlugQuery } from "../../../../_graphql-legacy/brand/brandSlugQuery";
import { scoreBrand } from "../../../../_graphql-legacy/brand/scoreBrand";
import { masterIdsQuery } from "../../../../_graphql-legacy/brand/masterIdsQuery";
import { salonIdsQuery } from "../../../../_graphql-legacy/brand/salonIdsQuery";
import { addApolloState, initializeApollo } from "../../../../../apollo-client";
import SearchBlock from "../../../../components/blocks/SearchBlock";
import Header from "../../../../components/pages/Brand/ViewBrand/components/Header";
import TabsSlider from "../../../../components/ui/TabsSlider";
import About from "../../../../components/pages/Brand/ViewBrand/components/About";
import { goodSearch } from "../../../../_graphql-legacy/goodSearch";
import { reviewsForBrand } from "../../../../_graphql-legacy/brand/reviewsForBrand";
import Contacts from "../../../../components/pages/Brand/ViewBrand/components/Contacts";
import BrandReviews from "../../../../components/pages/Brand/ViewBrand/components/BrandReviews";
import InviteBrand from "../../../../components/pages/Brand/ViewBrand/components/Invite";
import Line from "../../../../components/pages/MainPage/components/Line";
import catalogOrDefault from "../../../../utils/catalogOrDefault";
import { userBrandsQuery } from "../../../../_graphql-legacy/brand/userBrandsQuery";
import { useQuery, useMutation } from "@apollo/client";
import {
  CatalogsContext,
  MeContext,
  ProductsContext,
} from "../../../../searchContext";
import { brandsRandomQuery } from "../../../../_graphql-legacy/brand/brandSearchRandom";
import { citySuggestionsQuery } from "../../../../_graphql-legacy/city/citySuggestionsQuery";
import { getCart } from "../../../../_graphql-legacy/cart/getCart";
import { removeItemB2cMutation } from "../../../../_graphql-legacy/cart/removeItemB2c";
import Slider from "../../../../components/blocks/Slider";
import { addToCartB2cMutation } from "../../../../_graphql-legacy/cart/addToB2cCart";
import { useSearchHistoryContext } from "../../../../searchHistoryContext";

const Brand = ({
  brandData,
  dataReviews,
  goods,
  dataScoreRes,
  mastersBrand,
  salonsBrand,
}) => {
  const [brand, setBrand] = useState(brandData);
  const [dataScore, setDataScore] = useState(dataScoreRes);
  const [reviews, setReviews] = useState(dataReviews);
  const [me, setMe] = useContext(MeContext);
  const catalogs = useContext(CatalogsContext);
  const [productState, setProductsState] = useContext(ProductsContext);
  const b2bClient = !!me?.master?.id || !!me?.salons?.length;
  const { setChosenItemId } = useSearchHistoryContext();

  useEffect(() => {
    setChosenItemId(brand.id);
  }, []);

  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(getCart, {
    onCompleted: (res) => {
      setProductsState(res?.getCartB2b?.contents || []);
    },
  });

  const [addToCart] = useMutation(addToCartB2cMutation, {
    onCompleted: () => {
      refetchCart();
    },
  });

  const [removeItem] = useMutation(removeItemB2cMutation, {
    onCompleted: () => {
      refetchCart();
    },
  });

  const add = (item, quantity) => {
    if (!b2bClient) {
      // setOpenPopup(true);
      // return;
    }
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: true,
        },
      },
    });
  };

  const deleteItem = (item) => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: true,
        },
      },
    });
  };

  const { data, loading, refetch } = useQuery(brandsRandomQuery, {
    variables: { count: 10 },
  });

  useEffect(() => {
    setBrand(brandData);
    setReviews(dataReviews);
    setDataScore(dataScoreRes);
    refetch();
  }, [brandData, dataReviews, dataScoreRes]);

  const { refetch: refetchBrand } = useQuery(brandQuery, {
    variables: { id: brand.id },
    skip: true,
    onCompleted: (res) => {
      setBrand(res.brand);
    },
  });

  const { data: userBrands } = useQuery(userBrandsQuery);

  const { refetch: refetchReviews } = useQuery(reviewsForBrand, {
    variables: { originId: brand.id },
    skip: true,
    onCompleted: (res) => {
      setReviews(res.reviewsForBrand);
    },
  });

  const { refetch: refetchScore, loading: loadingScore } = useQuery(
    scoreBrand,
    {
      variables: { id: brand.id },
      onCompleted: (res) => {
        setDataScore(res.scoreBrand);
      },
    }
  );

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog
  );

  const [activeTab, setActiveTab] = useState(0);
  const [edit, setEdit] = useState(false);

  const isOwner = userBrands?.userBrands?.find((item) => item.id === brand.id);
  return (
    <MainLayout>
      <Head>
        {brand?.seo?.title ? <title>{brand?.seo?.title}</title> : null}
        {brand?.seo?.description ? (
          <meta name="description" content={brand?.seo?.description} />
        ) : null}
        {brand?.photo?.url ? (
          <meta property="og:image" content={brand?.photo?.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <Header
          brand={brand}
          me={me}
          isOwner={isOwner}
          refetchBrand={refetchBrand}
          refetchScore={refetchScore}
          scoreBrandCount={dataScore?.value}
          loadingScore={loadingScore}
        />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          noPadding
          tabs={[
            { id: 1, text: "О бренде", link: "#about", show: true },
            {
              id: 2,
              text: "Продукция",
              link: "#goods",
              count: goods?.length,
              show: goods?.length,
            },
            {
              id: 5,
              text: "Мастера",
              link: "#masters",
              count: brand?.mastersIds?.length,
              show: brand?.mastersIds?.length,
            },
            {
              id: 6,
              text: "Салоны",
              link: "#salons",
              count: brand?.salonIds?.length,
              show: brand?.salonIds?.length,
            },
            {
              id: 3,
              text: "Контакты",
              link: "#contacts",
              show: true,
            },
            {
              id: 7,
              text: "Отзывы",
              link: "#reviews",
              count: dataReviews?.length,
              show: true,
            },
          ]}
        />
        <About brand={brand} />
        {goods?.length ? (
          <Slider
            type="goods"
            typeObject={brand}
            title="Продукция"
            isOwner={isOwner}
            edit={edit}
            setEdit={setEdit}
            items={goods || []}
            addProductToCart={add}
            deleteItemFromCart={deleteItem}
            cart={productState}
            loadingCart={loadingCart}
            pt={102}
            pb={91}
            noBottom
            noAllButton
          />
        ) : null}
        {brand.mastersIds && brand.mastersIds.length ? (
          <Slider
            type="masters"
            items={mastersBrand}
            title={`Мастера бренда ${brand.name}`}
            catalog={masterSpecializationsCatalog}
            bgColor="#f2f0f0"
            isOwner={isOwner}
            edit={edit}
            setEdit={setEdit}
            pt={102}
            pb={91}
            noBottom
            noAll
            noAllButton
          />
        ) : null}

        {brand.salonIds && brand.salonIds.length ? (
          <Slider
            type="salons"
            items={salonsBrand}
            title="Салоны"
            pt={102}
            pb={91}
            noBottom
            noAll
            noAllButton
          />
        ) : null}
        <Contacts
          address={brand.address}
          addressFull={brand?.addressFull}
          email={brand.email}
          phone={brand.phone.phoneNumber}
          title={"Контакты"}
        />
        <BrandReviews
          refetchReviews={refetchReviews}
          brandId={brand?.id}
          me={me}
          data={reviews}
        />
        <InviteBrand me={me} />
        <Line text="Для просмотра оптовых цен, войдите или зарегистрируйтесь!" />
        <Slider
          type="brands"
          title="Другие бренды"
          noBottom
          noAllButton
          items={data?.brandsRandom || []}
          loading={loading}
          pt={102}
          pb={91}
        />
      </>
    </MainLayout>
  );
};

export async function getServerSideProps({ params, query }) {
  const apolloClient = initializeApollo();
  const brandQueryRes = await apolloClient.query({
    query: brandSlugQuery,
    variables: { slug: params.id },
  });

  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: query?.city || "",
      count: 1,
    },
  });

  const id = brandQueryRes?.data?.brandSlug?.id;

  const brand = brandQueryRes?.data?.brandSlug;

  if (!id || !city?.data?.citySuggestions[0]?.data?.city) {
    return {
      notFound: true,
    };
  }

  const data = await Promise.all([
    apolloClient.query({
      query: reviewsForBrand,
      variables: {
        originId: id,
      },
    }),
    apolloClient.query({
      query: goodSearch,
      variables: {
        input: {
          brandId: [id],
          query: "",
          isB2b: true,
        },
      },
    }),
    apolloClient.query({
      query: scoreBrand,
      variables: {
        id: brand?.id,
      },
    }),
    apolloClient.query({
      query: masterIdsQuery,
      variables: {
        ids: brand?.mastersIds,
      },
    }),
    apolloClient.query({
      query: salonIdsQuery,
      variables: {
        ids: brand?.salonIds,
      },
    }),
  ]);

  return addApolloState(apolloClient, {
    props: {
      brandData: brand,
      dataReviews: data[0]?.data?.reviewsForBrand,
      goods: data[1]?.data?.goodsSearch?.connection?.nodes,
      dataScoreRes: data[2]?.data,
      mastersBrand: data[3]?.data?.masters,
      salonsBrand: data[4]?.data?.salonsList,
    },
  });
}

export default Brand;
