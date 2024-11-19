import moment from 'moment'

const TIME_FORMAT = 'HH:mm:ss.SSS'
const DISPLAY_FORMAT = 'HH:mm'

const formatTime = (time: string | null): string => {
  if (!time) return ''
  try {
    return moment(time, TIME_FORMAT).format(DISPLAY_FORMAT)
  } catch (error) {
    console.error(`Invalid time format: ${time}`)
    return ''
  }
}

export default formatTime
