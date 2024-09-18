import { FC } from 'react'
import {
  MobileHidden,
  MobileVisible,
} from '../../../../../../../../styles/common'
import { CustomButton, ButtonsBlockText } from '../../styles'

interface Props {
  showAdditionalHandler: () => void
  disabled: boolean
  textConfirmButton: string
  textAddititionalButton: string
}

export const RentalInfoButtons: FC<Props> = ({
  showAdditionalHandler,
  disabled,
  textConfirmButton,
  textAddititionalButton,
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
          {textConfirmButton}
        </CustomButton>
        <ButtonsBlockText>или</ButtonsBlockText>
        <CustomButton
          variant="darkTransparent"
          size="noWidth"
          font="small"
          onClick={() => showAdditionalHandler()}
        >
          {textAddititionalButton}
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
          {textConfirmButton}
        </CustomButton>
        <ButtonsBlockText>или</ButtonsBlockText>
        <CustomButton
          variant="darkTransparent"
          size="noWidth"
          onClick={() => showAdditionalHandler()}
        >
          {textAddititionalButton}
        </CustomButton>
      </MobileVisible>
    </>
  )
}
