import { FC, useState, useCallback, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import { TextField, Paper, MenuItem } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { FieldInputProps, FieldMetaState } from 'react-final-form'

const handleSuggestionsFetchRequested = () => {}

interface RenderInputProps extends Autosuggest.RenderInputComponentProps {
  meta: FieldMetaState<any>
}

const InputComponent = (props: RenderInputProps) => {
  const { inputRef = () => {}, ref, meta, ...rest } = props
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
        inputRef: (node: HTMLInputElement) => {
          ref(node)
          inputRef(node)
        },
      }}
      {...rest}
    />
  )
}

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
}

const AutosuggestField: FC<AutosuggestFieldProps> = ({
  suggestions,
  label,
  ...rest
}) => {
  const classes = useStyles()
  const [isClearRequested, setIsClearRequested] = useState(false)

  useEffect(() => {
    const el = document.querySelector('.Mui-error')
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
    (event, data) => {
      const { newValue } = data
      if (newValue !== undefined) {
        onChange(newValue)
      }
      setIsClearRequested(false)
    },
    [onChange],
  )

  const handleSelected = useCallback(
    (event, data) => {
      const { suggestion } = data
      if (suggestion !== undefined) {
        onChange(suggestion)
      }
      setIsClearRequested(false)
    },
    [onChange],
  )

  const autosuggestProps = {
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
        renderInputComponent={props => InputComponent({ label, ...props })}
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
