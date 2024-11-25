import styled from 'styled-components'

import { laptopBreakpoint } from '../../../styles/variables'
import { FC } from 'react'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 34px;
`

const Icon = styled.img``

const Text = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  margin-left: 9px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
  }
`

interface Props {
  type: string
  name?: string
  link?: string
  onlyType?: boolean
  noLink?: boolean
  queryLink?: { [K: string]: string }
  handleClick?: () => void
}

const BackButton: FC<Props> = ({
  type,
  name,
  link: pathname,
  onlyType = false,
  noLink = false,
  queryLink: query,
  handleClick,
}) => {
  const href = noLink ? undefined : { pathname, query }
  return (
    <Wrapper
      as={noLink ? 'button' : Link}
      shallow
      href={href}
      onClick={handleClick}
    >
      <Icon alt="back" src="/arrow-back.svg" />
      <Text>{type}</Text>
      {!onlyType ? <Text>–</Text> : null}
      {!onlyType ? <Text>{name}</Text> : null}
    </Wrapper>
  )
}

export default BackButton
