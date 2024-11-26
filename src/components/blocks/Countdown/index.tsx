import { FC, useEffect, useState } from 'react'
import { pluralize } from '../../../utils/pluralize'
import { Wrapper, Title, CountWrapper, Value, Days, Dots, End } from './styles'
import moment from 'moment'
import { CustomAlign } from 'src/styles/variables'

interface Props {
  dateStart: string
  dateEnd: string
  timeStart: string
  timeEnd: string
  titleStart?: string
  titleEnd?: string
  text: string
  align: keyof typeof CustomAlign
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
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
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
      setDays(duration.days())
      setHours(duration.hours())
      setMinutes(duration.minutes())
      setSeconds(duration.seconds())
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
    <>
      {seconds != null ? (
        <Wrapper>
          {seconds != null && (
            <>
              {days + hours + minutes + seconds > 0 ? (
                <>
                  <Title align={align}>
                    {!isStarted ? titleStart : titleEnd}
                  </Title>
                  <CountWrapper align={align}>
                    <Days>{`${days} ${pluralize(
                      days,
                      'день',
                      'дня',
                      'дней',
                    )}`}</Days>
                    <Value>{String(hours).padStart(2, '0')}</Value>
                    <Dots>:</Dots>
                    <Value>{String(minutes).padStart(2, '0')}</Value>
                    <Dots>:</Dots>
                    <Value>{String(seconds).padStart(2, '0')}</Value>
                  </CountWrapper>
                </>
              ) : (
                <End>{text}</End>
              )}
            </>
          )}
        </Wrapper>
      ) : null}
    </>
  )
}

export default Countdown
