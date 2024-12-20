import React, { FC, RefObject } from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import { isUrl } from '../../../../../../../../utils/validations'
import SocialNetworkUrlsField from '../../../../../../../blocks/Form/SocialNetworkUrlsField'
import TextFieldAdapter from '../../../../../../../blocks/Form/TextField'
import { FieldWrap } from '../../styled'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import { ISNetwork } from 'src/types'

const Wrapper = styled.div`
  margin-top: 120px;
  margin-bottom: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
  }
`

const Text = styled.p`
  margin-bottom: 40px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

interface Props {
  ref2: RefObject<HTMLDivElement>
  sNetworks: ISNetwork[]
}

const Socials: FC<Props> = ({ ref2, sNetworks }) => {
  return (
    <Wrapper id="socials" ref={ref2}>
      <Text>Дополнительные социальные сети</Text>
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="webSiteUrl"
          component={TextFieldAdapter}
          label="Сайт"
          inputMode="url"
          validate={isUrl}
        />
      </FieldWrap>
      <Field
        name="socialNetworkUrls"
        render={({ input }) => (
          <SocialNetworkUrlsField input={input} arrayFields={sNetworks} />
        )}
      />
    </Wrapper>
  )
}

export default Socials
