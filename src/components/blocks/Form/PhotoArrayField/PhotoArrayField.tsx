import React, { FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import PhotoArray from './PhotoArray'
import usePhotos, { IUsePhotoProps } from './usePhotos'

export interface PhotoArrayFieldProps
  extends Omit<IUsePhotoProps, 'onRemove' | 'onChange' | 'onAdd' | 'photos'> {
  variant?: 'normal' | string
  description?: string
  name?: string
}

const PhotoArrayField: FC<PhotoArrayFieldProps> = ({
  name = 'photos',
  variant = 'normal',
  kind,
  photoType,
  description,
  setPhotosArray,
}) => {
  return (
    <Field name="defaultPhotoId">
      {({ input }) => {
        const { value: defaultPhotoId, onChange: onSetDefault } = input

        return (
          <FieldArray name={name}>
            {({ fields }) => {
              const { value, remove, update, insert } = fields

              const { onRemove, onChange, onAdd } = usePhotos({
                photos: value,
                photoType,
                kind,
                onAdd: insert,
                onRemove: remove,
                onChange: update,
                onSetDefault,
                defaultPhotoId,
                setPhotosArray,
              })
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
