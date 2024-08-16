import {
  IWorkingHoursInput,
  IWorkingHoursInputResolve,
} from './transformWorkingHoursInput'

export const reverseTransformWorkingHours = (
  options: { value: string; label: string }[],
  resolvedWorkingHours: IWorkingHoursInputResolve[],
): IWorkingHoursInput[] => {
  let result: IWorkingHoursInput[] = []

  if (!resolvedWorkingHours.length) return result

  let startDay = options.find(
    opt => opt.label === resolvedWorkingHours[0].dayOfWeek,
  )
  let endDay = startDay

  let [startHour, startMinute] = resolvedWorkingHours[0].startTime
    .split(':')
    .map(Number)
  let [endHour, endMinute] = resolvedWorkingHours[0].endTime
    .split(':')
    .map(Number)

  for (let i = 1; i < resolvedWorkingHours.length; i++) {
    const currentDay = options.find(
      opt => opt.label === resolvedWorkingHours[i].dayOfWeek,
    )

    const [currentStartHour, currentStartMinute] = resolvedWorkingHours[
      i
    ].startTime
      .split(':')
      .map(Number)
    const [currentEndHour, currentEndMinute] = resolvedWorkingHours[i].endTime
      .split(':')
      .map(Number)

    if (
      currentStartHour === startHour &&
      currentStartMinute === startMinute &&
      currentEndHour === endHour &&
      currentEndMinute === endMinute
    ) {
      endDay = currentDay
    } else {
      result.push({
        startDayOfWeek: startDay?.value as string,
        endDayOfWeek: endDay?.value as string,
        startHour,
        startMinute,
        endHour,
        endMinute,
      })

      startDay = currentDay
      endDay = currentDay
      startHour = currentStartHour
      startMinute = currentStartMinute
      endHour = currentEndHour
      endMinute = currentEndMinute
    }
  }

  result.push({
    startDayOfWeek: startDay?.value as string,
    endDayOfWeek: endDay?.value as string,
    startHour,
    startMinute,
    endHour,
    endMinute,
  })

  return result
}
