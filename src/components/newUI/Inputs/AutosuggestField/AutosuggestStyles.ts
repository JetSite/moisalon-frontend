import { MenuItem } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { makeStyles, withStyles } from '@mui/styles'

export const StyledMenuItem = withStyles({
  root: {
    whiteSpace: 'normal',
    borderTop: 'solid 1px rgba(0, 0, 0, 0.42)',
    fontSize: '16px',
  },
})(MenuItem)

export const getAutosuggestStyles = makeStyles<
  Theme,
  { color?: string; fullWidth?: boolean }
>(theme => ({
  root: ({ color, fullWidth }) => ({
    color: color || theme.palette.text.primary,
    width: fullWidth ? '100%' : 'auto',
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
    color: color || theme.palette.text.primary,
    '&::placeholder': {
      color: color || theme.palette.text.secondary,
      fontSize: color ? '1.6rem' : '1rem',
    },
    '&.MuiInput-underline:after': {
      borderBottom: `2px solid ${color || theme.palette.primary.main}`,
    },
    '&.MuiInput-underline:before': {
      borderBottom: `1px solid ${color || theme.palette.divider}`,
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
