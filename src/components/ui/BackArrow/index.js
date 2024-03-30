import Link from 'next/link'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

const Wrapper = styled.div`
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

const BackArrow = ({ link }) => {
  const editedLink = link.split('?')
  return (
    <Link href={`/${link}`} as={`/${editedLink[0]}`}>
      <Wrapper>
        <Icon src="/arrow-back.svg" />
      </Wrapper>
    </Link>
  )
}

export default BackArrow
