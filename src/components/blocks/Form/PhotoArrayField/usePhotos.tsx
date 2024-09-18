import { useState, useCallback } from 'react'
import uploadPhoto from '../../../../utils/uploadPhoto'
import { useMutation } from '@apollo/client'
import { IPhoto } from 'src/types'
import { UPLOAD } from 'src/api/graphql/common/upload'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IID, ISetState } from 'src/types/common'
import { UPLOAD_PHOTO_OPTIONS } from 'src/api/variables'
import imageCompression from 'browser-image-compression'
import splitArray from 'src/utils/newUtils/common/splitArray'

import { useForm } from 'react-final-form'

export interface IUsePhotoProps {
  name?: string
  photos: IPhoto[]
  setPhotosArray?: ISetState<IPhoto[]>
  onSetDefault?: (event: any) => void
  defaultPhotoId?: IID
  photoType?: 'salonPhoto' | 'master' | 'brandPhoto'
  kind?: 'small' | 'medium' | 'big'
  onAdd: (index: number, value: IPhoto) => void
  onChange: (index: number, value: IPhoto) => void
  onRemove: (index: number) => void
}

export interface IUsePhotoResult {
  photos: IPhoto[]
  onAdd: (files: File[]) => void
  onRemove: (id: IID) => void
  onChange: (id: IID, files: File[]) => void
  error: unknown | undefined
}

type IUsePhoto = (props: IUsePhotoProps) => IUsePhotoResult

const usePhotos: IUsePhoto = ({
  photos = [],
  photoType,
  kind,
  onAdd: addPhoto,
  onRemove: removePhoto,
  onChange: updatePhoto,
  onSetDefault,
  defaultPhotoId,
  setPhotosArray,
}) => {
  const [error, setError] = useState<unknown>(undefined)

  const [uploadImage] = useMutation(UPLOAD)
  const { mutators } = useForm()

  const onAdd = useCallback(
    (files: File[]) => {
      console.log('onAdd')
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const uploadFile = async () => {
          const compressedFile = await imageCompression(
            file,
            UPLOAD_PHOTO_OPTIONS,
          )
          await uploadImage({
            variables: { file: compressedFile },
            onError: error => setError(error),
            onCompleted: data => {
              const photo = flattenStrapiResponse(data.upload.data) as IPhoto
              setPhotosArray && setPhotosArray(prev => prev.concat(photo))
              console.log(photos.length)

              addPhoto(1 + photos.length + i, photo)

              if (
                defaultPhotoId === '' ||
                photos.length === 0 ||
                defaultPhotoId === photos[0].id
              ) {
                onSetDefault && onSetDefault(photos[0]?.id || photo.id)
              }
            },
          })
        }
        uploadFile()
      }
    },
    [photos, addPhoto, photoType, defaultPhotoId, onSetDefault],
  )

  const onRemove = useCallback(
    (id: IID) => {
      const index = photos.findIndex(photo => photo.id === id)

      if (index > -1) {
        // Удаляем фото из массива через react-final-form's FieldArray
        // removePhoto(index)
        mutators.remove('photos', index)

        // Теперь обновляем массив идентификаторов фотографий
        const updatedPhotos = photos.filter((_, i) => i !== index)
        setPhotosArray && setPhotosArray(updatedPhotos)

        // Устанавливаем новую фотографию по умолчанию, если нужно
        if (onSetDefault && id === defaultPhotoId) {
          onSetDefault('')
        }
      }
    },
    [photos, removePhoto, defaultPhotoId, onSetDefault],
  )

  const onChange = useCallback(
    (id: IID, files: File[]) => {
      const index = photos.findIndex(photo => photo.id === id)
      if (index < 0) {
        return
      }

      const isDefaultPhoto = photos[index].id === defaultPhotoId
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const uploadFile = async () => {
          const compressedFile = await imageCompression(
            file,
            UPLOAD_PHOTO_OPTIONS,
          )
          await uploadImage({
            variables: { file: compressedFile },
            onError: error => setError(error),
            onCompleted: data => {
              const photo = flattenStrapiResponse(data.upload.data) as IPhoto
              const [startArr, endArr] = splitArray(photos, index, i !== 0)
              const newArr = startArr.concat(photo).concat(endArr)
              setPhotosArray && setPhotosArray(newArr)
              updatePhoto(index + i, photo)
              if (isDefaultPhoto) {
                onSetDefault && onSetDefault(photo.id)
              }
            },
          })
        }
        uploadFile()
      }
    },
    [photos, updatePhoto, defaultPhotoId, onSetDefault, photoType],
  )

  return {
    photos,
    onAdd,
    onRemove,
    onChange,
    error,
  }
}

export default usePhotos
