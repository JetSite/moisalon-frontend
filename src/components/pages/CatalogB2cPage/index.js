import { useContext } from "react";
import MainLayout from "../../../layouts/MainLayout";
import MobileViewCards from "../../pages/MainPage/components/MobileViewCards";
import SearchBlock from "../../blocks/SearchBlock";
import { useMutation } from "@apollo/react-hooks";
import Banners from "../../pages/Catalog/components/Banners";
import { MobileHidden } from "../../../styles/common";
import { Categories, Category, WrapButton } from "./styles";
import Hit from "./components/Hit";
import Brands from "./components/Brands";
import Sales from "./components/Sales";
import Button from "../../ui/Button";
import Link from "next/link";
import { CityContext, ProductsContext } from "../../../searchContext";
import { addToCartB2cMutation } from "../../../_graphql-legacy/cart/addToB2cCart";
import { getB2cCart } from "../../../_graphql-legacy/cart/getB2cCart";
import { removeItemB2cMutation } from "../../../_graphql-legacy/cart/removeItemB2c";
import { useQuery } from "@apollo/client";
import { cyrToTranslit } from "../../../utils/translit";

const CatalogB2cPage = ({
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
  productCategories,
  goods,
  brandSearchData,
  goodsSales,
  totalSalons,
  totalBrands,
  totalMasters,
  noFilters,
}) => {
  const [productState, setProductsState] = useContext(ProductsContext);
  const [city] = useContext(CityContext);
  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(getB2cCart, {
    onCompleted: (res) => {
      setProductsState(res?.getCart?.contents || []);
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
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: false,
        },
      },
    });
  };

  const deleteItem = (item) => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: false,
        },
      },
    });
  };

  const cart = dataCart?.getCart?.contents || [];

  return (
    <MainLayout>
      <MobileViewCards
        totalSalons={totalSalons}
        totalBrands={totalBrands}
        totalMasters={totalMasters}
      />
      <MobileHidden>
        <SearchBlock title="Найти товар" noFilters={noFilters} />
      </MobileHidden>
      <Categories>
        {productCategories?.slice(0, 8).map((item, i) => (
          <Link
            key={i}
            href={{
              pathname: `/${cyrToTranslit(city)}/beautyFreeShop`,
              query: {
                id: item.id,
                title: item.title,
                type: "product",
              },
            }}
          >
            <Category>{item.title}</Category>
          </Link>
        ))}
      </Categories>
      {bannersByHookWide?.bannersByHookCode?.length ||
      bannersByHookSmall1?.bannersByHookCode?.length ||
      bannersByHookSmall2?.bannersByHookCode?.length ? (
        <Banners
          bannersByHookWide={bannersByHookWide?.bannersByHookCode}
          bannersByHookSmall1={bannersByHookSmall1?.bannersByHookCode}
          bannersByHookSmall2={bannersByHookSmall2?.bannersByHookCode}
        />
      ) : null}
      <Hit
        goods={goods}
        cart={cart}
        add={add}
        loadingCart={loadingCart}
        deleteItem={deleteItem}
      />
      <Sales
        goods={goodsSales}
        cart={cart}
        add={add}
        loadingCart={loadingCart}
        deleteItem={deleteItem}
      />
      <Brands brandSearchData={brandSearchData} />
      <WrapButton>
        <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
          <Button size="noWidth" variant="red">
            Посмотреть все товары
          </Button>
        </Link>
      </WrapButton>
    </MainLayout>
  );
};

export default CatalogB2cPage;
