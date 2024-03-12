import React from "react";
import { PortfolioItemBlock, Wrap, DeleteIcon } from "./styles";

const PortfolioItem = ({ isEditing, item, onDelete }) => (
  <Wrap>
    <PortfolioItemBlock item={item} isEditing={isEditing} />
    {isEditing ? <DeleteIcon onClick={() => onDelete(item.id)} /> : null}
  </Wrap>
);

export default PortfolioItem;
