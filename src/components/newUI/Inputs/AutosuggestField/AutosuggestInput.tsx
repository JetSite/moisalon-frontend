import {
  CircularProgress,
  InputAdornment,
  TextField,
  BaseTextFieldProps,
} from '@mui/material'
import { ClassNameMap } from '@mui/styles'
import { forwardRef } from 'react'
import { FieldMetaState } from 'react-final-form'

export interface AutosuggestInputProps
  extends Omit<BaseTextFieldProps, 'color' | 'size' | 'multiline'> {
  loading: boolean
  meta?: FieldMetaState<any>
  classes: ClassNameMap<string>
}

const AutosuggestInput = forwardRef<HTMLInputElement, AutosuggestInputProps>(
  ({ meta, loading, label, classes, helperText, ...rest }, ref) => {
    return (
      <TextField
        multiline={false}
        label={label}
        error={Boolean(meta?.error || meta?.submitError)}
        helperText={helperText || meta?.submitError}
        InputLabelProps={{
          classes: {
            root: classes.label,
            focused: classes.label,
          },
        }}
        InputProps={{
          classes: {
            input: classes.input,
            focused: classes.input,
          },
          inputRef: ref,
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size={20} aria-label="Loading suggestions..." />
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    )
  },
)
AutosuggestInput.displayName = 'AutosuggestInput'

export default AutosuggestInput
