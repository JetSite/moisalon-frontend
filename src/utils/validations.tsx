import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Тип для функции-валидатора
export type Validator<T = unknown> = (value: T) => string | undefined;

export const hasValue =
  <T,>(validator: Validator<T>): Validator<T> =>
  value => {
    if (!value) {
      return undefined;
    }
    return validator(value);
  };

export const composeValidators =
  <T,>(...validators: Validator<T>[]): Validator<T> =>
  value => {
    for (let i = 0; i < validators.length; i++) {
      const error = validators[i](value);
      if (error) {
        return error;
      }
    }
    return undefined;
  };

export const required: Validator<string> = value =>
  value && value !== '' ? undefined : 'Необходимо заполнить';

export const email: Validator<string> = value => {
  const re =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value) {
    return re.test(value) ? undefined : 'Невалидный Email';
  }
  return undefined;
};

export const isUrl: Validator<string> = value => {
  const re =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if (value) {
    return re.test(value) ? undefined : 'Невалидный URL';
  }
  return undefined;
};

export const number: Validator<string | number> = value => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    !Number.isNaN(Number(value))
  ) {
    return undefined;
  }
  return 'Только цифры';
};

export const min = (limit: number): Validator<number> =>
  hasValue(
    composeValidators(number, value => {
      const numberValue = Number(value);
      if (isNaN(numberValue)) return 'Ведите число';
      return numberValue < limit
        ? `Число больше или равно ${limit}`
        : undefined;
    }),
  );

export const max = (limit: number): Validator<number> =>
  hasValue(
    composeValidators(number, value => {
      const numberValue = Number(value);
      if (isNaN(numberValue)) return 'Ведите числоs';
      return numberValue > limit ? `Число меньше ${limit}` : undefined;
    }),
  );

export const phone: Validator<string> = value => {
  if (!value) return undefined;
  const phoneNumber = parsePhoneNumberFromString(value, 'RU');
  if (phoneNumber) {
    return phoneNumber.isValid() ? undefined : 'Невалидный номер телефона';
  }
  return 'Невалидный номер телефона';
};

// Тип для времени работы
export interface IWorkingTime {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export const workingTime: Validator<IWorkingTime> = value => {
  if (!value) {
    return undefined;
  }

  const { startHour, startMinute, endHour, endMinute } = value;
  if (
    startHour * 60 + startMinute >= endHour * 60 + endMinute ||
    startHour > 23 ||
    endHour > 23
  ) {
    return 'Некорректное время работы';
  }
  return undefined;
};

export type ILengthValidate = (values: unknown[]) => string | null;

export const lengthValidate: ILengthValidate = values =>
  !values?.length ? 'Должен быть выбран хотя бы один пункт' : null;

export const validDate: Validator<string> = value => {
  if (!value) return undefined;
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'Некорректная дата';
  const year = date.getFullYear();
  if (year < 1900 || year > 2025) return 'Год должен быть в пределах 1900–2025';
  return undefined;
};
