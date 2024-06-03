import { useState, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
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
}) => {
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

  const router = useRouter()
  const [clickAddress, setClickAddress] = useState(true)
  const [errors, setErrors] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [updateMe] = useMutation(changeMe, {
    onCompleted: async data => {
      const prepareData = flattenStrapiResponse(data.updateUsersPermissionsUser)
      prepareData && setMe({ info: prepareData })
    },
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })
  const [mutate, { loading }] = useMutation(UPDATE_MASTER, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async res => {
      // ym("reachGoal", "create_profile_success");
      // window?.dataLayer?.push({
      //   event: "event",
      //   eventProps: {
      //     category: "form",
      //     action: "create_profile_success",
      //   },
      // });
      if (res?.updateMaster?.data?.id) {
        let masterIds: IID[] = []
        if (me?.owner?.masters) {
          masterIds = me.owner.masters.map(item => item.id)
        }

        await updateMe({
          variables: {
            id: me?.info.id,
            data: {
              masters: [...masterIds, res.updateMaster.data.id],
            },
          },
        })
      }
      router.push('/masterCabinet')
    },
  })
  const [createMaster, { loading: loadingCreate }] = useMutation(
    CREATE_MASTER,
    {
      onCompleted: async res => {
        // ym("reachGoal", "create_profile");
        // window?.dataLayer?.push({
        //   event: "event",
        //   eventProps: {
        //     category: "form",
        //     action: "create_profile",
        //   },
        // });
        if (res?.createMaster?.data?.id) {
          let masterIds: IID[] = []
          if (me?.owner?.masters) {
            masterIds = me.owner.masters.map(item => item.id)
          }

          await updateMe({
            variables: {
              id: me?.info.id,
              data: {
                masters: [...masterIds, res.createMaster.data.id],
              },
            },
          })
        }
        router.push('/masterCabinet')
      },
    },
  )

  const onSubmit = useCallback(
    values => {
      if (!values.address) {
        setErrors(['Введите адрес места работы из выпадающего списка'])
        setErrorPopupOpen(true)
        return
      }
      if (!master && !photo) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото мастера'])
        setErrorPopupOpen(true)
        return
      }

      const servicesForInput = values.specializations.map(item => ({
        service: item,
      }))
      // const resumeForInput = {
      //   age: values.resume_age,
      //   gender: values.resume_gender,
      //   specialization: values.resume_specialization,
      //   region: values.resume_region,
      //   workSchedule: values.resume_workSchedule,
      //   salary: values.resume_salary,
      //   content: values.resume_content,
      // }
      const input = {
        name: values.name,
        email: values.email,
        phone: values.phone.phoneNumber,
        description: values.description,
        address: values.address,
        searchWork: values.searchWork,
        services: servicesForInput,
        webSiteUrl: values?.webSiteUrl || '',
        haveTelegram: values?.phone?.haveTelegram || false,
        haveViber: values?.phone?.haveViber || false,
        haveWhatsApp: values?.phone?.haveWhatsApp || false,
        photo: photo?.id,
        city: me?.info?.city?.id || 1,
      }

      if (!master) {
        createMaster({
          variables: {
            input: { ...input },
          },
        })
      }
      if (master) {
        const masterResumes = master.resumes.map(item => {
          return item.id
        })
        mutate({
          variables: {
            masterId: master.id,
            input: {
              ...input,
            },
          },
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickAddress, photo],
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
                phone: { phoneNumber: me?.info?.phoneNumber },
                name: me?.info?.displayName,
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
                setClickAddress={setClickAddress}
                handleClickNextTab={handleClickNextTab}
                number={1}
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
                  disabled={pristine || loading || loadingCreate}
                >
                  {loading || loadingCreate
                    ? 'Подождите'
                    : 'Сохранить и перейти в кабинет'}
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
