import { FC, ReactNode } from 'react'
import { LinkButtonCustom } from './styled'
import { LinkProps } from 'next/link'
import { IBaseButtonProps } from './Button'

export interface LinkButtonProps
  extends Omit<LinkProps, 'as'>,
    IBaseButtonProps {
  children: ReactNode
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
