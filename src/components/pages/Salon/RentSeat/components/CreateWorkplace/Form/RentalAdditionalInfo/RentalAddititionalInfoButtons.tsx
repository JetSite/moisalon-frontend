import { FC } from 'react'
import { MobileHidden, MobileVisible } from 'src/styles/common'
import { Back, CustomButton } from '../../styles'

interface Props {
  disabled: boolean
  text?: string
}

export const RentalAddititionalInfoButtons: FC<Props> = ({
  disabled,
  text = 'Сохранить и разместить на платформе',
}) => {
  return (
    <>
      <MobileHidden>
        <CustomButton
          variant="red"
          size="noWidth"
          font="small"
          type="submit"
          disabled={disabled}
        >
          {text}
        </CustomButton>
      </MobileHidden>
      <MobileVisible>
        <CustomButton
          variant="red"
          size="fullWidth"
          font="popUp"
          type="submit"
          style={{ marginBottom: 20 }}
          disabled={disabled}
        >
          {text}
        </CustomButton>
      </MobileVisible>
    </>
  )
}
