import Link from 'next/link'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

const WrapperLink = styled(Link)`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    position: absolute;
    top: 156px;
    left: 10px;
    padding: 10px;
    cursor: pointer;
  }
`

const Icon = styled.img`
  width: 100%;
  height: auto;
`

const BackArrow = ({ link }: { link: string }) => {
  return (
    <WrapperLink href={`/${link}`} data-navigate={`/${link}`}>
      <Icon src="/arrow-back.svg" />
    </WrapperLink>
  )
}

export default BackArrow
