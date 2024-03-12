import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Checkbox,
  FormControlLabel,
  styled as styledMaterial,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CatalogItem from "../CatalogItem";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

export const BpIcon = styledMaterial("span")(() => ({
  borderRadius: 3,
  width: 23,
  height: 23,
  backgroundColor: "#fff",
  border: "1px solid #E3E3E3",
  "&:hover": { bgcolor: "transparent" },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
}));

export const BpCheckedIcon = styledMaterial(BpIcon)({
  backgroundColor: "#E3E3E3",
  border: "1px solid #E3E3E3",
  "&:before": {
    display: "block",
    width: 23,
    height: 19,
    background: "url(/icon-check.svg) no-repeat center",
    content: '""',
  },
});

export const Input = styledMaterial(TextField)({
  width: laptopBreakpoint ? 70 : 100,
});

const useStyles = makeStyles({
  root: {
    paddingBottom: 0,
    paddingTop: 0,
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
});

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  flex-shrink: 0;
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

const Price = styled.p`
  font-weight: 400;
  font-size: 18px;
`;

const ShowMore = styled.span`
  display: block;
  width: fit-content;
  margin-top: 10px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }
`;

const Item = styled.div``;

const ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export default function CatalogSubGroup({
  subGroup,
  entriesItems,
  setEntriesItems,
  services,
}) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(true);
  const [checkSubGroup, setCheckSubGroup] = useState(false);
  const [checkedLength, setCheckedLength] = useState(0);
  const item = entriesItems?.find((item) => item?.id === subGroup?.id);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < entriesItems.length; i++) {
      for (let j = 0; j < subGroup?.items?.length; j++) {
        if (entriesItems[i].id === subGroup?.items[j].id) {
          count++;
        }
      }
    }
    setCheckedLength(count);
  }, []);

  useEffect(() => {
    if (entriesItems?.find((el) => el?.id === subGroup?.id)) {
      setCheckSubGroup(true);
    } else {
      setCheckSubGroup(false);
    }
  }, [entriesItems]);

  useEffect(() => {
    if (checkedLength > 0) {
      if (!entriesItems?.find((el) => el.id === subGroup?.id)) {
        const service = services?.find((el) => el?.id === subGroup?.id);
        const newItem = {
          id: subGroup?.id,
          price: service?.price || item?.price || 0,
        };
        setEntriesItems([...entriesItems, newItem]);
      }
      setCheckSubGroup(true);
    }
  }, [checkedLength]);

  const mapped = subGroup?.items?.map((item, idx) => (
    <CatalogItem
      checkedLength={checkedLength}
      setCheckedLength={setCheckedLength}
      setEntriesItems={setEntriesItems}
      entriesItems={entriesItems}
      key={idx}
      item={item}
      services={services}
      checkSubGroup={checkSubGroup}
    />
  ));

  if (mapped?.length === 0) {
    return null;
  }

  const visibleItems = mapped?.slice(0, 3);
  const collapsedItems = mapped?.slice(3);
  const collapsedText = collapsed ? "Показать все" : "Скрыть";

  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  const handleCheckSubGroup = () => {
    if (entriesItems?.find((el) => el.id === subGroup?.id)) {
      let newItems = entriesItems?.filter((entry) => entry.id !== subGroup?.id);
      setEntriesItems(newItems);
      if (subGroup?.items?.length) {
        for (let i = 0; i < subGroup?.items?.length; i++) {
          newItems = newItems?.filter(
            (entry) => entry.id !== subGroup?.items[i]?.id
          );
        }
        setEntriesItems(newItems);
      }
    } else {
      const service = services?.find((el) => el?.id === subGroup?.id);
      const newItem = {
        id: subGroup?.id,
        price: service?.price || item?.price || 0,
      };
      let newItems = [newItem];
      setEntriesItems([...entriesItems, newItem]);
      if (subGroup?.items?.length) {
        for (let i = 0; i < subGroup?.items?.length; i++) {
          const service = services?.find(
            (el) => el?.id === subGroup?.items[i]?.id
          );
          const newItem = {
            id: subGroup?.items[i]?.id,
            price: service?.price || 0,
          };
          newItems.push(newItem);
        }
        setEntriesItems([...entriesItems, ...newItems]);
      }
    }
  };

  const setHandlePrice = (value) => {
    setEntriesItems(
      entriesItems.map((el) => {
        if (el?.id === item?.id) {
          return {
            id: el?.id,
            price: Number(value),
          };
        } else {
          return el;
        }
      })
    );
  };

  return (
    <Wrapper>
      <Top>
        <Content>
          <FormControlLabel
            label={<Title>{ucFirst(subGroup?.title)}</Title>}
            control={
              <Checkbox
                className={classes.root}
                icon={<BpIcon />}
                checkedIcon={<BpCheckedIcon />}
                checked={checkSubGroup}
                onChange={() => handleCheckSubGroup()}
              />
            }
          />
        </Content>
        {checkSubGroup ? (
          <Input
            id="standard-number"
            label=""
            size="small"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={item?.price || ""}
            onChange={(e) => setHandlePrice(e.target.value)}
          />
        ) : null}
      </Top>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {mapped?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  );
}
