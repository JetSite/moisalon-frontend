import { useQuery } from "@apollo/client";
import { goodQuery } from "../../../../_graphql-legacy/goodQuery";
import parseToFloat from "../../../../utils/parseToFloat";

import {
  ItemChecked,
  Image,
  ItemCheckedRight,
  Name,
  Bottom,
  Price,
  Quantity,
} from "../styles";

const RepeatOrderProduct = ({ product }) => {
  const { data, loading } = useQuery(goodQuery, {
    variables: { id: product.id },
    context: { clientName: "goods" },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const link = data?.product?.image?.sourceUrl;
  return (
    <ItemChecked>
      <Image>
        <img src={link || "/cosmetic_placeholder.jpg"} alt="logo" />
      </Image>
      <ItemCheckedRight>
        <Name>{data?.product?.name}</Name>
        <Bottom>
          <Price>{`${parseToFloat(
            data?.product?.price
          ).toLocaleString()} ₽`}</Price>
          <Quantity>{product?.count} шт.</Quantity>
        </Bottom>
      </ItemCheckedRight>
    </ItemChecked>
  );
};

export default RepeatOrderProduct;
