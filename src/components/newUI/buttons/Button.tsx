import { ButtonHTMLAttributes, FC } from 'react'
import {
  ButtonCustom,
  fontVariants,
  sizeVariants,
  styleVariants,
} from './styled'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof styleVariants
  size?: keyof typeof sizeVariants
  font?: keyof typeof fontVariants
  mb?: string
  mt?: string
  z?: string
  as?: keyof JSX.IntrinsicElements
  loading?: boolean
}

const Button: FC<ButtonProps> = ({
  variant = 'dark',
  size = 'small',
  as = 'button',
  onClick,
  children,
  mb,
  mt,
  z,
  font,
  ...rest
}) => {
  return (
    <ButtonCustom
      as={as}
      size={size}
      variant={variant}
      onClick={onClick}
      mb={mb}
      mt={mt}
      z={z}
      font={font}
      {...rest}
    >
      {children}
    </ButtonCustom>
  )
}

export default Button
