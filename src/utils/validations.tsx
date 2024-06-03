import { parsePhoneNumberFromString } from 'libphonenumber-js'

const hasValue = validator => value => {
  if (!value) {
    return undefined
  }
  return validator(value)
}

export const composeValidators =
  (...validators) =>
  value => {
    for (var i = 0; i < validators.length; i++) {
      const error = validators[i](value)
      if (error) {
        return error
      }
    }
    return undefined
  }

export const required = value =>
  value && value !== '' ? undefined : 'Необходимо заполнить'

export const email = value => {
  const re =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (value) {
    return re.test(value) ? undefined : 'Невалидный Email'
  }
  return undefined
}

export const isUrl = value => {
  const re =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (value) {
    return re.test(value) ? undefined : 'Невалидный URL'
  }
  return undefined
}

export const number = value => {
  if (value === null || value === undefined || value === '' || !isNaN(value)) {
    return undefined
  }
  return 'Только цифры'
}

export const min = limit =>
  hasValue(
    composeValidators(number, value =>
      value < limit ? `Число больше или равно ${limit}` : undefined,
    ),
  )

export const max = limit =>
  hasValue(
    composeValidators(number, value =>
      value > limit ? `Число меньше ${limit}` : undefined,
    ),
  )

export const phone = (value: string) => {
  if (!value) return undefined
  const phoneNumber = value && parsePhoneNumberFromString(value, 'RU')
  if (phoneNumber) {
    return parsePhoneNumberFromString(value, 'RU')?.isValid()
      ? undefined
      : 'Невалидный номер телефона'
  }
  return 'Невалидный номер телефона'
}

export const workingTime = value => {
  if (!value) {
    return undefined
  }

  const { startHour, startMinute, endHour, endMinute } = value
  if (
    startHour * 60 + startMinute >= endHour * 60 + endMinute ||
    startHour > 23 ||
    endHour > 23
  ) {
    return 'Некорректное время работы'
  }
  return undefined
}

export type ILengthValidate = (values: any[]) => string | null

export const lengthValidate: ILengthValidate = values =>
  !values?.length ? 'Должен быть выбран хотя бы один пункт' : null
