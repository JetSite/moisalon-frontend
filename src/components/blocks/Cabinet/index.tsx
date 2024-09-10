import { useState, useCallback, FC } from 'react'
import { useMutation } from '@apollo/client'
import Header from '../../pages/MainPage/components/Header'
import { MainContainer, Wrapper } from './styled'
import CabinetForm, { CabinetFormProps } from './components/CabinetForm'
import { PHOTO_URL } from '../../../api/variables'
import { UPDATE_MASTER_PHOTO } from 'src/_graphql-legacy/master/updateMasterPhotoMutation'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { ICity, IPhoto } from 'src/types'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import { useShallow } from 'zustand/react/shallow'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import Controls from './components/Controls'
import { FormGuardPopup } from '../Form/FormGuardPopup'

interface Props extends Pick<CabinetFormProps, 'cities' | 'user'> {}

const Cabinet: FC<Props> = ({ cities, user }) => {
  const [avatar, setAvatar] = useState<IPhoto | null>(
    !!user.info.avatar?.url ? user.info.avatar : null,
  )
  const [noPhotoError, setNoPhotoError] = useState(false)
  const [dirtyForm, setDirtyForm] = useState(false)

  return (
    <>
      <Header />
      <MainContainer>
        <Wrapper>
          <Controls
            setPhoto={setAvatar}
            photo={
              avatar ? { ...avatar, url: `${PHOTO_URL}${avatar?.url}` } : null
            }
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
            photoType="master"
          />
          <CabinetForm
            user={user}
            cities={cities}
            setDirtyForm={setDirtyForm}
            dirtyForm={dirtyForm}
            setNoPhotoError={setNoPhotoError}
            photo={avatar}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Cabinet
