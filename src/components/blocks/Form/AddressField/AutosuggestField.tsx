import {
  FC,
  useState,
  useCallback,
  useEffect,
  FormEvent,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react'
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest'
import {
  TextField,
  Paper,
  MenuItem,
  InputAdornment,
  CircularProgress,
  TextFieldProps,
  StandardTextFieldProps,
  BaseTextFieldProps,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps,
} from 'react-final-form'
import { ISetState } from 'src/types/common'

const handleSuggestionsFetchRequested = () => {}

interface RenderInputProps
  extends Autosuggest.RenderInputComponentProps,
    Pick<FieldRenderProps<string, HTMLElement>, 'input' | 'meta'> {
  loading: boolean
  label?: string
}

const InputComponent = forwardRef<HTMLInputElement, RenderInputProps>(
  (props, ref) => {
    const { meta, loading, ...rest } = props

    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched

    return (
      <TextField
        fullWidth
        multiline={true}
        maxRows={2}
        error={showError}
        helperText={showError ? meta.error || meta.submitError : undefined}
        InputProps={{
          inputRef: ref, // Используем forwardRef для корректной передачи ref
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

const useStyles = makeStyles(theme => ({
  root: {},
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
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
    zIndex: 1,
    width: '100%',
    padding: '0 !important',
  },
}))

interface AutosuggestFieldProps {
  label: string
  meta: FieldMetaState<any>
  input: FieldInputProps<string>
  suggestions: string[]
  fullWidth: boolean
  loading: boolean
}

const AutosuggestField: FC<AutosuggestFieldProps> = ({
  suggestions,
  loading,
  label,
  ...rest
}) => {
  const classes = useStyles()
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
