import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { UPLOAD_PHOTO_OPTIONS } from 'src/api/variables'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { useMutation } from '@apollo/client'
import { UPLOAD } from 'src/api/graphql/common/upload'
import imageCompression from 'browser-image-compression'
import { IPhoto } from 'src/types'

const Wrapper = styled.div`
  margin-top: 40px;
`

const Photo = styled.div`
  width: 175px;
  height: 175px;
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
    width: 158px;
    height: 158px;
  }
`

interface PhotoAddProps {
  onAdd?: (photo: IPhoto) => void
}

const PhotoAdd: FC<PhotoAddProps> = ({ onAdd }) => {
  const [uploadImage] = useMutation(UPLOAD)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        try {
          const compressedFile = await imageCompression(
            file,
            UPLOAD_PHOTO_OPTIONS,
          )
          const res = await uploadImage({ variables: { file: compressedFile } })
          if (res?.data?.upload?.data?.id) {
            const normalisedPhoto = flattenStrapiResponse(res.data.upload.data)
            if (normalisedPhoto.id) {
              onAdd && onAdd(normalisedPhoto)
            }
          }
        } catch (e) {
          console.error('Error uploading file', e)
        }
      }
    },
    [uploadImage],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  })

  return (
    <Wrapper>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Photo />
      </div>
    </Wrapper>
  )
}

export default PhotoAdd
