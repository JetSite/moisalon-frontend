import styled from "styled-components";
import moment from "moment";
import "moment/locale/ru";
import { laptopBreakpoint } from "../../../../styles/variables";

const Text = styled.p`
  font-size: 18px;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`;

export default function Schedule({ workingHours }) {
  const items =
    workingHours?.length > 0 ? (
      <ScheduleItems workingHours={workingHours} />
    ) : (
      <EmptySchedule />
    );

  return <Text>{items}</Text>;
}

function toUpper(day) {
  return day.charAt(0).toUpperCase() + day.substr(1);
}

const currentLocale = "ru";

function ScheduleItems({ workingHours }) {
  const items = workingHours?.map((entry, key) => {
    const start = moment()
      .locale("en")
      .day(entry.startDayOfWeek)
      .locale(currentLocale)
      .hour(entry.startHour)
      .minute(entry.startMinute);
    const end = moment()
      .locale("en")
      .day(entry.endDayOfWeek)
      .locale(currentLocale)
      .hour(entry.endHour)
      .minute(entry.endMinute);
    const startDay = toUpper(start.format("dd"));
    const endDay = toUpper(end.format("dd"));
    const startTime = start.format("HH:mm");
    const endTime = end.format("HH:mm");
    const workingTime =
      startTime === "00:00" && endTime === "23:59"
        ? "круглосуточно"
        : `${startTime} – ${endTime}`;
    if (startDay === endDay) {
      return (
        <div key={key}>
          {startDay}, {workingTime}
        </div>
      );
    }

    return (
      <div key={key}>
        {startDay} &ndash; {endDay}, {workingTime}
      </div>
    );
  });

  return <div>{items}</div>;
}
function EmptySchedule() {
  return <>Не задан</>;
}
