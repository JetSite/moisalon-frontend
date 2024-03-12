import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";
import uploadPhoto from "../../../../../../utils/uploadPhoto";

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Photo = styled.div`
  width: 175px;
  height: 175px;
  border: 1px solid #ededed;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #f2f0f0 url("/icon-plus.svg") no-repeat center;
  margin-right: 20px;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 158px;
    height: 158px;
  }
`;

const PhotoAdd = ({ onAdd }) => {
  const photoType = "master";

  const onDrop = useCallback(
    (files) => {
      const file = files[0];
      const uploadFile = async () => {
        await uploadPhoto(file, photoType).then((photoId) => {
          onAdd(photoId);
        });
      };
      uploadFile();
    },
    [photoType, onAdd]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <Wrapper>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Photo />
      </div>
    </Wrapper>
  );
};

export default PhotoAdd;
