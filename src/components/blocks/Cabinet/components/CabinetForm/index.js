import { useMutation } from '@apollo/client'
import { useCallback, useState, useRef, useEffect } from 'react'
import { Field } from 'react-final-form'
import { changeDataMutation } from '../../../../../_graphql-legacy/changeDataMutation'
import {
  composeValidators,
  email,
  phone,
  required,
} from '../../../../../utils/validations'
import Button from '../../../../ui/Button'
import { TextField } from '../../../Form'
import AutoFocusedForm from '../../../Form/AutoFocusedForm'
import Error from '../../../Form/Error'
import {
  Wrapper,
  Title,
  SubTitle,
  FieldWrap,
  FieldStyled,
  ButtonWrap,
  Flex,
} from './styled'
import CreateProfiles from '../CreateProfiles'
import { MobileHidden } from '../../../../../styles/common'
import ProfileCitySelect from './components/ProfileCitySelect'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const CabinetForm = ({
  photoId,
  setNoPhotoError,
  refetch,
  auth,
  currentMe,
}) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [cityInput, setCityInput] = useState('')
  const [showCityInput, setShowCityInput] = useState(false)
  const cityInputRef = useRef()
  const cityPopupRef = useRef()

  const changeCity = city => {
    if (
      !showCityInput &&
      cityInput &&
      document.activeElement === cityInputRef.current
    ) {
      setShowCityInput(true)
    }
    setCityInput(city)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        cityInputRef.current &&
        !cityInputRef.current.contains(event.target) &&
        cityPopupRef.current &&
        !cityPopupRef.current.contains(event.target)
      ) {
        setShowCityInput(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const [mutate] = useMutation(changeDataMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async () => {
      await refetch()
      setLoading(false)
    },
    onError: error => {
      setLoading(false)
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const onSubmit = useCallback(
    async values => {
      if (!photoId) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото'])
        setErrorPopupOpen(true)
        return
      }
      setLoading(true)
      mutate({
        variables: {
          input: {
            defaultCity: values.defaultCity,
            displayName: values.displayName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            avatar: photoId,
          },
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photoId],
  )
  return (
    <Wrapper>
      <Flex>
        <Title>Мои данные </Title>
        <SubTitle>Пользователь </SubTitle>
        {showCityInput && (
          <ProfileCitySelect
            cityInput={cityInput}
            setShowCityInput={setShowCityInput}
            cityPopupRef={cityPopupRef}
          />
        )}
      </Flex>
      <AutoFocusedForm
        initialValues={{
          phoneNumber: currentMe?.info?.phoneNumber,
          email: currentMe?.info?.email,
          defaultCity: currentMe?.info?.defaultCity,
          displayName: currentMe?.info?.displayName,
        }}
        subscription={{ values: true }}
        mutators={{
          setCity: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          },
        }}
        onSubmit={onSubmit}
        render={({ form, handleSubmit, pristine, values }) => {
          changeCity(values.defaultCity)
          // window.setFormValue = form.mutators.setCity;
          return (
            <form onSubmit={handleSubmit}>
              <FieldWrap>
                <FieldStyled
                  name="displayName"
                  component={TextField}
                  label="Имя"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <Field
                  name="phoneNumber"
                  type="phone"
                  component={TextField}
                  label="Телефон *"
                  validate={composeValidators(required, phone)}
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="email"
                  component={TextField}
                  label="E-mail"
                  validate={composeValidators(required, email)}
                  inputMode="email"
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="defaultCity"
                  component={TextField}
                  label="Город проживания"
                  validate={required}
                  requiredField
                  ref={cityInputRef}
                  onFocus={() => setShowCityInput(true)}
                  autoComplete="off"
                />
              </FieldWrap>
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <ButtonWrap>
                <Button
                  variant="red"
                  size="width100"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить'}
                </Button>
              </ButtonWrap>
            </form>
          )
        }}
      />
      {auth ? (
        <MobileHidden>
          <CreateProfiles currentMe={currentMe} />
        </MobileHidden>
      ) : null}
    </Wrapper>
  )
}

export default CabinetForm
