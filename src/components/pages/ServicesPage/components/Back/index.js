import { Wrapper, Text } from "./styles";

const Back = ({
  clickedGroup,
  clickedSubgroup,
  clickedItem,
  setSubgroups,
  setItems,
  setClickedGroup,
  setClickedSubgroup,
  setClickedItem,
}) => {
  return (
    <Wrapper>
      {clickedGroup ? (
        <>
          {clickedGroup ? (
            <>
              <Text
                onClick={() => {
                  setClickedGroup(null);
                  setClickedSubgroup(null);
                  setClickedItem(null);
                  setSubgroups(null);
                  setItems(null);
                }}
              >
                Услуги –&nbsp;
              </Text>
              <Text
                onClick={() => {
                  setClickedSubgroup(null);
                  setClickedItem(null);
                  setItems(null);
                }}
              >
                {clickedGroup[0].title}
              </Text>
            </>
          ) : null}
          {clickedSubgroup ? (
            <Text
              onClick={() => {
                setClickedItem(null);
              }}
            >
              &nbsp;{`– ${clickedSubgroup[0].title}`}
            </Text>
          ) : null}
          {clickedItem ? (
            <Text>&nbsp;{` – ${clickedItem[0].title}`}</Text>
          ) : null}
        </>
      ) : null}{" "}
    </Wrapper>
  );
};

export default Back;
