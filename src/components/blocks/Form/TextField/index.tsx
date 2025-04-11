import React, { ChangeEvent, forwardRef, MouseEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../styles/variables';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

const TextFieldStyled = styled(TextField)`
  .MuiInputBase-input {
    font-size: 16px;
    line-height: 1.4;
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

interface Props<T> {
  input: FieldInputProps<T, HTMLElement>;
  meta: FieldMetaState<T>;
  label?: string;
  placeholder?: string;
  maxLength?: number | string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  fullWidth?: boolean;
}

const TextFieldAdapter = forwardRef(
  <T,>(props: Props<T>, ref: React.Ref<HTMLInputElement>) => {
    const {
      input,
      meta,
      fullWidth = true,
      maxLength = '99',
      inputMode,
      ...rest
    } = props;
    const showError =
      ((meta?.submitError && !meta?.dirtySinceLastSubmit) || meta?.error) &&
      meta?.touched;
    const {
      value,
      type = 'text',
      onChange: inputResOnChange,
      ...inputRest
    } = input;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (['number', 'numeric', 'phone'].includes(type)) {
        if (/^\d*$/.test(inputValue)) {
          console.log(/^\d*$/.test(inputValue));

          inputResOnChange(e);
        }
      } else {
        inputResOnChange(e);
      }
    };

    // console.log(type);

    return (
      <TextFieldStyled
        inputRef={ref}
        {...rest}
        onWheel={e => {
          if (type === 'number') {
            (e.target as HTMLInputElement).blur();
          }
        }}
        fullWidth={fullWidth}
        InputLabelProps={{ shrink: type === 'date' || undefined }}
        value={value}
        type={type}
        inputProps={{
          maxLength,
          inputMode,
          onChange,
          ...inputRest,
        }}
        error={showError}
        helperText={showError ? meta.error || meta.submitError : undefined}
      />
    );
  },
);

export default TextFieldAdapter;
