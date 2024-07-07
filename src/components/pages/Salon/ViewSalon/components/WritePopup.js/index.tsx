import React, { FC } from 'react'
import { Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { Field } from 'react-final-form'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import TextField from '../../../../../blocks/Form/TextField'
import { FormField } from '../../../../../../styles/common'
import Button from '../../../../../ui/Button'
import {
  required,
  email,
  composeValidators,
  phone,
} from '../../../../../../utils/validations'
import { FieldStyled } from '../../../CreateSalon/components/RegistrationForm/styled'
import { IUser } from 'src/types/me'

interface Props {
  open: boolean
  handleClose: () => void
  onSubmit: (values: { [K: string]: any }) => void
  user: IUser | null
}

const WritePopup: FC<Props> = ({ open, handleClose, onSubmit, user }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <AutoFocusedForm
            initialValues={{
              name: user?.info?.username,
              phone: user?.info?.phone,
              email: user?.info?.email,
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    <FormField>
                      <FieldStyled
                        name="name"
                        fullWidth={true}
                        component={TextField}
                        label="Имя"
                        validate={required}
                      />
                    </FormField>
                    <FormField>
                      <Field
                        name="phone"
                        type="phone"
                        fullWidth
                        component={TextField}
                        label="Ваш номер телефона"
                        validate={composeValidators(required, phone)}
                      />
                    </FormField>
                    <FormField>
                      <Field
                        name="email"
                        fullWidth
                        inputMode="email"
                        component={TextField}
                        label="Ваш email"
                        validate={composeValidators(required, email)}
                      />
                    </FormField>
                    <FormField>
                      <Field
                        fullWidth
                        name="message"
                        multiple={true}
                        component={TextField}
                        label="Введите сообщение"
                        validate={required}
                      />
                    </FormField>
                    <DialogActions>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Button
                          variant="red"
                          style={{ marginBottom: '10px' }}
                          autoFocus
                          type="submit"
                        >
                          Написать
                        </Button>
                        <Button
                          type="button"
                          onClick={handleClose}
                          variant="darkTransparent"
                        >
                          Отменить
                        </Button>
                      </div>
                    </DialogActions>
                  </form>
                </>
              )
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WritePopup
