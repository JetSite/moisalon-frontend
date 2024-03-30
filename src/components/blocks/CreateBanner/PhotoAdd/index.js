import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import uploadPhoto from '../../../../utils/uploadPhoto'
import { PHOTO_URL } from '../../../../variables'

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
`

const PhotoBack = styled.div`
  width: 100%;
  height: 163px;
  background: rgba(0, 0, 0, 0.5);
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PhotoAdd = ({ onAdd, hover, photoId }) => {
  const photoType = 'master'
  const onDrop = useCallback(
    files => {
      const file = files[0]
      const uploadFile = async () => {
        await uploadPhoto(file, photoType).then(photoId => {
          onAdd(photoId)
        })
      }
      uploadFile()
    },
    [photoType, onAdd],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  })

  const onHoverControls = hover ? (
    <PhotoBack>
      <ChangeText>Изменить фотографию</ChangeText>
    </PhotoBack>
  ) : null
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!photoId ? <Photo /> : null}
        <Image alt="photo" src={`${PHOTO_URL}${photoId}/original`} />
        {onHoverControls}
      </div>
    </>
  )
}

export default PhotoAdd
