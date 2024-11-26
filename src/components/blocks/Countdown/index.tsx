import { FC, useEffect, useState } from 'react'
import { pluralize } from '../../../utils/pluralize'
import { Wrapper, Title, CountWrapper, Value, Days, Dots, End } from './styles'
import moment from 'moment'
import { FlexAlign } from 'src/styles/variables'

export interface ITimeLift {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface Props {
  dateStart: string
  dateEnd: string
  timeStart: string
  timeEnd: string
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
    const now = moment().valueOf()
    const start = timeStart
      ? moment(`${dateStart}T${timeStart}`).valueOf()
      : moment(`${dateStart}`).valueOf()
    const end = timeEnd
      ? moment(`${dateEnd}T${timeEnd}`).valueOf()
      : moment(`${dateEnd}`).valueOf()

    if (now < start) {
      setIsStarted(false)
      return start - now
    } else if (now >= start && now <= end) {
      setIsStarted(true)
      return end - now
    } else {
      return 0
    }
  }

  const updateTime = (distance: number) => {
    if (distance > 0) {
      const duration = moment.duration(distance)
      setTimeLeft({
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      })
    }
  }
  useEffect(() => {
    const initialDistance = calculateDistance()
    updateTime(initialDistance)

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
