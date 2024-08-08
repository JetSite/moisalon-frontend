import { useState, useCallback } from 'react'
import { ApolloError, useMutation } from '@apollo/react-hooks'
import About from './components/About'
import MasterSpecializationsList from './components/MasterSpecializationsList'
import { Wrapper, Title } from './styled'
import { MobileHidden, MobileVisible } from '../../../../../../styles/common'
import Button from '../../../../../ui/Button'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import Socials from './components/Socials'
import Work from './components/Work'
import { useRouter } from 'next/router'
// import ym from "react-yandex-metrika";
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { CREATE_MASTER } from 'src/api/graphql/master/mutations/createMaster'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import { IID } from 'src/types/common'
import { CREATE_RESUME } from 'src/api/graphql/master/mutations/createResume'
import { title } from 'process'
import { IMasterCreateInput } from 'src/types/masters'
import { ICity } from 'src/types'
import { cyrToTranslit } from 'src/utils/translit'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { getPrepareInputMasterForm } from './components/utils'
import { useLazyQuery } from '@apollo/client'
import { useShallow } from 'zustand/react/shallow'
import { USER } from 'src/api/graphql/me/queries/getUser'

const RegistrationForm = ({
  master,
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  handleClickNextTab,
  photo,
  setNoPhotoError,
  serviceCategories,
  cities,
}) => {
  const { me, user } = useAuthStore(useShallow(getStoreData))
  const { setUser } = useAuthStore(useShallow(getStoreEvent))
  const [clickCity, setClickCity] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectCityId, setSelectCityId] = useState<IID | null>(null)
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const router = useRouter()
  const [clickAddress, setClickAddress] = useState(true)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [resumeInput, setResumeInput] = useState<Object | null>(null)

  const [getUser] = useLazyQuery(USER, {
    onCompleted: data => {
      console.log('data', data)
      const prepareData = flattenStrapiResponse(data.usersPermissionsUser)

      if (user) {
        const newData = {
          ...user,
          owner: {
            ...user.owner,
            masters: prepareData.masters,
          },
        }
        setUser({ ...newData })
      }
    },
    onError: err => console.log(err),
    notifyOnNetworkStatusChange: true,
  })
  const [createResume] = useMutation(CREATE_RESUME)
  const [addCity] = useMutation(CREATE_CITY)

  const onErrorMutate = (err: ApolloError) => {
    const errorMessages = err.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
    setErrorPopupOpen(true)
    setLoading(false)
  }

  const onCompleted = async data => {
    // ym("reachGoal", "create_profile_success");
    // window?.dataLayer?.push({
    //   event: "event",
    //   eventProps: {
    //     category: "form",
    //     action: "create_profile_success",
    //   },
    // });

    if (resumeInput) {
      const masterId = data.createMaster.data.id

      console.log(masterId)

      await createResume({
        variables: {
          input: {
            ...resumeInput,
            master: masterId,
          },
        },
      })
    }
    setLoading(false)
    getUser({ variables: { id: me?.info?.id } })
    router.push('/masterCabinet')
  }

  const [mutate] = useMutation(UPDATE_MASTER, {
    onError: onErrorMutate,
    onCompleted: data => onCompleted(data),
  })
  const [createMaster] = useMutation(CREATE_MASTER, {
    onError: onErrorMutate,
    onCompleted: data => onCompleted(data),
  })

  const onSubmit = useCallback(
    async values => {
      setLoading(true)
      console.log('values', values)

      if (!values.address) {
        setErrors(['Введите адрес места работы из выпадающего списка'])
        setErrorPopupOpen(true)
        setLoading(false)
        return
      }
      if (!master && !photo) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото мастера'])
        setErrorPopupOpen(true)
        setLoading(false)
        return
      }
      if (values.searchWork) {
        setResumeInput({
          title: values.resume_title,
          content: values.resume_content,
          specialization: values.resume_specialization,
          age: parseInt(values.resume_age) || 0,
          workSchedule: values.resume_workSchedule,
          salary: values.resume_salary,
          // region: values.resume_region,
          region: '1',
          // gender: values.resume_gender,
          user: me?.info?.id,
          publishedAt: new Date().toISOString(),
        })
      } else {
        setResumeInput(null)
      }

      const findCity =
        citiesArray?.find(e => e.slug === cyrToTranslit(clickCity)) || null

      if (!findCity) {
        await addCity({
          variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
          onError: () => {
            setNoPhotoError(true)
            setErrors(['город не найден'])
            setErrorPopupOpen(true)
          },
          onCompleted: async data => {
            setSelectCityId(data.data.createCity.data.id)
            const findCityData = flattenStrapiResponse(
              data.data.createCity.data,
            )
            setCitiesArray(prev => prev.concat(findCityData))

            const input = getPrepareInputMasterForm({
              values,
              selectCityId,
              findCity: findCityData,
              photoId: photo?.id,
            })
            console.log('input not found city', input)
            if (master.id) {
              await mutate({
                variables: { masterId: master?.id, input },
                onError: onErrorMutate,
                onCompleted,
              })
            } else {
              await createMaster({
                variables: {
                  input: { user: me?.info.id, ...input },
                },
              })
            }
          },
        })
      } else {
        const input = getPrepareInputMasterForm({
          values,
          selectCityId,
          findCity,
          photoId: photo?.id,
        })
        console.log('input found city without resume', input)
        if (master?.id) {
          await mutate({
            variables: { masterId: master?.id, input },
            onError: onErrorMutate,
            onCompleted,
          })
        } else {
          await createMaster({
            variables: {
              input: { user: me?.info.id, ...input },
              onCompleted,
              onError: onErrorMutate,
            },
          })
        }
      }
    },
    [
      clickAddress,
      photo,
      clickCity,
      citiesArray,
      addCity,
      mutate,
      createMaster,
    ],
  )

  return (
    <Wrapper>
      <Title>Мои данные</Title>
      <AutoFocusedForm
        initialValues={
          master
            ? master
            : me?.info
              ? {
                email: me?.info?.email,
                phone: { phoneNumber: me?.info?.phone },
                name: me?.info?.username,
                city: me?.info?.city,
              }
              : null
        }
        onSubmit={onSubmit}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        render={({ handleSubmit, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                handleClickNextTab={handleClickNextTab}
                number={1}
                setClickCity={setClickCity}
              />
              <MasterSpecializationsList
                handleClickNextTab={handleClickNextTab}
                ref2={ref2}
                serviceCatalogs={serviceCategories}
                number={2}
              />
              <Work
                ref3={ref3}
                handleClickNextTab={handleClickNextTab}
                number={3}
              />
              <Socials ref4={ref4} />
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
                  disabled={pristine}
                >
                  Сохранить и перейти в кабинет
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
