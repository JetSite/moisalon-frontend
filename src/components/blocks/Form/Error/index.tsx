import styled from 'styled-components'
import Popup from '../../../ui/Popup'
import Button from '../../../ui/Button'
import { FC } from 'react'
import { IChildren, ISetState } from 'src/types/common'

const ErrorWrap = styled.div`
  font-size: 16px;
  margin: 8px 0 0;
  min-height: 1em;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.03333em;
  color: #f03;
`

export interface IErrorProps {
  errors: string[] | null
  setErrors: ISetState<string[] | null>
}

interface Props extends IErrorProps {
  title?: IChildren
}

const ErrorPopup: FC<Props> = ({
  errors,
  setErrors,
  title = 'Что-то пошло не так!',
}) => {
  if (errors === null) {
    return null
  }

  const handlePopupClose = () => {
    setErrors(null)
  }
  const errorList = errors
    .filter(e => e !== 'Cannot return null for non-nullable field.')
    .map(error => (
      <ErrorWrap key={error}>
        {error === `Указанное условие не было выполнено для 'Phones'.`
          ? 'Введите корректный номер телефона.'
          : error}
      </ErrorWrap>
    ))

  return (
    <Popup
      isOpen={!!errors}
      onClose={handlePopupClose}
      title={title}
      description=""
      content={() => {
        return <>{errorList}</>
      }}
    >
      <Button
        onClick={handlePopupClose}
        style={{ marginTop: 25 }}
        variant="red"
      >
        Закрыть
      </Button>
    </Popup>
  )
}

export default ErrorPopup
