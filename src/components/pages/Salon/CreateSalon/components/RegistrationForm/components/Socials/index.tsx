import React, { FC, RefObject } from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import { isUrl } from '../../../../../../../../utils/validations'
import SocialNetworkUrlsField from '../../../../../../../blocks/Form/SocialNetworkUrlsField'
import TextFieldAdapter from '../../../../../../../blocks/Form/TextField'
import { FieldWrap } from '../../styled'

import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import Group from '../../../../../../../blocks/Form/Group'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'

const Wrapper = styled.div`
  margin-top: 105px;
  margin-bottom: 75px;
  padding-top: 15px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 80px;
    margin-bottom: 63px;
  }
`

const Title = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding-bottom: 8px;
    margin-bottom: 14px;
    border-bottom: 1px solid #e3e3e3;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

interface Props {
  ref6: RefObject<HTMLDivElement>
}

const Socials: FC<Props> = ({ ref6 }) => {
  return (
    <Wrapper id="socials" ref={ref6}>
      <Title>Дополнительная информация</Title>
      <Group description="Дополнительные социальные сети" mbDesc={30}>
        <FieldWrap>
          <Field
            parse={parseFieldsToString}
            name="webSiteUrl"
            component={TextFieldAdapter}
            label="Веб-сайт"
            inputMode="url"
            validate={isUrl}
          />
        </FieldWrap>
        <Field name="socialNetworkUrls" component={SocialNetworkUrlsField} />
      </Group>
    </Wrapper>
  )
}

export default Socials
