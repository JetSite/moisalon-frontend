import { useState, useCallback } from 'react'
import uploadPhoto from '../../../../utils/uploadPhoto'
import { useMutation } from '@apollo/client'
import { UPDATE_SALON_PHOTO } from 'src/api/graphql/salon/mutations/updateSalonPhoto'
import { IPhoto } from 'src/types'
import { UPLOAD } from 'src/api/graphql/common/upload'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IID } from 'src/types/common'

interface Props {
  photos: IPhoto[]
  editEntityId: IID | null
}

const usePhotos = ({
  photos = [],
  editEntityId,
  photoType,
  kind,
  onAdd: addPhoto,
  onRemove: removePhoto,
  onChange: updatePhoto,
  onSetDefault,
  defaultPhotoId,
}: Props) => {
  const [error, setError] = useState(undefined)
  const [addImage] = useMutation(UPDATE_SALON_PHOTO)

  console.log(editEntityId)

  const [uploadImage] = useMutation(UPLOAD, {
    onCompleted: data => {
      const photo = flattenStrapiResponse(data.upload.data)
      addPhoto(0, photo)
      if (defaultPhotoId === '' || photos.length === 0) {
        onSetDefault(photo.id)
      }
      addImage({
        variables: { id: editEntityId, input: { salonPhotos: photo.id } },
      })
    },
  })

  const onAdd = useCallback(
    files => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const uploadFile = async () => {
          await uploadImage({ variables: { file } })
        }
        uploadFile()
      }
    },
    [photos, addPhoto, photoType, kind, defaultPhotoId, onSetDefault],
  )

  const onRemove = useCallback(
    id => {
      const index = photos.findIndex(t => t.id === id)
      if (index > -1) {
        const photo = photos[index]
        if (photo.id === defaultPhotoId && photos.length > 1) {
          const defaultPhoto = photos.find((t, i) => i !== index)
          onSetDefault(defaultPhoto.id)
        }
        removePhoto(index)
      }
    },
    [photos, removePhoto, defaultPhotoId, onSetDefault],
  )

  const onChange = useCallback(
    (id, files) => {
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
                kind,
              }
              updatePhoto(index, photo)
              if (isDefaultPhoto) {
                onSetDefault(id)
              }
            })
            .catch(error => setError(error))
        }
        uploadFile()
      }
    },
    [photos, updatePhoto, defaultPhotoId, onSetDefault, kind, photoType],
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
