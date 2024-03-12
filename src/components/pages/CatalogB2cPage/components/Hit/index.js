import { useState } from "react";
import { Wrapper, Title, Content, WrapButton } from "./styles";
import ProductCard from "../ProductCard";
import Button from "../../../../ui/Button";

const Hit = ({
  goods,
  add,
  deleteItem,
  loadingCart,
  cart
}) => {

  const [slice, setSlice] = useState(6);
  return (
    <Wrapper>
      <Title>Хиты продаж</Title>
      <Content>
        {goods?.connection?.nodes?.length
          ? goods?.connection?.nodes
              .slice(0, slice)
              .map((item) => (
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
      {slice !== 12 ? (
        <WrapButton>
          <Button
            onClick={() => setSlice(12)}
            size="fullWidth"
            variant="withBorder"
          >
            Показать еще
          </Button>
        </WrapButton>
      ) : null}
    </Wrapper>
  );
};

export default Hit;
