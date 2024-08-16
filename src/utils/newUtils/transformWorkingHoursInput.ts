import { IOptions } from 'src/components/blocks/Form/WorkingTimeField/WorkingTime'

export interface IWorkingHoursInput {
  startDayOfWeek: string
  endDayOfWeek: string
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}

export interface IWorkingHoursInputResolve {
  dayOfWeek: string
  startTime: string
  endTime: string
}

export type ITransformWorkingHours = (
  options: IOptions[],
  workingHours: IWorkingHoursInput[],
) => IWorkingHoursInputResolve[]

const formatTime = (hour: number, minute: number) => {
  const h = String(hour).padStart(2, '0')
  const m = String(minute).padStart(2, '0')
  return `${h}:${m}:00.000`
}

export const transformWorkingHours: ITransformWorkingHours = (
  options,
  workingHours,
) => {
  let result: IWorkingHoursInputResolve[] = []

  workingHours.forEach((period: IWorkingHoursInput) => {
    const startIndex = options.findIndex(
      opt => opt.value === period.startDayOfWeek,
    )
    const endIndex = options.findIndex(opt => opt.value === period.endDayOfWeek)

    for (let i = startIndex; i <= endIndex; i++) {
      const index = result.findIndex(e => e.dayOfWeek === options[i]?.value)

      if (index !== -1) {
        result[index] = {
          dayOfWeek: options[i]?.label,
          startTime: formatTime(period.startHour, period.startMinute),
          endTime: formatTime(period.endHour, period.endMinute),
        }
      } else {
        result.push({
          dayOfWeek: options[i]?.label,
          startTime: formatTime(period.startHour, period.startMinute),
          endTime: formatTime(period.endHour, period.endMinute),
        })
      }
    }
  })

  return result
}
