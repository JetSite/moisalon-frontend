import React, { FC, useCallback } from 'react'
import PhotoAdd from './PhotoAdd'
import PhotoItem from './PhotoItem'
import { Grid } from '@material-ui/core'
import usePhotos from './usePhotos'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { useMutation } from '@apollo/client'
import { IPhoto } from 'src/types'
import { PhotoArrayFieldProps } from './PhotoArrayField'

const Description = styled.p`
  font-size: 14px;
  line-height: 27px;
  max-width: 452px;
  margin-left: 61px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 20px;
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
  }
`

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
`

interface Props extends PhotoArrayFieldProps {
  description?: string
  photos: IPhoto[]
}

const PhotoArray: FC<Props> = props => {
  const { photos, defaultPhotoId, onSetDefault, description, variant } = props
  const { onRemove, onChange, onAdd } = usePhotos(props)

  const photoList = photos.map(photo => {
    return (
      <Grid item key={photo.id}>
        <PhotoItem
          photo={photo}
          isDefault={photo.id === defaultPhotoId}
          onChange={onChange}
          onRemove={onRemove}
          onSetDefault={onSetDefault}
        />
      </Grid>
    )
  })

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Wrap>
          <PhotoAdd onAdd={onAdd} />
          {variant === 'normal' ? (
            <Description>{description}</Description>
          ) : null}
        </Wrap>
      </Grid>
      {photoList}
    </Grid>
  )
}

export default PhotoArray
