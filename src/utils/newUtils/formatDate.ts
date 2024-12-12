import moment from 'moment'

const DATE_FORMAT = 'HH:mm:ss.SSS'
const DISPLAY_FORMAT = 'YYYY-MM-DD'

const formatDate = (date: Date | string | null): string => {
  if (!date) return ''
  try {
    return moment(date).format(DISPLAY_FORMAT)
  } catch (error) {
    console.error(`Invalid time format: ${date}`)
    return ''
  }
}

export default formatDate
