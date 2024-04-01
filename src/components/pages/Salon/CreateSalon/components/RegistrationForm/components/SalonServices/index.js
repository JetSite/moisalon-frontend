import Button from '../../../../../../../ui/Button'
import DictionaryGroupsField from '../../../../../../../blocks/Form/DictionaryGroupsField/DictionaryGroupsField'
import styled from 'styled-components'
import { MobileHidden } from '../../../../../../../../styles/common'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

const Wrapper = styled.div`
  margin-top: 91px;
  padding-top: 15px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    padding-top: 0;
  }
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

const SalonServices = ({
  serviceCatalog,
  ref3,
  handleClickNextTab,
  number,
}) => {
  const { groups: services = [] } = serviceCatalog
  return (
    <Wrapper ref={ref3} id="services">
      <Title>Сервис для посетителей</Title>
      <DictionaryGroupsField name="services" groups={services} />
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
    </Wrapper>
  )
}

export default SalonServices
