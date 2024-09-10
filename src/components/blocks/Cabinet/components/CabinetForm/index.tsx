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
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import {
  CustomWindow,
  IID,
  ISetState,
  InitialValuesForm,
} from 'src/types/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMeInfo, IUser } from 'src/types/me'
import { ICity, IPhoto } from 'src/types'
import { cyrToTranslit } from 'src/utils/translit'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import AddressNoSalonField from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { FormGuardPopup } from 'src/components/blocks/Form/FormGuardPopup'

interface ICabinetFormIvitialValues extends InitialValuesForm {
  phone: string
  email: string
  city: string
  username: string
  birthDate: string
}

interface IUserInput extends Pick<IMeInfo, 'birthDate' | 'phone'> {
  username?: string
  email?: string
  city?: IID
  avatar?: IID
}

export interface CabinetFormProps {
  user: IUser
  photo: IPhoto | null
  setNoPhotoError: Dispatch<SetStateAction<boolean>>
  auth?: boolean
  setDirtyForm: ISetState<boolean>
  dirtyForm: boolean
  cities: ICity[]
}

const CabinetForm: FC<CabinetFormProps> = ({
  photo,
  setNoPhotoError,
  auth,
  setDirtyForm,
  dirtyForm,
  cities,
  user,
}) => {
  const { setMe, setUser, setCity } = useAuthStore(getStoreEvent)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState<boolean>(false)
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [clickCity, setClickCity] = useState<string | null>(null)

  const [addCity] = useMutation(CREATE_CITY)

  const [updateUser] = useMutation(changeMe, {
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

      const findCity = citiesArray.find(e => e.name === clickCity)

      const input: IUserInput = {
        phone: values.phone,
        birthDate: values.birthDate,
      }
      if (values.username !== user?.info.username) {
        input.username = values.username
      }
      if (values.email !== user?.info.email) {
        input.email = values.email
      }
      if (photo.id !== user?.info.avatar?.id) {
        input.avatar = photo.id
      }

      if (!findCity) {
        addCity({
          variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
          onCompleted: data => {
            const findCityData = flattenStrapiResponse(
              data.createCity.data,
            ) as ICity
            input.city = findCityData.id
            setCity(findCityData)
            setCitiesArray(prev => prev.concat(findCityData))

            setLoading(true)
            updateUser({
              variables: {
                id: user?.info.id,
                data: input,
              },
            })
          },
        })
      } else {
        input.city = findCity.id
        setCity(findCity)

        setLoading(true)
        updateUser({
          variables: {
            id: user?.info.id,
            data: input,
          },
        })
      }

      console.log('input', input)
    },
    [photo, clickCity],
  )
  const initialValues: ICabinetFormIvitialValues = {
    phone: user.info.phone,
    email: user.info.email,
    city: user.info.city?.name || '',
    username: user.info.username,
    birthDate: user.info.birthDate || '',
  }

  console.log('initialValues', initialValues)
  console.log('dirtyForm', dirtyForm)

  return (
    <Wrapper>
      <Flex>
        <Title>Мои данные </Title>
        <SubTitle>Пользователь </SubTitle>
      </Flex>
      <AutoFocusedForm
        initialValues={initialValues}
        initialValuesEqual={(initial, values) => {
          return JSON.stringify(initial) === JSON.stringify(values)
        }}
        onSubmit={onSubmit}
        render={({ form, handleSubmit }) => {
          useEffect(() => {
            const unsubscribe = form.subscribe(
              ({ dirty }) => {
                const isNewLogo = !!photo && photo.id !== user.info?.avatar?.id
                isNewLogo ? setDirtyForm(true) : setDirtyForm(dirty)
              },
              { dirty: true },
            )
            return unsubscribe
          }, [form, photo])
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
                  parse={parseFieldsToString}
                  name="city"
                  setClickCity={setClickCity}
                  component={AddressNoSalonField}
                  label="Адрес"
                  requiredField
                  onlyCity
                  noMap
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  label="Дата рождения"
                  name="birthDate"
                  component={TextField}
                  type="date"
                  required
                />
              </FieldWrap>
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <ButtonWrap>
                <Button
                  loading={loading}
                  variant="red"
                  size="width100"
                  type="submit"
                  disabled={!dirtyForm || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить'}
                </Button>
              </ButtonWrap>
            </form>
          )
        }}
      />
      <FormGuardPopup setDirtyForm={setDirtyForm} dirtyForm={dirtyForm} />
      {auth ? (
        <MobileHidden>
          <CreateProfiles user={user} />
        </MobileHidden>
      ) : null}
    </Wrapper>
  )
}

export default CabinetForm
