import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import uploadPhoto from '../../../../../../../../utils/uploadPhoto'
import { PHOTO_URL } from '../../../../../../../../variables'

const Wrapper = styled.div`
  position: relative;
`

const Photo = styled.div`
  width: 325px;
  height: 220px;
  border: 1px solid #ededed;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ defaultPhoto }) =>
      defaultPhoto
        ? `url(${PHOTO_URL}${defaultPhoto}/original) center / cover`
        : `#f2f0f0 url("/icon-plus.svg") center`}
    no-repeat;

  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    height: 200px;
  }
`

const ChangeText = styled.span`
  text-align: center;
  font-size: 12px;
  width: 120px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const PhotoBack = styled.div`
  width: 325px;
  height: 220px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    height: 200px;
  }
`

const PhotoAdd = ({ defaultPhoto, setDefaultPhoto }) => {
  const [isHover, setHover] = useState(false)
  const photoType = 'salonPhoto'

  const onDrop = useCallback(
    files => {
      const file = files[0]
      const uploadFile = async () => {
        await uploadPhoto(file, photoType).then(photoId => {
          if (photoId) {
            setDefaultPhoto(photoId)
          }
        })
      }
      uploadFile()
    },
    [photoType],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  })

  return (
    <div
      {...getRootProps()}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input {...getInputProps()} />
      <Wrapper>
        <Photo defaultPhoto={defaultPhoto} />
        {isHover && defaultPhoto ? (
          <PhotoBack>
            <ChangeText>Изменить фотографию</ChangeText>
          </PhotoBack>
        ) : null}
      </Wrapper>
    </div>
  )
}

export default PhotoAdd
