import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { goodSearch } from "../../../../../_graphql-legacy/goodSearch";
import Slider from "../../../../blocks/Slider";
import FastBuyPopup from "../../../../ui/FastBuyPopup";

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const MainGoodsSlider = ({ me }) => {
  let cityInStorage;
  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }
  const [openBuyPopup, setOpenBuyPopup] = useState(false);
  const [product, setProduct] = useState(null);

  const { data, loading } = useQuery(goodSearch, {
    variables: {
      input: {
        brandId: ["62fb9f7884fe720001f6771c"],
        query: "",
      },
    },
  });

  const chooseProductOneClick = (item) => {
    setProduct(item);
    setOpenBuyPopup(true);
  };

  return (
    <>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={product?.product}
        me={me}
      />
      <Wrapper>
        <Slider
          type="goods"
          noScroll
          loading={loading}
          items={data?.goodsSearch?.connection?.nodes || []}
          title="РАСХОДНЫЕ МАТЕРИАЛЫ"
          bgColor="#fff"
          pt={70}
          pb={60}
          noBottom
          noFirstSlide
          noPadding
          pl={20}
          chooseProductOneClick={chooseProductOneClick}
        />
      </Wrapper>
    </>
  );
};

export default MainGoodsSlider;
