import React, { useCallback, useState } from "react";
import Select from "../Select";
import TimeSpanInput from "../TimeSpanInput";
import Grid from "@material-ui/core/Grid";

export const options = [
  {
    label: "Понедельник",
    value: "MONDAY",
  },
  {
    label: "Вторник",
    value: "TUESDAY",
  },
  {
    label: "Среда",
    value: "WEDNESDAY",
  },
  {
    label: "Четверг",
    value: "THURSDAY",
  },
  {
    label: "Пятница",
    value: "FRIDAY",
  },
  {
    label: "Суббота",
    value: "SATURDAY",
  },
  {
    label: "Воскресенье",
    value: "SUNDAY",
  },
];

const allOptions = [
  {
    label: "",
    value: "",
  },
  ...options,
];

const initialWorkingTime = {
  startDayOfWeek: "",
  endDayOfWeek: "",
  startHour: "0",
  startMinute: "0",
  endHour: "23",
  endMinute: "59",
};

const WorkingTime = ({ onChange }) => {
  const [workingTime, setWorkingTime] = useState(initialWorkingTime);
  const onStartDayOfWeekChanged = useCallback(
    (event) => {
      onChange({
        ...workingTime,
        startDayOfWeek: event.target.value,
        endDayOfWeek: options[options.length - 1].value,
      });
      setWorkingTime(initialWorkingTime);
    },
    [onChange, workingTime]
  );

  const onEndDayOfWeekChanged = useCallback(
    (event) => {
      onChange({
        ...workingTime,
        startDayOfWeek: options[0].value,
        endDayOfWeek: event.target.value,
      });
      setWorkingTime(initialWorkingTime);
    },
    [onChange, workingTime]
  );

  const onWorkingTimeChanged = useCallback(
    (time) => {
      const value = {
        ...time,
        startDayOfWeek: options[0].value,
        endDayOfWeek: options[options.length - 1].value,
      };

      onChange(value);
      setWorkingTime(initialWorkingTime);
    },
    [onChange]
  );

  return (
    <Grid container className={"timeField"} spacing={3}>
      <Grid item xs={12} sm={12}>
        <Select
          name="_startDayOfWeek"
          label="Начиная c"
          options={allOptions}
          value={workingTime.startDayOfWeek}
          onChange={onStartDayOfWeekChanged}
          fullWidth={true}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Select
          name="_endDayOfWeek"
          label="По"
          options={allOptions}
          value={workingTime.endDayOfWeek}
          onChange={onEndDayOfWeekChanged}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TimeSpanInput
          name="_workingTime"
          label="Время работы"
          onChange={onWorkingTimeChanged}
          value={workingTime}
        />
      </Grid>
    </Grid>
  );
};

export default WorkingTime;
