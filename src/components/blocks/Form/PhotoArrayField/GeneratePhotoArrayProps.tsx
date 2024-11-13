import { FC } from 'react'
import PhotoArray from './PhotoArray'
import { FieldArrayRenderProps } from 'react-final-form-arrays'
import { PhotoArrayFieldProps } from './PhotoArrayField'
import usePhotos from './usePhotos'
import { IPhoto } from 'src/types'

interface Props
  extends Pick<FieldArrayRenderProps<IPhoto, HTMLElement>, 'fields'>,
    Pick<
      PhotoArrayFieldProps,
      'variant' | 'kind' | 'photoType' | 'description' | 'setPhotosArray'
    > {
  defaultPhotoId: string
  onSetDefault: (value: string) => void
}

export const GeneratePhotoArrayProps: FC<Props> = ({
  fields,
  defaultPhotoId,
  onSetDefault,
  kind,
  photoType,
  description,
  setPhotosArray,
  variant,
}) => {
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
    <PhotoArray variant={variant} {...photoProps} description={description} />
  )
}
