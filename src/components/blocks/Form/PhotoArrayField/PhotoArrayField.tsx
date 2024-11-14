import React, { FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import usePhotos, { IUsePhotoProps } from './usePhotos'
import { GeneratePhotoArrayProps } from './generatePhotoArrayProps'

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
            {({ fields }) => (
              <GeneratePhotoArrayProps
                fields={fields}
                defaultPhotoId={defaultPhotoId}
                onSetDefault={onSetDefault}
                variant={variant}
                kind={kind}
                photoType={photoType}
                description={description}
                setPhotosArray={setPhotosArray}
              />
            )}
          </FieldArray>
        )
      }}
    </Field>
  )
}

export default PhotoArrayField
