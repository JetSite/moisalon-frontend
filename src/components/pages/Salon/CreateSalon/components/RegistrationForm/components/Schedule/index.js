import Group from '../../../../../../../blocks/Form/Group'
import WorkingTimeArrayField from '../../../../../../../blocks/Form/WorkingTimeField/WorkingTimeArrayField'
import styled from 'styled-components'
import Button from '../../../../../../../ui/Button'
import { MobileHidden } from '../../../../../../../../styles/common'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

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

const Schedule = ({ ref4, handleClickNextTab, number }) => {
  return (
    <Wrapper id="schedule" ref={ref4}>
      <Title>График работы</Title>
      <Group description="Укажите дни и часы работы вашего салона" mbDesc="30">
        <WorkingTimeArrayField name={'workingHours'} />
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

export default Schedule
