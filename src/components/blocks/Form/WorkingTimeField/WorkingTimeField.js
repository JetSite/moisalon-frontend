import React, { forwardRef } from "react";
import { Field } from "react-final-form";
import SelectField from "../SelectField";
import { options } from "./WorkingTime";
import TimeInputField from "../TimeInputField";
import Grid from "@material-ui/core/Grid";
import { workingTime } from "../../../../utils/validations";

const WorkingTimeField = forwardRef(({ name }, ref) => {
  return (
    <Grid container className={"timeField"} spacing={3} direction="column">
      <Grid item className={"timeField__day"} xs={12} sm={12}>
        <Field
          name={`${name}.startDayOfWeek`}
          label="Начиная c"
          options={options}
          render={(props) => {
            return <SelectField {...props} ref={ref} />;
          }}
        />
      </Grid>
      <Grid item className={"timeField__day"} xs={12} sm={12}>
        <Field
          name={`${name}.endDayOfWeek`}
          label="По"
          options={options}
          component={SelectField}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Field
          name={name}
          component={TimeInputField}
          label="Время работы"
          validate={workingTime}
        />
      </Grid>
    </Grid>
  );
});

export default WorkingTimeField;
