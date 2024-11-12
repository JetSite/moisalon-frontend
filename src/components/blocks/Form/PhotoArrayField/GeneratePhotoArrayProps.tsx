import { FC } from 'react'
import PhotoArray from './PhotoArray'
import { FieldArrayRenderProps } from 'react-final-form-arrays'
import { PhotoArrayFieldProps } from './PhotoArrayField'
import usePhotos from './usePhotos'

interface Props
  extends Pick<FieldArrayRenderProps<any, HTMLElement>, 'fields'>,
    Pick<
      PhotoArrayFieldProps,
      | 'variant'
      | 'kind'
      | 'photoType'
      | 'description'
      | 'setPhotosArray'
      | 'variant'
    > {
  defaultPhotoId: string
  onSetDefault: (value: any) => void
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
