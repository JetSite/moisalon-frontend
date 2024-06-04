import React, { FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import PhotoArray from './PhotoArray'
import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'

export interface PhotoArrayFieldProps {
  variant?: 'normal' | string
  photoType: 'salonPhoto' | string
  kind: 'small' | string
  description?: string
  photos: IPhoto[]
  editEntityId: IID | null
}

const PhotoArrayField: FC<PhotoArrayFieldProps> = ({
  variant = 'normal',
  kind,
  photoType,
  description,
  photos,
  editEntityId,
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
                editEntityId,
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