import { FC, useEffect, useState } from 'react'
import { Field, useForm } from 'react-final-form'
import Checkbox from './Checkbox'
import Input from './Input'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { IRentalPeriod } from 'src/types'
import { IPeriod } from '../../type'

const Wrapper = styled.div`
  margin-bottom: 30px;
`

const FieldsWrapper = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const FieldWrap = styled.div<{ active?: boolean }>`
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

const TopCheckboxes = styled.ul<{ showRentalPrices?: boolean }>`
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

interface Props {
  rentalPeriods: IRentalPeriod[]
  initialPeriod: IPeriod[]
}

const RentalPeriod: FC<Props> = ({ rentalPeriods, initialPeriod }) => {
  const form = useForm()
  const [periods, setPeriods] = useState<IPeriod[]>(initialPeriod)

  const [showRentalPrices, setShowRentalPrices] = useState(
    !periods.find(e => e.id === 'CustomRate'),
  )

  const showRentalPricesHandler = () => {
    setShowRentalPrices(!showRentalPrices)
  }

  useEffect(() => {
    form.change('rentalPeriod', periods)
    if (!periods.length) {
      setPeriods([{ id: 'CustomRate' }])
      setShowRentalPrices(false)
    }
  }, [periods])

  const checkboxPricesHandler = (type: string) => {
    const findType = periods.find(typeRate => typeRate.id === type) || false

    if (type === 'CustomRate') {
      if (findType) {
        setPeriods([{ id: '1' }])
        return
      } else {
        setPeriods([{ id: type }])
        return
      }
    } else {
      if (findType) {
        const newArr: IPeriod[] = []
        periods.forEach(typeRate => {
          if (typeRate.id !== type) {
            newArr.push(typeRate)
          }
        })
        setPeriods(newArr)
        return
      } else {
        setPeriods([...periods, { id: type }])
        return
      }
    }
  }

  const fieldActiveHandler = (value: string) => {
    const findType = periods.find(type => type.id === value)
    if (!findType) setPeriods([...periods, { id: value }])
  }
  return (
    <Wrapper>
      <TopCheckboxes showRentalPrices={showRentalPrices}>
        {rentalPeriods.map(period => (
          <FieldsWrapper key={period.title}>
            <FieldWrapCheckbox>
              <Field
                tabIndex="-1"
                name="rentalRate"
                value={period.id}
                component={Checkbox}
                type="checkbox"
                label=""
                rentalType={periods}
                checkboxPricesHandler={() => {
                  checkboxPricesHandler(period.id)
                }}
              />
            </FieldWrapCheckbox>
            <FieldWrap
              active={!!periods.find(type => type.id === period.id)}
              onClick={() => fieldActiveHandler(period.id)}
            >
              <Input
                name={period.id}
                placeholder={`Стоимость аренды в ${period.title.toLowerCase()}`}
                type="number"
                maxLength={9}
                min="0"
                periods={periods}
                setPeriods={setPeriods}
                form={form}
              />
            </FieldWrap>
          </FieldsWrapper>
        ))}
      </TopCheckboxes>
      <BottomCheckbox onClick={showRentalPricesHandler}>
        <Field
          name="rentalRate"
          value={'CustomRate'}
          component={Checkbox}
          type="checkbox"
          label="Цена и период по договоренности"
          rentalType={periods}
          checkboxPricesHandler={() => checkboxPricesHandler('CustomRate')}
        />
      </BottomCheckbox>
    </Wrapper>
  )
}

export default RentalPeriod
