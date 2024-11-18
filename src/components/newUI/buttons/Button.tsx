import { ButtonHTMLAttributes, FC } from 'react'
import {
  ButtonCustom,
  fontVariants,
  sizeVariants,
  styleVariants,
} from './styled'

export interface IBaseButtonProps {
  variant: keyof typeof styleVariants
  size?: keyof typeof sizeVariants
  font?: keyof typeof fontVariants
  mb?: string
  mt?: string
  z?: string
  loading?: boolean
  disabled?: boolean
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IBaseButtonProps {
  as?: keyof JSX.IntrinsicElements
}

const Button: FC<ButtonProps> = ({
  variant = 'dark',
  size = 'small',
  as = 'button',
  children,
  mb,
  mt,
  z,
  font,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <ButtonCustom
      as={as}
      size={size}
      variant={variant}
      mb={mb}
      mt={mt}
      z={z}
      font={font}
      disabled={loading || disabled}
      aria-busy={loading}
      role="button"
      {...rest}
    >
      {children}
    </ButtonCustom>
  )
}

export default Button
