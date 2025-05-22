import { format, parseISO } from 'date-fns'

const DISPLAY_FORMAT = 'yyyy-MM-dd'

const formatDate = (date: Date | string | null): string => {
  if (!date) return ''
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, DISPLAY_FORMAT)
  } catch (error) {
    console.error(`Invalid time format: ${date}`)
    return ''
  }
}

export default formatDate
