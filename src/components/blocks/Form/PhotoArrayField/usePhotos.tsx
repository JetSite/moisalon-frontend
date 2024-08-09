import { useState, useCallback } from 'react'
import uploadPhoto from '../../../../utils/uploadPhoto'
import { useMutation } from '@apollo/client'
import { IPhoto } from 'src/types'
import { UPLOAD } from 'src/api/graphql/common/upload'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IID, ISetState } from 'src/types/common'
import { UPLOAD_PHOTO_OPTIONS } from 'src/api/variables'
import imageCompression from 'browser-image-compression'

export interface IUsePhotoProps {
  photos: IPhoto[]
  setPhotosArray?: ISetState<string[]>
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

  const [uploadImage] = useMutation(UPLOAD, {
    onCompleted: data => {
      const photo = flattenStrapiResponse(data.upload.data) as IPhoto
      setPhotosArray && setPhotosArray(prev => prev.concat(photo.id))
      addPhoto(0, photo)
      if (defaultPhotoId === '' || photos.length === 0) {
        onSetDefault && onSetDefault(photo.id)
      }
    },
  })

  const onAdd = useCallback(
    (files: File[]) => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const uploadFile = async () => {
          const compressedFile = await imageCompression(
            file,
            UPLOAD_PHOTO_OPTIONS,
          )

          await uploadImage({ variables: { file: compressedFile } })
        }
        uploadFile()
      }
    },
    [photos, addPhoto, photoType, defaultPhotoId, onSetDefault],
  )

  const onRemove = useCallback(
    (id: IID) => {
      const index = photos.findIndex(t => t.id === id)
      if (index > -1) {
        const photo = photos[index]
        if (photo.id === defaultPhotoId && photos.length > 1) {
          const defaultPhoto = photos.find((t, i) => i !== index)
          onSetDefault && defaultPhoto && onSetDefault(defaultPhoto.id)
        }
        removePhoto(index)
      }
    },
    [photos, removePhoto, defaultPhotoId, onSetDefault],
  )

  const onChange = useCallback(
    (id: IID, files: File[]) => {
      const index = photos.findIndex(t => t.id === id)
      if (index < 0) {
        return
      }
      const isDefaultPhoto = photos[index].id === defaultPhotoId
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const uploadFile = async () => {
          await uploadPhoto(file, photoType)
            .then(id => {
              const url = URL.createObjectURL(file)
              const photo = {
                id,
                url,
                name: '',
              }
              updatePhoto(index, photo)
              if (isDefaultPhoto) {
                onSetDefault && onSetDefault(id)
              }
            })
            .catch(error => setError(error))
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
