import { Field } from 'react-final-form'
import { PhoneField, TextField } from '../../../../../../../blocks/Form'
import Group from '../../../../../../../blocks/Form/Group'
import WorkingTimeArrayField from '../../../../../../../blocks/Form/WorkingTimeField/WorkingTimeArrayField'
import styled from 'styled-components'
import { MobileHidden } from '../../../../../../../../styles/common'
import Button from '../../../../../../../ui/Button'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { email } from '../../../../../../../../utils/validations'
import { FC, RefObject } from 'react'
import { IHandleClickNextTabInForm } from '../../../..'

const Wrapper = styled.div`
  width: 100%;
  margin-top: 91px;
  padding-top: 15px;
`

const Title = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e3e3e3;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

const WrapperForm = styled.div`
  width: 100%;
  margin-bottom: 14px;
`

const FieldWrap = styled.div`
  margin-bottom: 14px;
`

interface Props {
  ref5: RefObject<HTMLDivElement>
  handleClickNextTab: IHandleClickNextTabInForm
  number: number
}

const Administartor: FC<Props> = ({ ref5, handleClickNextTab, number }) => {
  return (
    <Wrapper id="administartor" ref={ref5}>
      <Title>Маршрут и администратор</Title>
      <Group
        description="Опишите маршрут от ближайшего метро, указав ориентиры по пути, чтобы мастерам и клиентам было проще вас найти. Для быстрой связи укажите контакты администратора.
"
        mbDesc={30}
      >
        <WrapperForm>
          <FieldWrap>
            <Field
              name="locationDirections"
              component={TextField}
              label="Описание маршрута"
            />
          </FieldWrap>
          <FieldWrap>
            <Field
              name="salonContactPersonName"
              component={TextField}
              label="Имя администратора"
            />
          </FieldWrap>
          <FieldWrap>
            <PhoneField
              name="salonContactPersonPhone"
              label="Телефон"
              requiredField={false}
            />
          </FieldWrap>
          <FieldWrap>
            <Field
              name="salonContactPersonEmail"
              component={TextField}
              label="E-mail"
              validate={email}
              inputMode="email"
            />
          </FieldWrap>
        </WrapperForm>
        <WorkingTimeArrayField name={'contactPersonWorkingHours'} />
      </Group>

      <MobileHidden>
        <Button
          onClick={e => {
            e.preventDefault()
            handleClickNextTab(number)
          }}
          variant="red"
          size="width374"
          mt="24"
        >
          Далее
        </Button>
      </MobileHidden>
    </Wrapper>
  )
}

export default Administartor
