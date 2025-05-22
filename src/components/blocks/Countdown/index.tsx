import { FC, useEffect, useState } from 'react'
import { pluralize } from '../../../utils/pluralize'
import { Wrapper, Title, CountWrapper, Value, Days, Dots, End } from './styles'
import { FlexAlign } from 'src/styles/variables'
import { format, parseISO, differenceInMilliseconds } from 'date-fns'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

const TIME_ZONE = 'Europe/Moscow'

export interface ITimeLift {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface Props {
  dateStart: Date
  dateEnd: Date
  timeStart?: string
  timeEnd?: string
  titleStart?: string
  titleEnd?: string
  text: string
  align: keyof typeof FlexAlign
}

const Countdown: FC<Props> = ({
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  titleStart,
  titleEnd,
  text,
  align,
}) => {
  const [timeLeft, setTimeLeft] = useState<ITimeLift>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isStarted, setIsStarted] = useState(false)

  const calculateDistance = () => {
    try {
      // Get current time in Moscow timezone
      const now = new Date()

      // Parse start and end dates/times in Moscow timezone
      const startDate =
        typeof dateStart === 'string' ? parseISO(dateStart) : dateStart
      const endDate = typeof dateEnd === 'string' ? parseISO(dateEnd) : dateEnd

      const start = timeStart
        ? toZonedTime(
            `${format(startDate, 'yyyy-MM-dd')}T${timeStart}`,
            TIME_ZONE,
          )
        : toZonedTime(startDate, TIME_ZONE)

      const end = timeEnd
        ? toZonedTime(`${format(endDate, 'yyyy-MM-dd')}T${timeEnd}`, TIME_ZONE)
        : toZonedTime(endDate, TIME_ZONE)

      const moscowNow = toZonedTime(now, TIME_ZONE)

      if (moscowNow < start) {
        setIsStarted(false)
        return differenceInMilliseconds(start, moscowNow)
      } else if (moscowNow >= start && moscowNow <= end) {
        setIsStarted(true)
        return differenceInMilliseconds(end, moscowNow)
      } else {
        return 0
      }
    } catch (error) {
      console.error('Invalid date format:', error)
      return 0
    }
  }

  const updateTime = (distance: number) => {
    if (distance > 0) {
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      })
    }
  }
  useEffect(() => {
    const initialDistance = calculateDistance()
    updateTime(initialDistance)

    if (initialDistance <= 0) {
      return
    }

    const interval = setInterval(() => {
      const updatedDistance = calculateDistance()
      if (updatedDistance > 0) {
        updateTime(updatedDistance)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dateStart, dateEnd, timeStart, timeEnd])

  return (
    <Wrapper>
      {timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds >
      0 ? (
        <>
          <Title align={align}>{!isStarted ? titleStart : titleEnd}</Title>
          <CountWrapper align={align}>
            <Days>{`${timeLeft.days} ${pluralize(
              timeLeft.days,
              'день',
              'дня',
              'дней',
            )}`}</Days>
            <Value>{String(timeLeft.hours).padStart(2, '0')}</Value>
            <Dots>:</Dots>
            <Value>{String(timeLeft.minutes).padStart(2, '0')}</Value>
            <Dots>:</Dots>
            <Value>{String(timeLeft.seconds).padStart(2, '0')}</Value>
          </CountWrapper>
        </>
      ) : (
        <End>{text}</End>
      )}
    </Wrapper>
  )
}

export default Countdown
