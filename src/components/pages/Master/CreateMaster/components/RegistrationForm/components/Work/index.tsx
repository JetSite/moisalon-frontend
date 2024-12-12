import { Field, useForm } from 'react-final-form'
import styled from 'styled-components'
import { required } from '../../../../../../../../utils/validations'
import { TextField } from '../../../../../../../blocks/Form'
import Button from '../../../../../../../ui/Button'
import { MobileHidden } from '../../../../../../../../styles/common'
import { FieldStyled, FieldWrap } from '../../styled'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { FC, useState } from 'react'
import { IMasterFormProps } from '../..'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import AddressNoSalonField from '../../../../../../../blocks/Form/AddressField/AddressNoSalonField'
import { ISetState } from 'src/types/common'

const Wrapper = styled.div`
  padding-top: 120px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
  }
`
const Title = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 40px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`
const MobileTitle = styled.p`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

const SearchWorkWrapper = styled.div`
  margin-top: 40px;
`

const FieldResumeWrapper = styled.div`
  display: none;
  margin-top: 20px;
`

const Label = styled.label`
  font-size: 1.6rem;
  line-height: 1.5;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

const Checkbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  &:checked ~ div {
    display: block;
  }
  &:checked + span:before {
    display: block;
  }
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${props =>
      props.checked ? `url("/icon-check.svg") no-repeat center` : ''};
  }
`

interface Props extends Pick<IMasterFormProps, 'ref3' | 'handleClickNextTab'> {
  number: number
  setClickCity: ISetState<string | null>
  search?: boolean
}

const Work: FC<Props> = ({
  ref3,
  handleClickNextTab,
  number,
  setClickCity,
  search = false,
}) => {
  const [searchWork, setSearchWork] = useState(search)

  return (
    <Wrapper ref={ref3} id="profInfo">
      <MobileTitle>Профессиональная информация</MobileTitle>
      <Title>
        Информация, которую вы укажете в этом разделе, публичная. Она
        указывается рядом с отзывами и видна другим пользователям.
      </Title>
      <FieldStyled
        parse={parseFieldsToString}
        name="description"
        component={TextField}
        label="Расскажите о своем любимом деле"
        validate={required}
        multiline={true}
        maxLength={1200}
        requiredField
      />
      <SearchWorkWrapper>
        <Field name="searchWork" type="checkbox">
          {({ input }) => (
            <>
              <Checkbox
                onClick={() => setSearchWork(!searchWork)}
                {...input}
                id={input?.name}
              />
              <Label htmlFor="searchWork">Ищу работу</Label>
            </>
          )}
        </Field>
        <FieldResumeWrapper>
          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              validate={searchWork && required}
              name="resume_title"
              component={TextField}
              label="Заголовок резюме"
              // requiredField={searchWork}
            />
          </FieldWrap>
          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              name="resume_specialization"
              component={TextField}
              label="Специальность"
            />
          </FieldWrap>
          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              name="resume_age"
              component={TextField}
              label="Возраст"
            />
          </FieldWrap>
          {/* <FieldWrap>
            <FieldStyled
              name="resume_gender"
              component={TextField}
              label="Пол"
            />
          </FieldWrap> */}

          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              name="resume_city"
              setClickCity={setClickCity}
              component={AddressNoSalonField}
              label="Город"
              noMap
              onlyCity
            />
          </FieldWrap>
          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              name="resume_workSchedule"
              component={TextField}
              label="График работы"
            />
          </FieldWrap>
          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              validate={searchWork && required}
              name="resume_salary"
              component={TextField}
              label="З/п"
              // requiredField={searchWork}
            />
          </FieldWrap>
          <FieldWrap>
            <FieldStyled
              parse={parseFieldsToString}
              name="resume_content"
              component={TextField}
              label="Вставьте здесь свое резюме"
              multiline={true}
              maxLength={1200}
            />
          </FieldWrap>
        </FieldResumeWrapper>
      </SearchWorkWrapper>
      <MobileHidden>
        <Button
          onClick={e => {
            e.preventDefault()
            handleClickNextTab(number)
          }}
          variant="red"
          size="width374"
          mt="66"
        >
          Далее
        </Button>
      </MobileHidden>
    </Wrapper>
  )
}

export default Work
