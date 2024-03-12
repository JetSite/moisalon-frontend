import styled from "styled-components";
import Select from "../../blocks/Form/Select";
import { red, laptopBreakpoint } from "../../../../styles/variables";

export const Wrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 10px;
    margin-bottom: 16px;
    width: 100%;
    flex-direction: column;
  }
`;

export const Filters = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  color: ${(props) => colors[props.variant]};
`;

export const FilterBlock = styled.div``;

export const Filter = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 36px;
  color: inherit;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid;
  border-color: inherit;
  border-radius: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 20px;
    width: 150px;
    font-size: 12px;
  }
`;

export const Category = styled(Filter)`
  margin-right: 23px;
  /* cursor: pointer; */
`;

export const RestFilters = styled(Filter)`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 15px;
    width: 22px;
    height: 25px;
    margin-top: -12px;
    background: ${(props) =>
        props.variant === "white"
          ? "url(/filter-catalog.svg)"
          : "url(/filter-catalog-red.svg)"}
      no-repeat center;
  }
`;

export const FilterItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 30px;
  background: ${({ active, variant }) =>
    active ? activeColors[variant].bg : "transparent"};
  color: ${({ active, variant }) =>
    active ? activeColors[variant].font : colors[variant]};
  border: 1px solid;
  border-color: ${(props) =>
    props.active ? "#e1e1e1" : colors[props.variant]};
  border-radius: 50px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 23px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 20px;
    width: 128px;
    font-size: 12px;
  }
`;

export const ProductFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ProductFilterItem = styled.div`
  cursor: pointer;
  margin-right: 37px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  text-decoration: ${(props) => (props.active ? "underline" : "")};
  transition: 0.3s;
  &:hover {
    color: #f03;
  }
  @media (max-width: ${laptopBreakpoint}) {
    white-space: nowrap;
    margin-right: 17px;
  }
`;

export const BrandFilter = styled.div`
  width: 300px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const SelectStyled = styled(Select)`
  .MuiMenu-paper {
    max-height: 100px;
  }
`;

const colors = {
  black: "#000",
  white: "#fff",
  red: `${red}`,
};

const activeColors = {
  white: {
    bg: "#fff",
    font: "#000",
  },
  black: {
    bg: "#e1e1e1",
    font: "#000",
  },
};
