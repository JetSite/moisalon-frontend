import { useState, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Wrapper, Title } from './styled'
import { MobileVisible, MobileHidden } from '../../../../../../styles/common'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import { updateBrandPersonalInformationMutation } from '../../../../../../_graphql-legacy/brand/updateBrandPersonalInformationMutation'
import { updateBrandNameMutation } from '../../../../../../_graphql-legacy/brand/updateBrandName'
import Error from '../../../../../blocks/Form/Error'
import Button from '../../../../../ui/Button'
import { createBrandMutation } from '../../../../../../_graphql-legacy/brand/createBrandMutation'
import { useRouter } from 'next/router'
import About from './components/About'
import Socials from './components/Socials'
import { useShallow } from 'zustand/react/shallow'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useLazyQuery } from '@apollo/client'
import { USER } from 'src/api/graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { CREATE_BRAND } from 'src/api/graphql/brand/mutations/createBrand'
import { set } from 'lodash'

const RegistrationForm = ({
  allTabs,
  ref1,
  ref2,
  handleClickNextTab,
  photoBrand,
  brand,
  setNoPhotoError,
}) => {
  const { me, user } = useAuthStore(useShallow(getStoreData))
  const { setUser } = useAuthStore(useShallow(getStoreEvent))
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [clickAddress, setClickAddress] = useState(true)
  const [clickCity, setClickCity] = useState<string | null>(null)
  const router = useRouter()

  console.log('photoBrand', photoBrand)

  const [getUser] = useLazyQuery(USER, {
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.usersPermissionsUser)

      console.log('prepareData', prepareData)

      if (user) {
        const newData = {
          ...user,
          owner: {
            ...user.owner,
            brands: prepareData.brands,
          },
        }
        setUser({ ...newData })
      }
    },
    onError: err => console.log(err),
    notifyOnNetworkStatusChange: true,
  })

  const [createBrand] = useMutation(CREATE_BRAND, {
    onCompleted: () => {
      getUser({ variables: { id: me?.info?.id } })
      router.push('/masterCabinet')
    },
  })

  const onSubmit = useCallback(
    (values: any) => {
      if (!clickAddress || !values.address) {
        setErrors(['Выберите адрес места работы из выпадающего списка'])
        setErrorPopupOpen(true)
        return
      }
      if (!brand && !photoBrand) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото бренда'])
        setErrorPopupOpen(true)
        return
      }
      const phone = {
        phoneNumber: values?.phone?.phoneNumber,
        haveTelegram: values?.phone?.haveTelegram || false,
        haveViber: values?.phone?.haveViber || false,
        haveWhatsApp: values?.phone?.haveWhatsApp || false,
      }

      const socialNetworks = values.socialNetworkUrls
        ? Object?.keys(values.socialNetworkUrls)?.map(e => ({
            title: e,
            link: values.socialNetworkUrls[e] as string,
          }))
        : []

      const inputToSave = {
        name: values.name,
        logo: photoBrand.id,
        // country: values.country,
        phones: [phone],
        email: values.email,
        address: values.address,
        description: values.description,
        history: values.history,
        manufacture: values.manufacture,
        webSiteUrl: values.webSiteUrl,
        socialNetworks,
        user: user?.info.id,
        publishedAt: new Date().toISOString(),
      }

      if (!brand) {
        try {
          setLoading(true)
          createBrand({
            variables: {
              input: {
                ...inputToSave,
              },
            },
          })
        } catch (error) {
          console.error(error)
        }
      }

      // if (brand) {
      //   updateName({
      //     variables: {
      //       input: {
      //         id: brand.id,
      //         name: values.name,
      //       },
      //     },
      //   });
      //   updateBrand({
      //     variables: {
      //       input: {
      //         ...values,
      //         phone,
      //         logoId: photoBrandId,
      //         photoId: photoBrandId,
      //       },
      //     },
      //   });
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickAddress, photoBrand],
  )

  return (
    <Wrapper>
      <Title>Информация о бренде</Title>
      <AutoFocusedForm
        onSubmit={onSubmit}
        initialValues={{}}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        render={({ handleSubmit, form, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                setClickCity={setClickCity}
                handleClickNextTab={handleClickNextTab}
                number={1}
              />
              <Socials ref2={ref2} />
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <MobileHidden>
                <Button
                  variant="red"
                  size="noWidth"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить и перейти в кабинет'}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить и перейти в кабинет'}
                </Button>
              </MobileVisible>
            </form>
          )
        }}
      />
    </Wrapper>
  )
}

export default RegistrationForm
