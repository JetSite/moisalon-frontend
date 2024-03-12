import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "15px",
    height: "40px",
  },
  delete: {
    background: `url('/close-cross-red.svg') no-repeat center`,
    width: 15,
    height: 15,
    position: "absolute",
    top: 10,
    right: 10,
  },
}));

const PhotoItem = ({ photo, onSetDefault, onRemove, onChange, isDefault }) => {
  const { id, url } = photo;
  const [isHover, setHover] = useState("");
  const classes = useStyles();

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
  const onHoverControls = isHover ? (
    <div className={classes.delete} onClick={handleOnRemove} />
  ) : null;

  return (
    <div
      style={{ cursor: "pointer", position: "relative" }}
      {...getRootProps()}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input {...getInputProps()} />
      <div
        style={{
          backgroundSize: "contain",
          height: 100,
          width: 100,
          backgroundImage: `url(${url})`,
        }}
      >
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
      </div>
      {onHoverControls}
    </div>
  );
};

export default PhotoItem;
