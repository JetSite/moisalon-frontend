import React from 'react'
import PhotoAdd from './PhotoAdd'
import PhotoItem from './PhotoItem'
import usePhotos from './usePhotos'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

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

const PhotoArray = props => {
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
    </Wrapper>
  )
}

export default PhotoArray
