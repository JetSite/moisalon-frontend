import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../styles/variables";

const TextFieldStyled = styled(TextField)`
  .MuiInputBase-input {
    font-size: 16px;
  }
  .MuiFormLabel-root {
    font-size: 14px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    .MuiInputBase-input {
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
    }
    .MuiFormLabel-root {
      padding-bottom: 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 12px;
    }
  }
`;

const TextFieldAdapter = forwardRef(
  (
    {
      input,
      meta,
      fullWidth = true,
      maxLength = "99",
      inputMode,
      InputProps,
      color = "",
      ...rest
    },
    ref
  ) => {
    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched;
    let { value, type, ...inputRest } = input;
    if (type === "number") {
      if (value === 0) {
        value = "";
      }
      if (value < 0) {
        value = 0;
      }
      // type = "text";
    }

    return (
      <TextFieldStyled
        inputRef={ref}
        fullWidth={fullWidth}
        value={value}
        type={type}
        {...inputRest}
        {...rest}
        // eslint-disable-next-line
        inputProps={{
          maxLength,
          inputMode: inputMode ? inputMode : null,
        }}
        error={showError}
        helperText={showError ? meta.error || meta.submitError : undefined}
      />
    );
  }
);

export default TextFieldAdapter;
