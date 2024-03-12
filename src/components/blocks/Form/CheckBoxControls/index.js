import React, { forwardRef } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckBoxFieldAdapter = forwardRef(({ input, label }, ref) => {
  return <FormControlLabel control={<Checkbox inputRef={ref} {...input} />} label={label} />;
});

export default CheckBoxFieldAdapter;
