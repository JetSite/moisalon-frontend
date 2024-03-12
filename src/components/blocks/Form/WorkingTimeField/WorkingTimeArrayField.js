import React from "react";
import WorkingTimeField from "./WorkingTimeField";
import AutoFocusedArrayField from "../AutoFocusedArrayField";

const WorkingTimeArrayField = ({ name }) => {
  const arrayProps = {
    name,
    fieldComponent: WorkingTimeField,
    initialValues: {
      startDayOfWeek: "",
      endDayOfWeek: "",
      startHour: "0",
      startMinute: "0",
      endHour: "23",
      endMinute: "59",
    },
    title: "период",
  };

  return <AutoFocusedArrayField {...arrayProps} />;
};

export default WorkingTimeArrayField;
