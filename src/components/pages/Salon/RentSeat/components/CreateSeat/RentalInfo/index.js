import { useState } from 'react'
import { Field } from 'react-final-form'
import Checkbox from './Checkbox'
import Input from './Input'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../styles/variables'

const Wrapper = styled.div`
  margin-bottom: 30px;
`

const FieldsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const FieldWrap = styled.div`
  width: 96%;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  /* pointer-events: ${({ active }) => (active ? 'auto' : 'none')}; */

  @media (max-width: ${laptopBreakpoint}) {
    width: 90%;
  }
`

const FieldWrapCheckbox = styled.div`
  width: 4%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 10%;
  }
`

const TopCheckboxes = styled.div`
  opacity: ${({ showRentalPrices }) => (showRentalPrices ? 1 : 0.3)};
  pointer-events: ${({ showRentalPrices }) =>
    showRentalPrices ? 'auto' : 'none'};
`

const BottomCheckbox = styled.div`
  margin-top: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
  }
`

const RentalInfo = ({
  rentalRate,
  setRentalRate,
  chosenRentalRents,
  setChosenRentalRents,
}) => {
  const [showRentalPrices, setShowRentalPrices] = useState(
    rentalRate.includes('rentalCustom') ? false : true,
  )

  const showRentalPricesHandler = () => {
    setShowRentalPrices(!showRentalPrices)
    setRentalRate(rentalRate.includes('rentalCustom') ? [] : ['rentalCustom'])
  }

  const checkboxPricesHandler = (type, value) => {
    if (rentalRate.includes(value)) {
      setRentalRate(rentalRate.filter(rate => rate !== value))
      setChosenRentalRents({ ...chosenRentalRents, [type]: null })
    } else {
      setRentalRate([...rentalRate, value])
    }
  }

  const chooseRentalPricesHandler = (type, value) => {
    setChosenRentalRents({ ...chosenRentalRents, [type]: value })
  }

  const fieldActiveHandler = value => {
    setRentalRate([...rentalRate, value])
  }

  return (
    <Wrapper>
      <TopCheckboxes showRentalPrices={showRentalPrices}>
        <FieldsWrapper>
          <FieldWrapCheckbox>
            <Field
              name="rentalRate"
              value="rentalHour"
              component={Checkbox}
              type="checkbox"
              label=""
              rentalRate={rentalRate}
              checkboxPricesHandler={() =>
                checkboxPricesHandler('hour', 'rentalHour')
              }
            />
          </FieldWrapCheckbox>
          <FieldWrap
            active={rentalRate.includes('rentalHour')}
            onClick={() => fieldActiveHandler('rentalHour')}
          >
            <Input
              name="hour"
              placeholder="Стоимость аренды в час"
              type="number"
              maxLength={9}
              min="0"
              chosenRentalRents={chosenRentalRents}
              chooseRentalPrice={chooseRentalPricesHandler}
            />
          </FieldWrap>
        </FieldsWrapper>
        <FieldsWrapper>
          <FieldWrapCheckbox>
            <Field
              name="rentalRate"
              value="rentalDay"
              component={Checkbox}
              type="checkbox"
              label=""
              rentalRate={rentalRate}
              checkboxPricesHandler={() =>
                checkboxPricesHandler('day', 'rentalDay')
              }
            />
          </FieldWrapCheckbox>
          <FieldWrap
            active={rentalRate.includes('rentalDay')}
            onClick={() => fieldActiveHandler('rentalDay')}
          >
            <Input
              name="day"
              placeholder="Стоимость аренды в день"
              type="number"
              maxLength={9}
              min="0"
              chosenRentalRents={chosenRentalRents}
              chooseRentalPrice={chooseRentalPricesHandler}
            />
          </FieldWrap>
        </FieldsWrapper>
        <FieldsWrapper>
          <FieldWrapCheckbox>
            <Field
              name="rentalRate"
              value="rentalWeek"
              component={Checkbox}
              type="checkbox"
              label=""
              rentalRate={rentalRate}
              checkboxPricesHandler={() =>
                checkboxPricesHandler('week', 'rentalWeek')
              }
            />
          </FieldWrapCheckbox>
          <FieldWrap
            active={rentalRate.includes('rentalWeek')}
            onClick={() => fieldActiveHandler('rentalWeek')}
          >
            <Input
              name="week"
              placeholder="Стоимость аренды в неделю"
              type="number"
              maxLength={9}
              min="0"
              chosenRentalRents={chosenRentalRents}
              chooseRentalPrice={chooseRentalPricesHandler}
            />
          </FieldWrap>
        </FieldsWrapper>
        <FieldsWrapper>
          <FieldWrapCheckbox>
            <Field
              name="rentalRate"
              value="rentalMonth"
              component={Checkbox}
              type="checkbox"
              label=""
              rentalRate={rentalRate}
              checkboxPricesHandler={() =>
                checkboxPricesHandler('month', 'rentalMonth')
              }
            />
          </FieldWrapCheckbox>
          <FieldWrap
            active={rentalRate.includes('rentalMonth')}
            onClick={() => fieldActiveHandler('rentalMonth')}
          >
            <Input
              name="month"
              placeholder="Стоимость аренды в месяц"
              type="number"
              maxLength={9}
              min="0"
              chosenRentalRents={chosenRentalRents}
              chooseRentalPrice={chooseRentalPricesHandler}
            />
          </FieldWrap>
        </FieldsWrapper>
      </TopCheckboxes>
      <BottomCheckbox onClick={showRentalPricesHandler}>
        <Field
          name="rentalRate"
          value="rentalCustom"
          component={Checkbox}
          type="checkbox"
          label="Цена и период по договоренности"
          rentalRate={rentalRate}
          checkboxPricesHandler={checkboxPricesHandler}
        />
      </BottomCheckbox>
    </Wrapper>
  )
}

export default RentalInfo
