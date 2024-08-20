import { useMutation } from '@apollo/client'
import {
  useCallback,
  useState,
  useRef,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from 'react'
import { Field } from 'react-final-form'
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
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import { CustomWindow, IID, InitialValuesForm } from 'src/types/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMeInfo } from 'src/types/me'
import { IPhoto } from 'src/types'
import { cyrToTranslit } from 'src/utils/translit'
import { authConfig } from 'src/api/authConfig'
import useBaseStore from 'src/store/baseStore'

declare let window: CustomWindow

interface ICabinetFormIvitialValues extends InitialValuesForm {
  phone: string
  email: string
  city: string
  username: string
}

interface Props {
  photo: IPhoto | null
  setNoPhotoError: Dispatch<SetStateAction<boolean>>
  auth?: boolean
  avatarLoading?: boolean
}

const CabinetForm: FC<Props> = ({
  photo,
  setNoPhotoError,
  auth,
  avatarLoading,
}) => {
  const { user } = useAuthStore(getStoreData)
  const { cities } = useBaseStore(getStoreData)
  const { setMe, setUser, setCity } = useAuthStore(getStoreEvent)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState<boolean>(false)
  const [cityInput, setCityInput] = useState<string>('')
  const [cityName, setCityName] = useState<IID | null>(null)
  const [showCityInput, setShowCityInput] = useState<boolean>(false)
  const cityInputRef = useRef<HTMLDivElement>(null)
  const cityPopupRef = useRef<HTMLDivElement>(null)

  const changeCity = (city: string) => {
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityInputRef.current &&
        !cityInputRef.current.contains(event.target as Node) &&
        cityPopupRef.current &&
        !cityPopupRef.current.contains(event.target as Node)
      ) {
        setShowCityInput(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const [mutate] = useMutation(changeMe, {
    onCompleted: async data => {
      const prepareData = flattenStrapiResponse(data.updateUsersPermissionsUser)
      if (prepareData) {
        console.log(prepareData)
        setMe({ info: prepareData as IMeInfo })
        setUser({
          info: { ...prepareData } as IMeInfo,
          owner: { ...user?.owner },
          favorite: { ...user?.favorite },
        })
      }

      setLoading(false)
    },
    onError: error => {
      setLoading(false)
      const errorMessages = error.graphQLErrors.map(e => e.message)
      console.log(errorMessages)
      setErrors(['Такие имя или почта уже существуют'])
      setErrorPopupOpen(true)
    },
  })

  const onSubmit = useCallback(
    async (values: { [key: string]: string }) => {
      if (!photo) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото'])
        setErrorPopupOpen(true)
        return
      }
      const city = cities.find(e => e.name === values.city)

      const input = {
        city: city?.id,
        username: values.username,
        email: values.email,
        phone: values.phone,
        // avatar: photoId,
      }

      setLoading(true)
      mutate({
        variables: {
          id: user?.info.id,
          data: input,
        },
      })
      city && setCity(city)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo],
  )
  if (user) {
    const initialValues: ICabinetFormIvitialValues = {
      phone: user.info.phone,
      email: user.info.email,
      city: user.info.city?.name || '',
      username: user.info.username,
    }

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
              setCityName={setCityName}
              cityName={cityName}
            />
          )}
        </Flex>
        <AutoFocusedForm
          initialValues={initialValues}
          subscription={{ values: true }}
          mutators={{
            setCity: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value)
            },
          }}
          onSubmit={onSubmit}
          render={({ form, handleSubmit, pristine, values }) => {
            changeCity(values.city)
            window.setFormValue = form.mutators.setCity
            return (
              <form onSubmit={handleSubmit}>
                <FieldWrap>
                  <FieldStyled
                    name="username"
                    component={TextField}
                    label="Имя"
                    validate={required}
                    requiredField
                  />
                </FieldWrap>
                <FieldWrap>
                  <Field
                    name="phone"
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
                    name="city"
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
                    loading={avatarLoading || loading}
                    variant="red"
                    size="width100"
                    type="submit"
                    disabled={pristine || loading}
                  >
                    {loading || avatarLoading ? 'Подождите' : 'Сохранить'}
                  </Button>
                </ButtonWrap>
              </form>
            )
          }}
        />
        {auth ? (
          <MobileHidden>
            <CreateProfiles user={user} />
          </MobileHidden>
        ) : null}
      </Wrapper>
    )
  }
  return <></>
}

export default CabinetForm
