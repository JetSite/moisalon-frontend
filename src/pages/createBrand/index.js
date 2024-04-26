import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { addApolloState, initializeApollo } from '../../apollo-client'
import CreateBrand from '../../components/pages/Brand/CreateBrand'
import { updateBrandPhotoMutation } from '../../_graphql-legacy/brand/updateBrandPhoto'
import { brandSlugQuery } from '../../_graphql-legacy/brand/brandSlugQuery'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const CreateOrEditBrand = ({ brand }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  const [updatePhoto] = useMutation(updateBrandPhotoMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const onAdd = useCallback(
    photoId => {
      updatePhoto({ variables: { input: { photoId } } })
    },
    [updatePhoto],
  )

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateBrand brand={brand} onAdd={onAdd} />
  }
}

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo()

  const brandQueryRes = await apolloClient.query({
    query: brandSlugQuery,
    variables: { slug: query.id },
  })

  const brand = brandQueryRes?.data?.brandSlug

  return addApolloState(apolloClient, {
    props: { brand: brand || null },
  })
}

export default CreateOrEditBrand
