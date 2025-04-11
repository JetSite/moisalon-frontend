import moment from 'moment';

export const formatDateRangeWithTime = (
  dateStart?: Date,
  dateEnd?: Date,
  timeStart?: string,
  timeEnd?: string,
): string => {
  const start = dateStart ? moment(dateStart) : null;
  const end = dateEnd ? moment(dateEnd) : null;
  const startTime = timeStart
    ? moment(timeStart, 'HH:mm:ss.SSS').format('HH:mm')
    : '';
  const endTime = timeEnd
    ? moment(timeEnd, 'HH:mm:ss.SSS').format('HH:mm')
    : '';

  if (start && end) {
    if (start.isSame(end, 'day')) {
      return `${start.format('DD MMMM YYYY')}\nс ${startTime} до ${endTime}`;
    } else if (start.isSame(end, 'month')) {
      return `с ${start.format('DD MMMM')} ${startTime} до\n${end.format(
        'DD MMMM YYYY',
      )} ${endTime}`;
    } else if (start.isSame(end, 'year')) {
      return `с ${start.format('DD MMMM')} ${startTime} до\n${end.format(
        'DD MMMM YYYY',
      )} ${endTime}`;
    } else {
      return `с ${start.format('DD MMMM YYYY')} ${startTime} до\n${end.format(
        'DD MMMM YYYY',
      )} ${endTime}`;
    }
  }

  return '';
};
