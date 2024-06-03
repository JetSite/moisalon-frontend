import React, { Dispatch, FC, FormEventHandler, SetStateAction } from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { Field } from 'react-final-form'
import AutoFocusedForm from '../../../blocks/Form/AutoFocusedForm'
import TextField from '../../../blocks/Form/TextField'
import { FormField } from '../../../../styles/common'
import { required } from '../../../../utils/validations'
import { FieldStyled } from '../../../pages/Salon/CreateSalon/components/RegistrationForm/styled'
import Button from '../../Button'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { IMe } from 'src/types/me'
import { ISetState, LazyType } from 'src/types/common'

const Title = styled.h3`
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    line-height: 28px;
  }
`

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const MobileButtonsWrap = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    width: 100%;
    height: 130px;
  }
`

const ButtonStyled = styled(Button)`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

const MessageField = styled(Field)`
  textarea {
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c7c7c7;
    }
  }
`

export type NewMassageOnSubmit = (values: LazyType) => Promise<void>

interface Props {
  me: IMe
  open: boolean
  onSubmit: NewMassageOnSubmit
  setChatMessagePopup: ISetState<boolean>
  title: string
}

const NewMessagePopup: FC<Props> = ({
  me,
  open,
  onSubmit,
  setChatMessagePopup,
  title,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setChatMessagePopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ maxHeight: 'auto' }}
        fullWidth
      >
        <DialogContent style={{ padding: '40px 30px' }}>
          <Title>{title}</Title>
          <AutoFocusedForm
            initialValues={{
              name: me?.info?.username || '',
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => {
              return (
                <>
                  <form
                    onSubmit={
                      handleSubmit as unknown as FormEventHandler<HTMLFormElement>
                    }
                  >
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
                      <MessageField
                        fullWidth
                        name="message"
                        multiline={true}
                        rows={7}
                        maxLength="500"
                        component={TextField}
                        label="Введите сообщение"
                        validate={required}
                      />
                    </FormField>

                    <ButtonsWrap>
                      <ButtonStyled
                        onClick={() => setChatMessagePopup(false)}
                        variant="darkTransparent"
                        type="button"
                      >
                        Отмена
                      </ButtonStyled>
                      <ButtonStyled variant="red" autoFocus type="submit">
                        Отправить
                      </ButtonStyled>
                    </ButtonsWrap>

                    <MobileButtonsWrap>
                      <ButtonStyled
                        onClick={() => setChatMessagePopup(false)}
                        variant="darkTransparent"
                      >
                        Отмена
                      </ButtonStyled>
                      <ButtonStyled variant="red" autoFocus type="submit">
                        Отправить
                      </ButtonStyled>
                    </MobileButtonsWrap>
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

export default NewMessagePopup
