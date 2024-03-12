import React from "react";
import {
  Wrapper,
  DescriptionImageWrap,
  DescriptionImage,
  DescriptionText,
} from "./styles";
import Button from "../../ui/Button";

const CategoryDescription = () => {
  return (
    <Wrapper>
      <DescriptionImageWrap>
        <DescriptionImage src="/masterpage-description-image.png" />
      </DescriptionImageWrap>
      <DescriptionText>
        Мы собрали лучших специалистов в области красоты и здоровья, чтобы вам
        стало проще найти своего мастера.
      </DescriptionText>
      <Button size="smallWithHeight" font="medium">
        Заявить о себе
      </Button>
    </Wrapper>
  );
};

export default CategoryDescription;
