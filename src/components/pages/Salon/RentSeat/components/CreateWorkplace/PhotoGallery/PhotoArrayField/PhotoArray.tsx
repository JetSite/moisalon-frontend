import React, { FC } from 'react'
import PhotoAdd from './PhotoAdd'
import PhotoItem from './PhotoItem'
// import usePhotos from './usePhotos'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import usePhotos from 'src/components/blocks/Form/PhotoArrayField/usePhotos'
import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'

const Wrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
  }
`

const PhotosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;

  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`

interface Props {
  photos: IPhoto[]
  defaultPhotoId: IID
  description?: string
  onSetDefault: (event: any) => void
}

const PhotoArray: FC<Props> = props => {
  const { photos, defaultPhotoId, onSetDefault, description } = props
  const { onAdd, onRemove, onChange } = usePhotos(props)

  const photoList = photos.map(photo => {
    return (
      <PhotoItem
        key={photo.id}
        photo={photo}
        isDefault={photo.id === defaultPhotoId}
        onChange={onChange}
        onRemove={onRemove}
        onSetDefault={onSetDefault}
      />
    )
  })

  return (
    <Wrapper>
      <PhotoAdd onAdd={onAdd} />
      <PhotosWrapper>{photoList}</PhotosWrapper>
      <p>{description}</p>
    </Wrapper>
  )
}

export default PhotoArray
