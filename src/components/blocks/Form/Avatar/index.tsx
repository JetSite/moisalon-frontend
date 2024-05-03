import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import uploadPhoto from '../../../../utils/uploadPhoto'
import { red as redColor, laptopBreakpoint } from '../../../../styles/variables'
import { IID } from 'src/types/common'

const Wrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    width: 92px;
    height: 92px;
  }
`

const Empty = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 1px solid #e3e3e3;
  position: relative;
  background: url('/empty-photo.svg') no-repeat bottom;

  @media (max-width: ${laptopBreakpoint}) {
    width: 92px;
    height: 92px;
    background-size: contain;
  }
`

const LogoText = styled.div<{ noPhotoError: boolean }>`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-weight: 600;
  font-size: 20px;
  color: #bebebe;
  border: 1px solid
    ${({ noPhotoError }) => (noPhotoError ? redColor : '#e3e3e3')};
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    width: 92px;
    height: 92px;
  }
`

const Plus = styled.div<{ red?: boolean }>`
  position: absolute;
  width: 36px;
  height: 36px;
  background: ${({ red }) => (red ? `${redColor}` : '#e3e3e3')};
  border: 1px solid #ffffff;
  border-radius: 100%;
  color: ${({ red }) => (red ? '#fff' : '#000')};
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  bottom: 0;
  right: 0;

  @media (max-width: ${laptopBreakpoint}) {
    width: 27px;
    height: 27px;
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

const Photo = styled.div<{ background: string }>`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background: ${props => `${props.background} no-repeat center`};
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 92px;
    height: 92px;
  }
`

const PhotoBack = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: ${laptopBreakpoint}) {
    width: 92px;
    height: 92px;
  }
`

interface Props {
  id: IID | null
  onAdd: (id: IID) => void
  setPhotoId: (id: IID) => void
  photoType: string
  photo: { url: string }
  noSetPhoto?: boolean
  noPhotoError: boolean
  setNoPhotoError: Dispatch<SetStateAction<boolean>>
  title?: string
  red?: boolean
}

const Avatar: FC<Props> = ({
  id,
  photoType,
  onAdd,
  photo,
  setPhotoId,
  noSetPhoto,
  title,
  red,
  noPhotoError,
  setNoPhotoError,
}) => {
  const [isHover, setHover] = useState(false)
  const image = photo ? photo.url : null
  const isEmpty = !image

  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0]
      const uploadFile = async () => {
        await uploadPhoto(file, photoType).then(photoId => {
          if (id) {
            onAdd(photoId)
          } else {
            setPhotoId(photoId)
          }
        })
      }
      uploadFile()
      setNoPhotoError(false)
    },
    [photoType, onAdd],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  })

  const onHoverControls =
    isHover && !isEmpty ? (
      <PhotoBack>
        <ChangeText>Изменить фотографию</ChangeText>
      </PhotoBack>
    ) : null

  return (
    <Wrapper>
      {!noSetPhoto ? (
        <div
          {...getRootProps()}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <input {...getInputProps()} />
          <Photo background={`url(${image})`}>
            {!image ? (
              photoType === 'master' ? (
                <Empty>
                  <Plus>+</Plus>
                </Empty>
              ) : (
                <LogoText noPhotoError={noPhotoError}>
                  {title ? title : 'лого'}
                  <Plus red={red}>+</Plus>
                </LogoText>
              )
            ) : null}
          </Photo>
          {onHoverControls}
        </div>
      ) : (
        <Photo background={`url(${image})`} />
      )}
    </Wrapper>
  )
}

export default Avatar
