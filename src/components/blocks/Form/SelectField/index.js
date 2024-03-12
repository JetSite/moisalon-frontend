import React, { forwardRef } from "react";
import Select from "../Select";

const SelectField = forwardRef(({ input, meta, ...rest }, ref) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;
  const errorText = showError ? meta.error || meta.submitError : undefined;

  return (
    <Select
      {...input}
      {...rest}
      error={showError}
      errorText={errorText}
      ref={ref}
    />
  );
});

export default SelectField;
