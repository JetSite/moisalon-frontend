import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

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

  @media (max-width: ${laptopBreakpoint}) {
    width: 158px;
    height: 158px;
  }
`

const PhotoAdd = ({ onAdd }) => {
  const onDrop = useCallback(
    acceptedFiles => {
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
          <Photo />
        </div>
      </div>
    </div>
  )
}

export default PhotoAdd
