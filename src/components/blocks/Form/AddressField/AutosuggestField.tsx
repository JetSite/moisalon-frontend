import {
  FC,
  useState,
  useCallback,
  useEffect,
  FormEvent,
  forwardRef,
} from 'react'
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest'
import {
  TextField,
  Paper,
  MenuItem,
  InputAdornment,
  CircularProgress,
  BaseTextFieldProps,
} from '@material-ui/core'
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

type CustomInputProps = Omit<Partial<FieldInputProps<string>>, 'onChange'> & {
  onChange: FieldInputProps<string>['onChange']
}

const handleSuggestionsFetchRequested = () => {}

interface RenderInputProps
  extends Pick<AutosuggestFieldProps, 'input' | 'meta'> {
  loading: boolean
  label?: string
  classes: ClassNameMap<string>
  fullWidth?: boolean
}

const InputComponent = forwardRef<HTMLInputElement, RenderInputProps>(
  (props, ref) => {
    const { meta, loading, label, classes, ...rest } = props

    const showError =
      meta &&
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched

    return (
      <TextField
        multiline={true}
        maxRows={2}
        label={label}
        error={showError}
        helperText={showError ? meta.error || meta.submitError : undefined}
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
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
        {...(rest as BaseTextFieldProps)}
      />
    )
  },
)

const StyledMenuItem = withStyles({
  root: {
    whiteSpace: 'normal',
    borderTop: 'solid 1px rgba(0, 0, 0, 0.42)',
    fontSize: '16px',
  },
})(MenuItem)

const renderSuggestion = (
  suggestion: string,
  { isHighlighted }: { isHighlighted: boolean },
) => {
  return <StyledMenuItem selected={isHighlighted}>{suggestion}</StyledMenuItem>
}

const getSuggestionValue = (suggestion: string) => suggestion

const useStyles = makeStyles<Theme, { color?: string }>(theme => ({
  root: ({ color }) => ({
    color,
  }),
  label: ({ color }) => ({
    color,
    textWrap: 'nowrap',
    fontSize: color ? '1.6rem' : '1rem',
    '&.Mui-focused': {
      color,
    },
  }),
  input: ({ color }) => ({
    color,
    '&::placeholder': {
      color,
      fontSize: color ? '1.6rem' : '1rem',
    },
    '&.MuiInput-underline:after': {
      borderBottom: `2px solid ${color}`,
    },
    '&.MuiInput-underline:before': {
      borderBottom: `1px solid ${color}`,
    },
  }),
  container: ({ color }) => ({
    position: 'relative',
    fontSize: color ? '1.6rem' : '1rem',
  }),
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 3,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    padding: '0 !important',
    fontSize: '1.6rem',
  },
}))

interface AutosuggestFieldProps {
  label: string
  meta?: FieldMetaState<any>
  input: CustomInputProps
  suggestions: string[]
  fullWidth: boolean
  loading: boolean
  color?: string
}

const AutosuggestField: FC<AutosuggestFieldProps> = ({
  suggestions,
  loading,
  label,
  color,
  ...rest
}) => {
  const classes = useStyles({ color })
  const [isClearRequested, setIsClearRequested] = useState(false)

  useEffect(() => {
    const el = document.querySelector('.Mui-error') as HTMLElement | null
    if (el) {
      el.focus()
    }
  }, [rest])

  const {
    input: { onChange, name, value },
  } = rest

  const handleSuggestionsClearRequested = useCallback(() => {
    setIsClearRequested(true)
  }, [])

  const handleChange = useCallback(
    (_: FormEvent<HTMLElement>, data: Autosuggest.ChangeEvent) => {
      const { newValue } = data
      if (newValue !== undefined) {
        onChange(newValue)
      }
      setIsClearRequested(false)
    },
    [onChange],
  )

  const handleSelected = useCallback(
    (_: FormEvent<HTMLElement>, data: SuggestionSelectedEventData<string>) => {
      const { suggestion } = data
      if (suggestion !== undefined) {
        onChange(suggestion)
      }
      setIsClearRequested(false)
    },
    [onChange],
  )

  const autosuggestProps = {
    loading,
    suggestions: isClearRequested ? [] : suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    onSuggestionSelected: handleSelected,
    getSuggestionValue,
    renderSuggestion,
  }

  return (
    <div className={classes.root}>
      <Autosuggest
        renderInputComponent={props => (
          <InputComponent
            {...props}
            input={rest.input}
            meta={rest.meta}
            loading={loading}
            label={label}
            classes={classes}
          />
        )}
        {...autosuggestProps}
        inputProps={{
          id: name,
          value: value,
          onChange: handleChange,
          ...rest,
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square className={classes.paper}>
            {options.children}
          </Paper>
        )}
      />
    </div>
  )
}

export default AutosuggestField
