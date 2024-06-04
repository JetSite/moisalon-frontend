import styled from 'styled-components'
import Button from '../../../../../../../ui/Button'
import DictionaryField from '../../../../../../../blocks/Form/DictionaryField/index.tsx'
import { lengthValidate } from '../../../../../../../../utils/validations'
import { MobileHidden } from '../../../../../../../../styles/common'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

const Text = styled.p`
  margin-top: 70px;
  margin-bottom: 40px;
  span {
    text-decoration: underline;
    font-weight: 700;
    font-size: 18px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 32px;
    margin-bottom: 34px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    span {
      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
    }
  }
`

const TitleMobile = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

const Wrap = styled.div`
  padding-top: 15px;
`

const MasterSpecializationsList = ({
  serviceCatalogs,
  ref2,
  handleClickNextTab,
  number,
}) => {
  const services = []
  serviceCatalogs.forEach(item => {
    item.services.forEach(service => {
      services.push(service)
    })
  })

  return (
    <Wrap ref={ref2} id="spec">
      <TitleMobile>Специализация</TitleMobile>
      <DictionaryField
        description="Выберите один или несколько пунктов, 
      который описывает вас как профессионала."
        name="specializations"
        defaultSpecialization
        groups={services}
        withButton={true}
        validate={lengthValidate}
      />
      <Text>
        Не нашли свою профессию? <span>Напишите нам!</span>
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

export default MasterSpecializationsList
