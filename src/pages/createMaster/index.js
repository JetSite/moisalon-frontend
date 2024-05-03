import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { updateMasterPhotoMutation } from '../../_graphql-legacy/master/updateMasterPhotoMutation'
import CreateMaster from '../../components/pages/Master/CreateMaster'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const CreateOrEditMaster = () => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const [updateMasterPhoto] = useMutation(updateMasterPhotoMutation)

  const onAdd = useCallback(
    photoId => {
      updateMasterPhoto({ variables: { input: { photoId } } })
    },
    [updateMasterPhoto],
  )

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateMaster master={me?.master || null} onAdd={onAdd} />
  }
}

export default CreateOrEditMaster
