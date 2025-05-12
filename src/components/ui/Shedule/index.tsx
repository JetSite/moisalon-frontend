import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';
import { laptopBreakpoint } from '../../../styles/variables';
import { IWorkingHours } from 'src/types';

const ScheduleContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`;

export const Schedule = ({
  workingHours,
}: {
  workingHours: IWorkingHours[];
}) => {
  if (!workingHours?.length) {
    return <EmptySchedule />;
  }

  const groupedHours = workingHours.reduce((groups, hours) => {
    const key = `${hours.startTime}-${hours.endTime}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(hours);
    return groups;
  }, {} as Record<string, IWorkingHours[]>);

  const formattedGroups = Object.values(groupedHours).map(group => {
    const daysOrder = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];
    const sortedDays = [...group].sort(
      (a, b) => daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek),
    );

    const ranges: IWorkingHours[][] = [];
    let currentRange: IWorkingHours[] = [sortedDays[0]];

    for (let i = 1; i < sortedDays.length; i++) {
      const prevDayIndex = daysOrder.indexOf(sortedDays[i - 1].dayOfWeek);
      const currDayIndex = daysOrder.indexOf(sortedDays[i].dayOfWeek);

      if (currDayIndex - prevDayIndex === 1) {
        currentRange.push(sortedDays[i]);
      } else {
        ranges.push([...currentRange]);
        currentRange = [sortedDays[i]];
      }
    }

    if (currentRange.length > 0) {
      ranges.push(currentRange);
    }

    return ranges.map(range => {
      const firstDay = range[0];
      const lastDay = range[range.length - 1];

      const formattedDays =
        range.length === 1
          ? `${firstDay.dayOfWeek}`
          : `${firstDay.dayOfWeek} - ${lastDay.dayOfWeek}`;

      const formattedHours = `с ${moment(
        firstDay.startTime,
        'HH:mm:ss.SSS',
      ).format('H:mm')} до ${moment(firstDay.endTime, 'HH:mm:ss.SSS').format(
        'H:mm',
      )}`;

      return (
        <ScheduleContainer key={`${formattedDays}-${formattedHours}`}>
          <Text>{formattedDays},</Text>
          <Text>{formattedHours}</Text>
        </ScheduleContainer>
      );
    });
  });

  return <>{formattedGroups.flat()}</>;
};

function EmptySchedule() {
  return <Text>Не задан</Text>;
}
