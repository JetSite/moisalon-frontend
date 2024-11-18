import moment from 'moment'

const TIME_FORMAT = 'HH:mm:ss.SSS'
const DISPLAY_FORMAT = 'HH:mm'

const formatTime = (time: string): string => {
  try {
    return moment(time, TIME_FORMAT).format(DISPLAY_FORMAT)
  } catch (error) {
    console.error(`Invalid time format: ${time}`)
    return ''
  }
}

export default formatTime
