import React, { forwardRef } from 'react'
import { Field } from 'react-final-form'
import SelectField from '../SelectField'
import TimeInputField from '../TimeInputField'
import Grid from '@mui/material/Grid'
import { workingTime } from '../../../../utils/validations'
import { workingHoursOptions } from 'src/config/workingTime'

const WorkingTimeField = forwardRef(({ name }, ref) => {
  return (
    <Grid container className={'timeField'} spacing={3} direction="column">
      <Grid item className={'timeField__day'} xs={12} sm={12}>
        <Field
          name={`${name}.startDayOfWeek`}
          label="Начиная c"
          options={workingHoursOptions}
          render={props => {
            return <SelectField {...props} ref={ref} />
          }}
        />
      </Grid>
      <Grid item className={'timeField__day'} xs={12} sm={12}>
        <Field
          name={`${name}.endDayOfWeek`}
          label="По"
          options={workingHoursOptions}
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
  )
})

export default WorkingTimeField
