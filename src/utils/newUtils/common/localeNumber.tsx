type ILocaleNumber = (val: number | string) => string | null

const localeNumber: ILocaleNumber = val =>
  val.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
  }) || null

export default localeNumber
