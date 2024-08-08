import { useState, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import Controls from './components/Controls'
import Header from '../../pages/MainPage/components/Header'
import { MainContainer, Wrapper } from './styled'
import CabinetForm from './components/CabinetForm'
import { PHOTO_URL } from '../../../api/variables'
import { UPDATE_MASTER_PHOTO } from 'src/_graphql-legacy/master/updateMasterPhotoMutation'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IPhoto } from 'src/types'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import { useShallow } from 'zustand/react/shallow'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const Cabinet = () => {
  const { me, user, loading } = useAuthStore(getStoreData)
  const { setUser } = useAuthStore(useShallow(getStoreEvent))
  const [photo, setPhoto] = useState<IPhoto | undefined>(
    !!me?.info.avatar?.url ? me.info.avatar : undefined,
  )
  const [noPhotoError, setNoPhotoError] = useState(false)

  const [updateAvatar] = useMutation(changeMe, {
    onCompleted: res => {
      if (res?.updateUsersPermissionsUser?.data?.id) {
        const newAvatar = flattenStrapiResponse(
          res.updateUsersPermissionsUser.data.attributes.avatar,
        )
        if (user) {
          setUser({
            ...user,
            info: {
              ...user.info,
              avatar: newAvatar,
            },
          })
        }
      }
    },
  })
  const onAdd = useCallback(
    (photoId: string) => {
      updateAvatar({
        variables: { id: me?.info.id, data: { avatar: photoId } },
      })
    },
    [updateAvatar],
  )

  return (
    <>
      <Header />
      <MainContainer>
        <Wrapper>
          <Controls
            photo={
              photo
                ? {
                    url: `${PHOTO_URL}${photo.url}`,
                  }
                : null
            }
            id={null}
            photoType="master"
            setPhoto={setPhoto}
            onAdd={onAdd}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <CabinetForm setNoPhotoError={setNoPhotoError} photo={photo} />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Cabinet
