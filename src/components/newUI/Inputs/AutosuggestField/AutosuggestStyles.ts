import { MenuItem, Theme, makeStyles, withStyles } from '@material-ui/core'

export const StyledMenuItem = withStyles({
  root: {
    whiteSpace: 'normal',
    borderTop: 'solid 1px rgba(0, 0, 0, 0.42)',
    fontSize: '16px',
  },
})(MenuItem)

export const getAutosuggestStyles = makeStyles<Theme, { color?: string }>(
  theme => ({
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
  }),
)
