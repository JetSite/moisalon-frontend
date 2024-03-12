import styled from "styled-components";
import { useCallback } from "react";
import { laptopBreakpoint } from "../../../../../styles/variables";

const Input = styled.input`
  margin: 5px;
  background: ${(props) => (!props.check ? "#fff" : "#f03")};
  border: ${(props) => (!props.check ? "1px solid #000000" : "1px solid #f03")};
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  outline: none;
  padding: 9px 55px;
  color: ${(props) => (!props.check ? "#000" : "#fff")};

  @media (max-width: ${laptopBreakpoint}) {
    padding: 6px 23px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`;

const DictionaryItem = ({ item, fields, name, onlyOneChoose }) => {
  const { id, checked, label } = item;
  const onClick = useCallback(() => {
    if (onlyOneChoose) {
      fields.pop();
      fields.push(id);
      return;
    }
    if (checked) {
      const { value = [] } = fields;
      const index = value.indexOf(id);
      if (index > -1) {
        fields.remove(index);
      }
    } else {
      fields.push(id);
    }
  }, [id, fields, checked]);

  return (
    <Input
      check={checked}
      onClick={onClick}
      type="button"
      value={label}
      name={name}
    />
  );
};

export default DictionaryItem;
