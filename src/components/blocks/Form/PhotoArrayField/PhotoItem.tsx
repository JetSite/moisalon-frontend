import React, { FC, MouseEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@mui/styles'
import { PHOTO_URL } from 'src/api/variables'
import { IUsePhotoResult } from './usePhotos'
import { IPhoto } from 'src/types'

const useStyles = makeStyles(() => ({
  root: {
    width: '15px',
    height: '40px',
  },
  delete: {
    background: `url('/close-cross-red.svg') no-repeat center`,
    width: 15,
    height: 15,
    position: 'absolute',
    top: 10,
    right: 10,
  },
}))

interface Props extends Pick<IUsePhotoResult, 'onRemove' | 'onChange'> {
  photo: IPhoto
}

const PhotoItem: FC<Props> = ({ photo, onRemove, onChange }) => {
  const { id, url } = photo
  const [isHover, setHover] = useState<boolean>(false)
  const classes = useStyles()

  const onDrop = useCallback(
    (files: File[]) => {
      onChange(id, files)
    },
    [onChange, id],
  )

  const handleOnRemove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      onRemove(id)
    },
    [onRemove, id],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  })
  const onHoverControls = isHover ? (
    <div className={classes.delete} onClick={handleOnRemove} />
  ) : null

  return (
    <div
      style={{ cursor: 'pointer', position: 'relative' }}
      {...getRootProps()}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input {...getInputProps()} />
      <div
        style={{
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: 100,
          width: 100,
          backgroundImage: `url(${PHOTO_URL + url})`,
        }}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          height="0"
          width="0"
          className={'photo__blurSvg'}
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
  )
}

export default PhotoItem
