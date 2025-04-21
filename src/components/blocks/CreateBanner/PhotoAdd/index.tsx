import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../styles/variables';
import uploadPhoto from '../../../../utils/uploadPhoto';
import { PHOTO_URL, UPLOAD_PHOTO_OPTIONS } from '../../../../api/variables';
import { IPhoto } from 'src/types';
import imageCompression from 'browser-image-compression';
import { useMutation } from '@apollo/client';
import { UPLOAD } from 'src/api/graphql/common/upload';
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse';
import { ISetState } from 'src/types/common';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

const Photo = styled.div`
  width: 100%;
  height: 163px;
  border: 1px solid #ededed;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #f2f0f0 url('/icon-plus.svg') no-repeat center;
  margin-right: 20px;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 133px;
  }
`;

const PhotoBack = styled.div`
  width: 100%;
  height: 163px;
  background: rgba(0, 0, 0, 0.5);
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const ChangeText = styled.span`
  text-align: center;
  font-size: 12px;
  width: 120px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Image = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export interface IPhotoAddProps {
  hover: boolean;
  photo: IPhoto | null;
  setPhoto: ISetState<IPhoto | null>;
}

const PhotoAdd: FC<IPhotoAddProps> = ({ hover, photo, setPhoto }) => {
  const [uploadImage] = useMutation(UPLOAD);

  const photoType = 'master';
  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const uploadFile = async () => {
        const compressedFile = await imageCompression(
          file,
          UPLOAD_PHOTO_OPTIONS,
        );
        await uploadImage({
          variables: { file: compressedFile },
          onCompleted: data => {
            const photo = flattenStrapiResponse(data.upload.data) as IPhoto;
            setPhoto(photo);
          },
        });
      };
      uploadFile();
    },
    [photoType],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const onHoverControls = hover ? (
    <PhotoBack>
      <ChangeText>Изменить фотографию</ChangeText>
    </PhotoBack>
  ) : null;
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!photo ? <Photo /> : null}
        {photo?.url && <Image alt="photo" src={`${PHOTO_URL}${photo.url}`} />}
        {onHoverControls}
      </div>
    </>
  );
};

export default PhotoAdd;
