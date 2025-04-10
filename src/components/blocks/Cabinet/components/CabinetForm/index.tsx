import { useMutation } from '@apollo/client';
import {
  useCallback,
  useState,
  useRef,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import {
  composeValidators,
  email,
  phone,
  required,
  validDate,
} from '../../../../../utils/validations';
import Button from '../../../../ui/Button';
import { TextField } from '../../../Form';
import AutoFocusedForm from '../../../Form/AutoFocusedForm';
import ErrorPopup from '../../../Form/Error';
import {
  Wrapper,
  Title,
  SubTitle,
  FieldWrap,
  FieldStyled,
  ButtonWrap,
  Flex,
} from './styled';
import CreateProfiles from '../CreateProfiles';
import { MobileHidden } from '../../../../../styles/common';
import useAuthStore from 'src/store/authStore';
import { getStoreEvent } from 'src/store/utils';
import { CHANGE_ME } from 'src/api/graphql/me/mutations/changeMe';
import { IID, ISetState, InitialValuesForm } from 'src/types/common';
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse';
import { IMeInfo, IUser } from 'src/types/me';
import { ICity, IPhoto } from 'src/types';
import { cyrToTranslit } from 'src/utils/translit';
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers';
import AddressNoSalonField from 'src/components/blocks/Form/AddressField/AddressNoSalonField';
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity';
import { FormGuardPopup } from 'src/components/blocks/Form/FormGuardPopup';
import { FormApi } from 'final-form';

interface ICabinetFormValues extends InitialValuesForm {
  phone: string;
  email: string;
  city: string;
  username: string;
  birthDate: string;
}

interface IUserInput extends Pick<IMeInfo, 'birthDate' | 'phone'> {
  username?: string;
  email?: string;
  city?: IID;
  avatar?: IID;
}

export interface CabinetFormProps {
  user: IUser;
  photo: IPhoto | null;
  setNoPhotoError: Dispatch<SetStateAction<boolean>>;
  auth?: boolean;
  setDirtyForm: ISetState<boolean>;
  dirtyForm: boolean;
  cities: ICity[];
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
  const { setMe, setUser, setCity } = useAuthStore(getStoreEvent);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities);
  const [clickCity, setClickCity] = useState<string | null>(null);
  const formRef = useRef<FormApi<ICabinetFormValues>>();

  const [addCity] = useMutation(CREATE_CITY, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message);
      console.log(errorMessages);
      setErrors(['Ошибка при добавлении города']);
    },
  });

  const [updateUser] = useMutation(CHANGE_ME, {
    onCompleted: async data => {
      const prepareData = flattenStrapiResponse(
        data.updateUsersPermissionsUser,
      ) as IMeInfo;
      if (prepareData) {
        setMe({ info: prepareData as IMeInfo });
        setUser({
          info: { ...prepareData } as IMeInfo,
          owner: { ...user.owner },
          favorite: { ...user.favorite },
          orders: { ...user.orders },
        });
      }

      setLoading(false);
    },
    onError: error => {
      setLoading(false);
      const errorMessages = error.graphQLErrors.map(e => e.message);
      console.log(errorMessages);
      setErrors(['Такие имя или почта уже существуют']);
    },
  });

  const initialValues = useMemo<ICabinetFormValues>(
    () => ({
      phone: user.info.phone,
      email: user.info.email,
      city: user.info.city?.name || '',
      username: user.info.username,
      birthDate: user.info.birthDate || '',
    }),
    [user],
  );

  const onSubmit = useCallback(
    async (values: ICabinetFormValues) => {
      if (!photo) {
        setNoPhotoError(true);
        setErrors(['Необходимо добавить фото']);
        return;
      }
      if (!values.city) {
        setErrors(['Введите адресс']);
        return;
      }
      if (values.city !== clickCity || !clickCity) {
        setErrors(['Выберите город из выпадающего списка']);
        return;
      }

      const findCity = citiesArray.find(e => e.name === values.city);

      const input: IUserInput = {
        phone: values.phone,
        birthDate: values.birthDate,
        username:
          values.username !== user.info.username ? values.username : undefined,
        email: values.email !== user.info.email ? values.email : undefined,
        avatar: photo.id !== user.info.avatar?.id ? photo.id : undefined,
      };
      console.log(input);

      const proceedUpdate = (city: ICity) => {
        input.city = city.id;
        setCity(city);
        setLoading(true);
        updateUser({
          variables: {
            id: user.info.id,
            data: input,
          },
        });
      };

      if (!findCity) {
        addCity({
          variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
          onCompleted: data => {
            const newCity = flattenStrapiResponse(
              data.createCity.data,
            ) as ICity;
            setCitiesArray(prev => prev.concat(newCity));
            proceedUpdate(newCity);
          },
        });
      } else {
        proceedUpdate(findCity);
      }
    },
    [photo, clickCity],
  );

  useEffect(() => {
    if (!formRef.current) return;
    const unsubscribe = formRef.current.subscribe(
      ({ dirty }) => {
        const isNewLogo = !!photo && photo.id !== user.info?.avatar?.id;
        isNewLogo ? setDirtyForm(true) : setDirtyForm(dirty);
      },
      { dirty: true },
    );
    return unsubscribe;
  }, [formRef.current, photo, setDirtyForm, user.info?.avatar?.id]);

  return (
    <Wrapper>
      <Flex>
        <Title>Мои данные </Title>
        <SubTitle>Пользователь </SubTitle>
      </Flex>
      <AutoFocusedForm<ICabinetFormValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ form, handleSubmit }) => {
          formRef.current = form;
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
                <FieldStyled
                  name="phone"
                  type="phone"
                  label="Телефон *"
                  validate={composeValidators(required, phone)}
                  component={TextField}
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
                  onlyCity
                  label="Город"
                  requiredField
                  noMap
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  label="Дата рождения"
                  name="birthDate"
                  component={TextField}
                  validate={validDate}
                  type="date"
                  required
                />
              </FieldWrap>
              <ErrorPopup errors={errors} setErrors={setErrors} />
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
          );
        }}
      />
      <FormGuardPopup setDirtyForm={setDirtyForm} dirtyForm={dirtyForm} />
      {auth ? (
        <MobileHidden>
          <CreateProfiles user={user} />
        </MobileHidden>
      ) : null}
    </Wrapper>
  );
};

export default CabinetForm;
