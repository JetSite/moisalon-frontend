import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../../../styles/variables";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Photo = styled.div`
  height: 170px;
  width: 170px;
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  border-radius: 5px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    height: 180px;
  }
`;

const Delete = styled.div`
  background: url("/close-cross-red.svg") no-repeat center;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PhotoItem = ({ photo, onSetDefault, onRemove, onChange, isDefault }) => {
  const { id, url } = photo;
  const [isHover, setHover] = useState("");

  const onDrop = useCallback(
    (files) => {
      onChange(id, files);
    },
    [onChange, id]
  );

  const handleOnRemove = useCallback(
    (ev) => {
      ev.stopPropagation();
      onRemove(id);
    },
    [onRemove, id]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });
  const onHoverControls = isHover ? <Delete onClick={handleOnRemove} /> : null;

  return (
    <Wrapper
      {...getRootProps()}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input {...getInputProps()} />
      <Photo url={url}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          height="0"
          width="0"
          className={"photo__blurSvg"}
        >
          <defs>
            <filter id="blur" x="0" y="0">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
        </svg>
      </Photo>
      {onHoverControls}
    </Wrapper>
  );
};

export default PhotoItem;
