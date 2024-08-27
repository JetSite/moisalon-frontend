import Button from '../../../../../../../ui/Button'
import DictionaryGroupsField from '../../../../../../../blocks/Form/DictionaryGroupsField/DictionaryGroupsField'
import styled from 'styled-components'
import { MobileHidden } from '../../../../../../../../styles/common'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { FC, RefObject } from 'react'
import { IServiceInForm } from 'src/types/services'
import { IHandleClickNextTabInForm } from '../../../..'
import { IID } from 'src/types/common'

const Wrapper = styled.div`
  margin-top: 91px;
  padding-top: 15px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    padding-top: 0;
  }
`

const Title = styled.div`
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e3e3e3;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 12px;
    padding-bottom: 8px;
    font-size: 16px;
  }
`

interface Props {
  services: IServiceInForm[]
  servicesM: IServiceInForm[]
  ref3: RefObject<HTMLDivElement>
  number: number
  handleClickNextTab: IHandleClickNextTabInForm
}

const SalonServices: FC<Props> = ({
  services,
  servicesM,
  ref3,
  handleClickNextTab,
  number,
}) => {
  return (
    <Wrapper ref={ref3} id="service">
      <Title>Сервис для посетителей</Title>
      <DictionaryGroupsField name="services" groups={services} />
      <Title>Сервис для мастеров</Title>
      <DictionaryGroupsField name="servicesM" groups={servicesM} />

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
