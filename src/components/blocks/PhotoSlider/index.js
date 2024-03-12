import { useState } from "react";
import NavigationRomb from "./components/NavigationRomb";
import {
  PhotoWrapper,
  Photo,
  PhotosSliderWrapper,
  PhotosSliderContent,
  Navigation,
} from "./styles";

const PhotoSlider = ({
  items,
  wrapperWidth,
  itemWidth,
  itemHeight,
  itemMarginRight,
}) => {
  const [activeItem, setActiveItem] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const visibleItemsQuantity = Math.round(wrapperWidth / itemWidth);
  const navigationBlocks = Array(
    Math.ceil(items.length / visibleItemsQuantity)
  ).fill(0);
  const isNavigationVisible = navigationBlocks.length > 1;

  const onClickHandler = (itemIndex) => {
    setActiveItem(itemIndex);
    if (itemIndex === 0) {
      setTranslateValue(0);
      return;
    }
    setTranslateValue(itemIndex * (itemWidth * 3) + itemMarginRight * 3);
  };

  return (
    <PhotosSliderWrapper>
      <PhotosSliderContent translateValue={translateValue}>
        {items.map((photo) => (
          <PhotoWrapper
            key={photo.id}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            itemMarginRight={itemMarginRight}
          >
            <Photo src={photo.url} />
          </PhotoWrapper>
        ))}
      </PhotosSliderContent>
      {isNavigationVisible ? (
        <Navigation>
          {navigationBlocks.map((_, index) => (
            <NavigationRomb
              key={index}
              itemIndex={index}
              active={index === activeItem}
              onClick={onClickHandler}
            />
          ))}
        </Navigation>
      ) : null}
    </PhotosSliderWrapper>
  );
};

export default PhotoSlider;
