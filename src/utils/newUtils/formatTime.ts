import { format, parse } from 'date-fns'

const TIME_FORMAT = 'HH:mm:ss.SSS'
const DISPLAY_FORMAT = 'HH:mm'

const formatTime = (time: string | null): string => {
  if (!time) return ''
  try {
    // Parse the time string into a Date object
    const parsedTime = parse(time, TIME_FORMAT, new Date())
    return format(parsedTime, DISPLAY_FORMAT)
  } catch (error) {
    console.error(`Invalid time format: ${time}`)
    return ''
  }
}

export default formatTime
