import React from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import { isUrl } from '../../../../../../../../utils/validations'
import SocialNetworkUrlsField from '../../../../../../../blocks/Form/SocialNetworkUrlsField'
import TextFieldAdapter from '../../../../../../../blocks/Form/TextField'
import { FieldWrap } from '../../styled'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

const Wrapper = styled.div`
  margin-top: 120px;
  margin-bottom: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 70px;
    margin-bottom: 40px;
  }
`

const Title = styled.p`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

const Socials = ({ ref4 }) => {
  return (
    <Wrapper id="socials" ref={ref4}>
      <Title>Дополнительная информация</Title>
      <FieldWrap>
        <Field
          name="webSiteUrl"
          component={TextFieldAdapter}
          label="Веб-сайт"
          inputMode="url"
          validate={isUrl}
        />
      </FieldWrap>
      <Field name="socialNetworkUrls" component={SocialNetworkUrlsField} />
    </Wrapper>
  )
}

export default Socials
