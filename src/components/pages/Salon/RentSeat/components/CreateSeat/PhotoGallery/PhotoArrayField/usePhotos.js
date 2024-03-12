import { useState, useCallback } from "react";
import uploadPhoto from "../../../../../../../../utils/uploadPhoto";

const usePhotos = ({
  photos = [],
  photoType,
  kind,
  onAdd: addPhoto,
  onRemove: removePhoto,
  onChange: updatePhoto,
  onSetDefault,
  defaultPhotoId,
}) => {
  const [error, setError] = useState(undefined);

  const onAdd = useCallback(
    (files) => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadFile = async () => {
          await uploadPhoto(file, photoType)
            .then((id) => {
              const url = URL.createObjectURL(file);
              const photo = {
                id,
                url,
                kind,
              };
              addPhoto(0, photo);
            })
            .catch((error) => setError(error));
        };
        uploadFile();
      }
    },
    [photos, addPhoto, photoType, kind, defaultPhotoId, onSetDefault]
  );

  const onRemove = useCallback(
    (id) => {
      const index = photos.findIndex((t) => t.id === id);
      if (index > -1) {
        const photo = photos[index];
        if (photo.id === defaultPhotoId && photos.length > 1) {
          const defaultPhoto = photos.find((t, i) => i !== index);
          onSetDefault(defaultPhoto.id);
        }
        removePhoto(index);
      }
    },
    [photos, removePhoto, defaultPhotoId, onSetDefault]
  );

  const onChange = useCallback(
    (id, files) => {
      const index = photos.findIndex((t) => t.id === id);
      if (index < 0) {
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadFile = async () => {
          await uploadPhoto(file, photoType)
            .then((id) => {
              const url = URL.createObjectURL(file);
              const photo = {
                id,
                url,
                kind,
              };
              updatePhoto(index, photo);
            })
            .catch((error) => setError(error));
        };
        uploadFile();
      }
    },
    [photos, updatePhoto, defaultPhotoId, onSetDefault, kind, photoType]
  );

  return {
    photos,
    onAdd,
    onRemove,
    onChange,
    error,
  };
};

export default usePhotos;
