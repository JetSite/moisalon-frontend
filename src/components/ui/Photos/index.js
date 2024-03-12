import React from "react";
import styled from "styled-components";

const Item = styled.div`
  background: ${(props) => `${props.backgroundImage} no-repeat center`};
  background-size: cover;
  width: 100%;
  height: 381px;
`;

const ImageDefault = styled.div`
  background: #fff;
  width: 100%;
  height: 381px;
`;

export default function Photos({ photos }) {
  // const photosArray = photos.length && photos[0].map((photo, key) => (
  //   <SwiperSlide style={{ height: "381px" }} key={key}>
  //     <Item backgroundImage={`url(${photo.url})`}></Item>
  //   </SwiperSlide>
  // ));
  const photosArray = photos.length && photos[0] && (
    <Item backgroundImage={`url(${photos[0].url})`}></Item>
  );
  return photos.length ? <>{photosArray}</> : <ImageDefault />;
}
