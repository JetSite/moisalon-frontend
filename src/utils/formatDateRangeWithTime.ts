import { format, parse, isSameDay, isSameMonth, isSameYear, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDateRangeWithTime = (
  dateStart?: Date,
  dateEnd?: Date,
  timeStart?: string,
  timeEnd?: string,
): string => {
  const start = dateStart ? (typeof dateStart === 'string' ? parseISO(dateStart) : dateStart) : null;
  const end = dateEnd ? (typeof dateEnd === 'string' ? parseISO(dateEnd) : dateEnd) : null;
  const startTime = timeStart
    ? format(parse(timeStart, 'HH:mm:ss.SSS', new Date()), 'HH:mm')
    : '';
  const endTime = timeEnd
    ? format(parse(timeEnd, 'HH:mm:ss.SSS', new Date()), 'HH:mm')
    : '';

  if (start && end) {
    if (isSameDay(start, end)) {
      return `${format(start, 'dd MMMM yyyy', { locale: ru })}\nс ${startTime} до ${endTime}`;
    } else if (isSameMonth(start, end)) {
      return `с ${format(start, 'dd MMMM', { locale: ru })} ${startTime} до\n${format(
        end,
        'dd MMMM yyyy',
        { locale: ru },
      )} ${endTime}`;
    } else if (isSameYear(start, end)) {
      return `с ${format(start, 'dd MMMM', { locale: ru })} ${startTime} до\n${format(
        end,
        'dd MMMM yyyy',
        { locale: ru },
      )} ${endTime}`;
    } else {
      return `с ${format(start, 'dd MMMM yyyy', { locale: ru })} ${startTime} до\n${format(
        end,
        'dd MMMM yyyy',
        { locale: ru },
      )} ${endTime}`;
    }
  }

  return '';
};
