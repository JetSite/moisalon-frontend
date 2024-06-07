import styled from 'styled-components'
import { MobileHidden } from '../../../../../../../../styles/common'
import Button from '../../../../../../../ui/Button'
import DictionaryField from '../../../../../../../blocks/Form/DictionaryField/'
import { lengthValidate } from '../../../../../../../../utils/validations'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { FC, RefObject } from 'react'
import { IHandleClickNextTabInForm } from '../../../..'
import { IID } from 'src/types/common'

const Text = styled.p`
  margin-top: 70px;
  margin-bottom: 40px;
  span {
    text-decoration: underline;
    font-weight: 700;
    font-size: 18px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const Title = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e3e3e3;
  }
`

const Wrap = styled.div`
  padding-top: 15px;
`

export interface IActivitiesInForm {
  id: IID
  name: IID
  title: string
}

interface Props {
  ref2: RefObject<HTMLDivElement>
  activities: IActivitiesInForm[]
  number: number
  handleClickNextTab: IHandleClickNextTabInForm
}

const SalonActivities: FC<Props> = ({
  activities,
  ref2,
  handleClickNextTab,
  number,
}) => {
  console.log('activities', activities)

  return (
    <Wrap ref={ref2} id="vid">
      <Title>Вид деятельности</Title>
      <DictionaryField
        mbDesc={35}
        description="Расскажите своим клиентам, какие услуги предоставляет ваш салон."
        name="activities"
        groups={activities}
        withButton={true}
        validate={lengthValidate}
        onlyOneChoose
      />
      <Text>
        Не нашли свое направление деятельности? <span>Напишите нам!</span>
      </Text>
      <MobileHidden>
        <Button
          onClick={e => {
            e.preventDefault()
            handleClickNextTab(number)
          }}
          variant="red"
          size="width374"
        >
          Далее
        </Button>
      </MobileHidden>
    </Wrap>
  )
}

export default SalonActivities
