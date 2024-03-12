import styled from "styled-components";
import Link from "next/link";
import React, { useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import { CityContext, MeContext } from "../../searchContext";
import Button from "../../components/ui/Button";
import { cyrToTranslit } from "../../utils/translit";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`;

const Wrap = styled.div`
  margin-bottom: 50px;
`;

const CartPage = () => {
  const [me] = useContext(MeContext);
  const [city] = useContext(CityContext);

  return (
    <MainLayout me={me}>
      <Wrapper>
        <Wrap>
          <Link href={`/cartB2b`}>
            <Button variant="red">B2B корзина</Button>
          </Link>
        </Wrap>
        <Link href="/cartB2c">
          <Button variant="red">B2C корзина</Button>
        </Link>
      </Wrapper>
    </MainLayout>
  );
};

export default CartPage;
