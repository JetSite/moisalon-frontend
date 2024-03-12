import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Checkbox,
  FormControlLabel,
  styled as styledMaterial,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CatalogSubGroup from "../CatalogSubGroup";
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
  margin-bottom: 40px;
`;

const Title = styled.h4`
  font-weight: 600;
  font-size: 26px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

export function CatalogGroup({
  group,
  entriesItems,
  setEntriesItems,
  handleDeleteEntries,
  handleAddEntries,
  services,
}) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedLength, setCheckedLength] = useState(0);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < entriesItems?.length; i++) {
      for (let j = 0; j < group?.subGroups?.length; j++) {
        if (entriesItems[i]?.id === group?.subGroups[j]?.id) {
          count++;
          if (group?.subGroups[j]?.items?.length) {
            for (let k = 0; k < group?.subGroups[j]?.items?.length; k++) {
              if (
                entriesItems.find(
                  (item) => item?.id === group?.subGroups[j]?.items[k]?.id
                )
              ) {
                count++;
              }
            }
          }
        }
      }
    }
    setCheckedLength(count);
  }, [entriesItems]);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < group?.subGroups?.length; i++) {
      count++;
      if (group?.subGroups[i]?.items?.length) {
        for (let j = 0; j < group?.subGroups[i]?.items?.length; j++) {
          count++;
        }
      }
    }
    if (checkedLength === count) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkedLength]);

  if (!group?.subGroups) {
    return null;
  }

  const subGroups = group?.subGroups.map((subGroup, idx) => (
    <CatalogSubGroup
      key={idx}
      subGroup={subGroup}
      services={services}
      entriesItems={entriesItems}
      setEntriesItems={setEntriesItems}
    />
  ));

  if (subGroups?.length === 0) {
    return null;
  }

  const visibleItems = subGroups?.slice(0, 3);
  const collapsedItems = subGroups?.slice(3);
  const collapsedText = collapsed ? "Развернуть" : "Скрыть";

  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  const handleCheckAll = () => {
    if (checkAll) {
      handleDeleteEntries(group);
    } else {
      handleAddEntries(group);
    }
  };

  return (
    <Wrapper>
      <Content>
        <FormControlLabel
          label={<Title>{ucFirst(group?.title)}</Title>}
          control={
            <Checkbox
              className={classes.root}
              icon={<BpIcon />}
              checkedIcon={<BpCheckedIcon />}
              checked={checkAll}
              onChange={() => handleCheckAll()}
            />
          }
        />
      </Content>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {subGroups?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  );
}
