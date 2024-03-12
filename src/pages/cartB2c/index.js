import React, { useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useQuery } from "@apollo/client";
import ContentFormSkeleton from "../../components/ui/ContentSkeleton/ContentFormSkeleton";
import CartB2c from "../../components/pages/CartB2c";
import { MeContext, ProductsContext } from "../../searchContext";
import { getB2cCart } from "../../_graphql-legacy/cart/getB2cCart";

const CartB2cPage = () => {
  const [productState, setProductsState] = useContext(ProductsContext);
  const [me] = useContext(MeContext);
  const {
    data: dataCart,
    loading: loadingCart,
    refetch: refetchCart,
  } = useQuery(getB2cCart, {
    onCompleted: (res) => {
      setProductsState(res?.getCart?.contents || []);
    },
  });

  const cart = dataCart?.getCart?.contents || [];
  const total = dataCart?.getCart?.total;
  if (loadingCart) {
    return <ContentFormSkeleton me={me} loading={false} />;
  }

  return (
    <MainLayout me={me}>
      <CartB2c total={total} cart={cart} me={me} refetchCart={refetchCart} />
    </MainLayout>
  );
};

export default CartB2cPage;
