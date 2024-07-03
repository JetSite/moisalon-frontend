import React, { FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import PhotoArray from './PhotoArray'
import { IPhoto } from 'src/types'

interface Props {
  kind: string
  photoType: string
  description?: string
  photos?: IPhoto[]
}

const PhotoArrayField: FC<Props> = ({
  kind,
  photoType,
  description,
  photos,
}) => {
  return (
    <Field name="defaultPhotoId">
      {({ input }) => {
        const { value: defaultPhotoId, onChange: onSetDefault } = input

        return (
          <FieldArray name="photos">
            {({ fields }) => {
              const {
                value = [],
                remove: onRemove,
                update: onChange,
                insert: onAdd,
              } = fields
              const photoProps = {
                kind,
                photoType,
                photos: value || photos,
                defaultPhotoId,
                onSetDefault,
                onAdd,
                onRemove,
                onChange,
              }
              return <PhotoArray {...photoProps} description={description} />
            }}
          </FieldArray>
        )
      }}
    </Field>
  )
}

export default PhotoArrayField
