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

declare let window: CustomWindow

interface ICabinetFormIvitialValues extends InitialValuesForm {
  phone: string
  email: string
  city: string
  username: string
}

interface Props {
  photo?: IPhoto
  setNoPhotoError: Dispatch<SetStateAction<boolean>>
  auth?: boolean
}

const CabinetForm: FC<Props> = ({ photo, setNoPhotoError, auth }) => {
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState<boolean>(false)
  const [cityInput, setCityInput] = useState<string>('')
  const [cityId, setCityId] = useState<IID | null>(null)
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

  console.log(me)

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
      prepareData && setMe({ info: prepareData as IMeInfo })
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
    async (values: { [key: string]: string }) => {
      // if (!photoId) {
      //   setNoPhotoError(true)
      //   setErrors(['Необходимо добавить фото'])
      //   setErrorPopupOpen(true)
      //   return
      // }
      const input = {
        city: '1',
        username: values.username,
        email: values.email,
        phone: values.phone,
        // avatar: photoId,
      }

      setLoading(true)
      mutate({
        variables: {
          id: me?.info.id,
          data: input,
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo],
  )
  if (me) {
    const initialValues: ICabinetFormIvitialValues = {
      phone: me.info.phone,
      email: me.info.email,
      city: me.info.city?.cityName || '',
      username: me.info.username,
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
              setCityId={setCityId}
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
            <CreateProfiles currentMe={me} />
          </MobileHidden>
        ) : null}
      </Wrapper>
    )
  }
  return <></>
}

export default CabinetForm
