import { useState } from "react";
import nameRedact from "../../../../../utils/nameRedact";
import Stars from "../../../../ui/Stars";
import {
  Wrapper,
  Review,
  ReviewTop,
  Name,
  Text,
  Button,
} from "./styled";

const CabinetReviews = ({ reviews }) => {
  const [offset, setOffset] = useState(4);

  return (
    <Wrapper>
      {reviews?.length > 0 ? (
        <>
          {reviews?.slice(0, offset).map((item) => (
            <Review key={item.id}>
              <ReviewTop>
                <Name>{nameRedact(item.name)}</Name>
                <Stars count={5} />
              </ReviewTop>
              <Text>{item.description}</Text>
            </Review>
          ))}
          {reviews?.length > offset ? (
            <Button onClick={() => setOffset(offset + 4)}>
              Смотреть раннее
            </Button>
          ) : null}
        </>
      ) : null}
    </Wrapper>
  );
};

export default CabinetReviews;
