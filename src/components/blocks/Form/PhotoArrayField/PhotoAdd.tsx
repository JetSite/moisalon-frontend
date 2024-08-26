import React, { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { IUsePhotoResult } from './usePhotos'

const Photo = styled.div<{ isDragActive?: boolean }>`
  width: 175px;
  height: 175px;
  border: 1px solid #ededed;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: url('/icon-plus.svg') no-repeat center;
  background-color: rgba(
    0,
    0,
    0,
    ${({ isDragActive }) => (isDragActive ? 0.3 : 0.1)}
  );

  @media (max-width: ${laptopBreakpoint}) {
    width: 158px;
    height: 158px;
  }
`

interface Props extends Pick<IUsePhotoResult, 'onAdd'> {}

const PhotoAdd: FC<Props> = ({ onAdd }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onAdd(acceptedFiles)
    },
    [onAdd],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        <div>
          <Photo isDragActive={isDragActive} />
        </div>
      </div>
    </div>
  )
}

export default PhotoAdd
