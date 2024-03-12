import React, { forwardRef } from "react";
import TimeSpanInput from "../TimeSpanInput";

const TimeInputField = forwardRef(({ input, meta, ...rest }, ref) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;
  const errorText = showError ? meta.error || meta.submitError : undefined;

  const timeInputProps = {
    ...input,
    ...rest,
    errorText,
    showError,
  };

  return <TimeSpanInput {...timeInputProps} ref={ref} />;
});

export default TimeInputField;
