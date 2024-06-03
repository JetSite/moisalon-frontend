import React, { FC } from 'react'
import PhoneField from '.'
import AutoFocusedArrayField from '../AutoFocusedArrayField'

const PhoneArrayField: FC<{ name: string }> = ({ name }) => {
  const arrayProps = {
    name,
    fieldComponent: PhoneField,
    initialValues: {
      haveTelegram: false,
      haveWhatsApp: false,
      haveViber: false,
      phoneNumber: '',
    },
    title: 'телефон',
  }

  return <AutoFocusedArrayField {...arrayProps} />
}

export default PhoneArrayField
