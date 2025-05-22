import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  styled,
} from '@mui/material'
import { Title, City } from './styles'
import { FC, ReactElement } from 'react'
import { IChildren } from 'src/types/common'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paperWidthSm': {
    minWidth: '376px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
  '& .MuiDialogContentText-root': {
    padding: '24px 24px 0',
    fontSize: '14px',
    textAlign: 'center',
  },
  '& .MuiDialogContent-root': {
    padding: '0',
  },
}))

const StyledDialogActions = styled(DialogActions)(() => ({
  padding: '0 20px 20px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  '&.actionsSingle': {
    justifyContent: 'center',
  },
}))

interface Props {
  isOpen: boolean
  title: IChildren
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
  return (
    <StyledDialog
      open={isOpen}
      onClose={() => (onClose ? onClose() : () => {})}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="paper"
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
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            {description ? description : null}
            {content ? content() : null}
          </DialogContentText>
        </DialogContent>
      ) : null}
      {children ? (
        <>
          <StyledDialogActions
            className={
              Array.isArray(children) && children.length ? '' : 'actionsSingle'
            }
          >
            {children}
          </StyledDialogActions>
        </>
      ) : null}
    </StyledDialog>
  )
}

export default Popup
