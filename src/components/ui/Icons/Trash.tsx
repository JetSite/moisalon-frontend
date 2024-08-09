import { FC } from 'react'
import styled from 'styled-components'

export const IconStiled = styled.svg`
  display: block;
  width: 24px;
  height: 24px;
`

export interface IIconsProps {
  className?: string
}

export const TrashIcon: FC<IIconsProps> = ({ className }) => {
  return (
    <IconStiled
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z" />
    </IconStiled>
  )
}