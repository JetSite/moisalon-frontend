import { useState } from "react";
import RequestItem from "./RequestItem";
import Button from "../../../../../ui/Button";
import { ListWrapper } from "../styles";

const RequestsList = ({ requests, masterSpecializationsCatalog }) => {
  const [sliceNumber, setSliceNumber] = useState(4);
  const slicedList = requests?.slice(0, sliceNumber);

  const onFetchMore = () => {
    setSliceNumber(sliceNumber + 4);
  };

  const fetchMoreButton =
    sliceNumber <= requests?.length ? (
      <Button
        size="round218"
        font="roundMedium"
        variant="withRoundBorder"
        mt="23"
        onClick={onFetchMore}
      >
        Смотреть ранее
      </Button>
    ) : null;

  return (
    <>
      {requests?.length > 0 ? (
        <>
          <ListWrapper>
            {slicedList?.map((req) => (
              <RequestItem
                key={req.id}
                request={req}
                masterSpecializationsCatalog={masterSpecializationsCatalog}
              />
            ))}
          </ListWrapper>
          {fetchMoreButton}
        </>
      ) : null}
    </>
  );
};

export default RequestsList;
