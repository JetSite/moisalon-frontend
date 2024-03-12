import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Wrapper,
  Title,
  OrdersList,
  NoOrders,
  ButtonMobileWrap,
} from "./styles";
import Order from "./components/Order";
import Button from "../../../../ui/Button";
import { MobileHidden, MobileVisible } from "../../../../../styles/common";

const CabinetOrders = ({ me }) => {
  const router = useRouter();
  const [sliceNumber, setSliceNumber] = useState(3);

  useEffect(() => {
    if (router.query?.section === "orders") {
      const orderBlock = document.getElementById("orders");
      orderBlock?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, []);

  const sortedOrders = me?.orders?.sort((a, b) => {
    return new Date(b.createAt) - new Date(a.createAt);
  });

  const ordersSliced = sortedOrders?.slice(0, sliceNumber);

  const onFetchMore = () => {
    setSliceNumber(sliceNumber + 3);
  };

  const fetchMoreButton =
    sliceNumber <= me?.orders?.length ? (
      <>
        <MobileHidden>
          <Button
            variant="darkTransparent"
            size="mediumNoPadding"
            mt="74"
            mb="40"
            onClick={onFetchMore}
          >
            Смотреть ранее
          </Button>
        </MobileHidden>
        <MobileVisible>
          <ButtonMobileWrap>
            <Button
              variant="withRoundBorder"
              size="round148"
              font="roundSmall"
              mt="34"
              mb="40"
              onClick={onFetchMore}
            >
              Смотреть ранее
            </Button>
          </ButtonMobileWrap>
        </MobileVisible>
      </>
    ) : null;
  return (
    <Wrapper>
      <Title>Мои заказы</Title>
      {me?.orders?.length ? (
        <>
          <OrdersList>
            {ordersSliced?.map((order) => (
              <Order order={order} me={me} />
            ))}
          </OrdersList>
          {fetchMoreButton}
        </>
      ) : (
        <NoOrders>Нет заказов</NoOrders>
      )}
    </Wrapper>
  );
};

export default CabinetOrders;
