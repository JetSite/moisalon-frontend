import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

const Item = styled.div`
  position: relative;
  margin-bottom: 26px;
`;

const DeleteWrap = styled.div`
  margin: 0;
  display: block;
  width: 28px;
  height: 28px;
  position: absolute;
  right: -46px;
  top: 24px;
  cursor: pointer;
  &:hover {
    &:after,
    &:before {
      background-color: gray;
    }
  }
  &:after,
  &:before {
    position: absolute;
    top: 50%;
    content: "";
    display: block;
    width: 24px;
    height: 2px;
    background-color: gray;
  }
  &:after {
    transform: translateY(-50%) rotate(45deg);
  }
  &:before {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

const Delete = styled.div`
  width: 28px;
  height: 28px;
`;

const ArrayItem = (props) => {
  const {
    remove,
    index,
    fieldComponent: FieldComponent,
    isLast,
    pristine = true,
    title = "",
    ...rest
  } = props;
  const textInput = useRef();

  const onRemove = useCallback(() => {
    remove(index);
  }, [remove, index]);

  useEffect(() => {
    if (isLast && !pristine) {
      // textInput.current.focus();
    }
  }, [isLast, pristine]);

  return (
    <Item>
      <FieldComponent {...rest} ref={textInput} />
      {index > 0 && (
        <DeleteWrap title={`Удалить ${title}`}>
          <Delete onClick={onRemove} />
        </DeleteWrap>
      )}
    </Item>
  );
};

export default ArrayItem;
