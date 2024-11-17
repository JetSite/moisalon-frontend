import { FC, ReactNode } from 'react'
import {
  LinkButtonCustom,
  fontVariants,
  sizeVariants,
  styleVariants,
} from './styled'
import { LinkProps } from 'next/link'

export interface LinkButtonProps extends Omit<LinkProps, 'as'> {
  variant: keyof typeof styleVariants
  size?: keyof typeof sizeVariants
  font?: keyof typeof fontVariants
  mb?: string
  mt?: string
  z?: string
  children: ReactNode
  disabled?: boolean
}

const LinkButton: FC<LinkButtonProps> = ({
  variant = 'dark',
  size = 'small',
  children,
  ...rest
}) => {
  return (
    <LinkButtonCustom size={size} variant={variant} {...rest}>
      {children}
    </LinkButtonCustom>
  )
}

export default LinkButton
