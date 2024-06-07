import { useState, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import Controls from './components/Controls'
import Header from '../../pages/MainPage/components/Header'
import { MainContainer, Wrapper } from './styled'
import CabinetForm from './components/CabinetForm'
import { PHOTO_URL } from '../../../api/variables'
import { UPDATE_MASTER_PHOTO } from 'src/_graphql-legacy/master/updateMasterPhotoMutation'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IPhoto } from 'src/types'

const Cabinet = () => {
  const { me, loading } = useAuthStore(getStoreData)
  const [photo, setPhoto] = useState<IPhoto | undefined>(
    !!me?.info?.masters?.length ? me.info.masters[0].photo : undefined,
  )
  const [noPhotoError, setNoPhotoError] = useState(false)

  const [updateMasterPhoto] = useMutation(UPDATE_MASTER_PHOTO)
  const onAdd = useCallback(
    (photo: string) => {
      updateMasterPhoto({ variables: { input: { photo } } })
    },
    [updateMasterPhoto],
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
