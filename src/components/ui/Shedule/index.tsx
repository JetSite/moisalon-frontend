import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ru'
import { laptopBreakpoint } from '../../../styles/variables'
import { IWorkingHours } from 'src/types'
import { FC } from 'react'

const Text = styled.p`
  font-size: 18px;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const Schedule = ({
  workingHours,
}: {
  workingHours: IWorkingHours[]
}) => {
  const items =
    workingHours?.length > 0 ? (
      <ScheduleItems workingHours={workingHours} />
    ) : (
      <EmptySchedule />
    )

  return <Text>{items}</Text>
}

const ScheduleItems: FC<{ workingHours: IWorkingHours[] }> = ({
  workingHours,
}) => {
  return (
    <>
      {workingHours.map((e, i) => {
        return (
          <span style={{ display: 'block', fontSize: '18px' }} key={i}>
            {e.dayOfWeek}, {moment(e.startTime, 'HH:mm:ss.SSS').format('h:mm ')}{' '}
            - {moment(e.endTime, 'HH:mm:ss.SSS').format('HH:mm') + '. '}
          </span>
        )
      })}
    </>
  )
}
function EmptySchedule() {
  return <>Не задан</>
}
