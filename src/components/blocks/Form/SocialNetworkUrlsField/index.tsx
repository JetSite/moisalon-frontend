import { Field, FieldInputProps } from 'react-final-form'
import TextField from '../TextField'
import { isUrl } from '../../../../utils/validations'
import { FieldWrap } from '../../../pages/Master/CreateMaster/components/RegistrationForm/styled'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import { FC } from 'react'
import { ISNetwork } from 'src/types'

interface Props {
  input: FieldInputProps<any>
  arrayFields: ISNetwork[]
}

const SocialNetworkUrlsField: FC<Props> = ({ input, arrayFields }) => {
  const { name } = input

  return (
    <>
      {arrayFields.map(field => (
        <FieldWrap>
          <Field
            name={`${name}.${field.slug}`}
            component={TextField}
            label={field.title}
            validate={isUrl}
            inputMode="url"
          />
        </FieldWrap>
      ))}
    </>
  )
}

export default SocialNetworkUrlsField
