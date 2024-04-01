import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
  useTheme,
} from '@material-ui/core'
import { Title, City } from './styles'
import { FC, ReactElement } from 'react'
import { IChildren } from 'src/types/common'

const useStyles = makeStyles(theme => ({
  paperWidthSm: {
    minWidth: '376px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
    },
  },
  dialogContentText: {
    padding: '24px 24px 0',
    fontSize: '14px',
    textAlign: 'center',
  },
  dialogContent: {
    padding: '0',
  },
  divider: {
    margin: '24px',
  },
  actions: {
    padding: '0 20px 20px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionsSingle: {
    justifyContent: 'center',
  },
}))

interface Props {
  isOpen: boolean
  title: string
  city?: string
  description?: string
  content?: () => ReactElement
  children: IChildren
  onClose?: () => void
}

const Popup: FC<Props> = ({
  isOpen,
  title,
  city,
  description,
  content,
  children,
  onClose,
}) => {
  const theme = useTheme()
  // const fullScreenDialog = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles()

  return (
    <Dialog
      open={isOpen}
      onClose={() => (onClose ? onClose() : () => {})}
      // fullScreen={fullScreenDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="paper"
      classes={{ paperWidthSm: classes.paperWidthSm }}
    >
      {title ? (
        <>
          <Title>
            {title}
            {city ? <City>{city} ?</City> : null}
          </Title>
        </>
      ) : null}
      {description || content ? (
        <DialogContent classes={{ root: classes.dialogContent }}>
          <DialogContentText
            component="div"
            id="alert-dialog-description"
            classes={{ root: classes.dialogContentText }}
          >
            {description ? description : null}
            {content ? content() : null}
          </DialogContentText>
        </DialogContent>
      ) : null}
      {children ? (
        <>
          <DialogActions
            className={`${classes.actions} ${
              Array.isArray(children) && children.length
                ? ''
                : classes.actionsSingle
            }`}
          >
            {children}
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  )
}

export default Popup
