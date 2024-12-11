import { FC, useCallback } from 'react'
import { Paper } from '@material-ui/core'
import { FieldInputProps } from 'react-final-form'
import AutosuggestInput, { AutosuggestInputProps } from './AutosuggestInput'
import { StyledMenuItem, getAutosuggestStyles } from './AutosuggestStyles'
import Autosuggest, {
  OnSuggestionsClearRequested,
  OnSuggestionSelected,
  SuggestionsFetchRequested,
} from 'react-autosuggest'

export interface AutosuggestHandlers {
  handleFetch: SuggestionsFetchRequested
  handleClear?: OnSuggestionsClearRequested
  handleSelected?: OnSuggestionSelected<string>
}

export interface AutosuggestFieldProps
  extends AutosuggestHandlers,
    Omit<AutosuggestInputProps, 'classes'> {
  input: FieldInputProps<string>
  suggestions: string[]
  color?: string
}

const NewAutosuggestField: FC<AutosuggestFieldProps> = ({
  suggestions,
  loading,
  color,
  handleClear,
  handleFetch,
  handleSelected,
  ...props
}) => {
  const classes = getAutosuggestStyles({ color })
  const theme = {
    container: classes.container,
    suggestionsContainerOpen: classes.suggestionsContainerOpen,
    suggestionsList: classes.suggestionsList,
    suggestion: classes.suggestion,
  }
  const { input, ...rest } = props

  const onSuggestionsClearRequested = () => {}

  const onSuggestionSelected = useCallback<OnSuggestionSelected<string>>(
    (_, data) => {
      const { suggestion } = data

      if (suggestion !== undefined) {
        input.onChange(suggestion)
        handleSelected && handleSelected(_, data)
      }
    },
    [input.onChange, handleSelected],
  )

  const autosuggestProps = {
    loading,
    inputProps: { ...input },
    theme,
    multiSection: false,
    suggestions: suggestions,
    shouldRenderSuggestions: () => true,
    onSuggestionsFetchRequested: handleFetch,
    onSuggestionsClearRequested: handleClear ?? onSuggestionsClearRequested,
    onSuggestionSelected: onSuggestionSelected,
    getSuggestionValue: (suggestion: string) => suggestion,
  }

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        renderInputComponent={renderProps => {
          return (
            <AutosuggestInput
              {...renderProps}
              disabled={rest.disabled}
              fullWidth={rest.fullWidth}
              helperText={rest.helperText}
              label={rest.label}
              meta={rest.meta}
              loading={loading}
              classes={classes}
            />
          )
        }}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <StyledMenuItem
            role="option"
            aria-selected={isHighlighted}
            selected={isHighlighted}
          >
            {suggestion}
          </StyledMenuItem>
        )}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <Paper {...containerProps} square className={classes.paper}>
            {children}
          </Paper>
        )}
      />
    </div>
  )
}

export default NewAutosuggestField
