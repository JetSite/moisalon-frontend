import styled from 'styled-components'
import Popup from '../../../ui/Popup'
import Button from '../../../ui/Button'

const ErrorWrap = styled.div`
  font-size: 16px;
  margin: 8px 0 0;
  min-height: 1em;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.03333em;
  color: #f03;
`

const Error = ({ errors, isOpen, setOpen }) => {
  if (errors === null) {
    return null
  }

  const handlePopupClose = () => {
    setOpen(null)
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
      isOpen={isOpen}
      onClose={handlePopupClose}
      title="Что-то пошло не так!"
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

export default Error
