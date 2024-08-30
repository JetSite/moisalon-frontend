import { Field, FieldInputProps } from 'react-final-form'
import TextField from '../TextField'
import { isUrl } from '../../../../utils/validations'
import { FieldWrap } from '../../../pages/Master/CreateMaster/components/RegistrationForm/styled'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import { FC } from 'react'

interface Props {
  input: FieldInputProps<any>
}

const SocialNetworkUrlsField: FC<Props> = ({ input }) => {
  const { name } = input
  return (
    <>
      {/* <FieldWrap>
        <Field
          name={`${name}.instagram`}
          component={TextField}
          label="Instagram"
          validate={isUrl}
          inputMode="url"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          name={`${name}.facebook`}
          component={TextField}
          label="Facebook"
          validate={isUrl}
          inputMode="url"
        />
      </FieldWrap> */}
      <FieldWrap>
        <Field
          name={`${name}.vKontakte`}
          component={TextField}
          label="Vkontakte"
          validate={isUrl}
          inputMode="url"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          name={`${name}.odnoklassniki`}
          component={TextField}
          label="Одноклассники"
          validate={isUrl}
          inputMode="url"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          name={`${name}.youTube`}
          component={TextField}
          label="Youtube"
          validate={isUrl}
          inputMode="url"
        />
      </FieldWrap>
    </>
  )
}

export default SocialNetworkUrlsField
