import React, { FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import PhotoArray from './PhotoArray'
import { IPhoto } from 'src/types'
import { IID, ISetState } from 'src/types/common'
import { IUsePhotoProps } from './usePhotos'

export interface PhotoArrayFieldProps
  extends Omit<IUsePhotoProps, 'onRemove' | 'onChange' | 'onAdd'> {
  variant?: 'normal' | string
  description?: string
}

const PhotoArrayField: FC<PhotoArrayFieldProps> = ({
  variant = 'normal',
  kind,
  photoType,
  description,
  photos,
  setPhotosArray,
}) => {
  return (
    <Field name="defaultPhotoId">
      {({ input }) => {
        const { value: defaultPhotoId, onChange: onSetDefault } = input

        return (
          <FieldArray name="photos">
            {({ fields }) => {
              const {
                value = photos,
                remove: onRemove,
                update: onChange,
                insert: onAdd,
              } = fields
              const photoProps = {
                kind,
                photoType,
                photos: value,
                defaultPhotoId,
                onSetDefault,
                onAdd,
                onRemove,
                onChange,
                setPhotosArray,
              }
              return (
                <PhotoArray
                  variant={variant}
                  {...photoProps}
                  description={description}
                />
              )
            }}
          </FieldArray>
        )
      }}
    </Field>
  )
}

export default PhotoArrayField
