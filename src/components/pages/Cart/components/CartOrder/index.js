import { useCallback, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Field } from 'react-final-form'
import Button from '../../../../ui/Button'
import AutoFocusedForm from '../../../../blocks/Form/AutoFocusedForm'
import RadioButtonGroup from '../../../../blocks/Form/RadioButtonGroup'
import RadioButton from '../../../../blocks/Form/RadioButton'
import Error from '../../../../blocks/Form/Error'
import AddressNoSalonField from '../../../../blocks/Form/AddressField/AddressNoSalonField'
import { TextField } from '../../../../blocks/Form'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

const onUpdate = handler => event => {
  const value = event.target.value
  if (value === '') {
    handler(null)
  } else if (value === '1') {
    handler(true)
  } else {
    handler(false)
  }
}

const ButtonsAction = styled(DialogActions)`
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    button {
      margin: 0 !important;
      margin-top: 10px !important;
      width: 100%;
    }
  }
`

const ButtonAction = styled(DialogActions)`
  @media (max-width: ${laptopBreakpoint}) {
    padding: 16px;
    button {
      width: 100%;
    }
  }
`

const GroupRadio = ({ input }) => {
  const { name, value, onChange } = input
  const handleOnChange = useCallback(onUpdate(onChange), [onChange])

  const inputValue = value === true ? '1' : value === false ? '0' : ''
  const groupProps = {
    name,
    onChange: handleOnChange,
    value: inputValue,
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ marginBottom: 10 }} className="noMargin">
        Тип оплаты
      </h4>
      <RadioButtonGroup {...groupProps}>
        <div className="withColumn">
          <RadioButton label="Наличными при получении" value="0" />
          <RadioButton label="Картой при получении" value="1" />
        </div>
      </RadioButtonGroup>
    </div>
  )
}

const GroupRadioField = ({ name, title }) => (
  <Field name={name} component={GroupRadio} title={title} />
)

const CartOrder = ({
  openOrder,
  handleClose,
  handleCloseSuccess,
  onSubmit,
  setErrorPopupOpen,
  isErrorPopupOpen,
  errors,
  setClickAddress,
  me,
  checkedProducts,
  open,
  setCheckedProducts,
  removeItem,
}) => {
  useEffect(() => {
    if (
      me &&
      me.master &&
      me.master.addressFull &&
      me.master.addressFull.full
    ) {
      setClickAddress(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOrder])

  useEffect(() => {
    if (open) {
      const itemsDelete = checkedProducts.map(item => {
        return {
          key: item.key,
          quantity: 0,
        }
      })
      removeItem({
        variables: {
          input: {
            items: itemsDelete,
            clientMutationId: '',
          },
        },
      })
      setCheckedProducts([])
    }
  }, [open])

  return (
    <div>
      <Dialog
        open={openOrder}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <AutoFocusedForm
            initialValues={{
              payment: false,
              address:
                (me &&
                  me.master &&
                  me.master.addressFull &&
                  me.master.addressFull.full) ||
                '',
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    <Error
                      errors={errors}
                      isOpen={isErrorPopupOpen}
                      setOpen={setErrorPopupOpen}
                    />
                    <div className="form__field">
                      <GroupRadioField name="payment" />
                    </div>
                    <div className="form__field">
                      <Field
                        name="address"
                        fullWidth={true}
                        component={AddressNoSalonField}
                        setClickAddress={setClickAddress}
                        label="Адрес доставки"
                      />
                    </div>
                    <div className="form__field">
                      <Field
                        name="comment"
                        multiple={true}
                        component={TextField}
                        label="Комментарий к заказу"
                      />
                    </div>
                  </form>
                  <ButtonsAction>
                    <Button onClick={handleClose} variant="gray">
                      Отменить
                    </Button>
                    <Button variant="red" autoFocus onClick={form.submit}>
                      Заказать
                    </Button>
                  </ButtonsAction>
                </>
              )
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={() => {
          handleCloseSuccess()
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Заказ отправлен'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Представители брендов свяжутся с вами в ближайшее время
          </DialogContentText>
        </DialogContent>
        <ButtonAction>
          <Button
            onClick={() => {
              handleCloseSuccess()
            }}
            variant="red"
          >
            Закрыть
          </Button>
        </ButtonAction>
      </Dialog>
    </div>
  )
}

export default CartOrder
