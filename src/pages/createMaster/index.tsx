import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import CreateMaster from 'src/components/pages/Master/CreateMaster'
import { UPDATE_MASTER_PHOTO } from 'src/api/graphql/master/mutations/updateMasterPhoto'

const CreateOrEditMaster = () => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const [updateMasterPhoto] = useMutation(UPDATE_MASTER_PHOTO)

  const onAdd = useCallback(
    (photoUrl: string) => {
      updateMasterPhoto({ variables: { input: { photoUrl } } })
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
