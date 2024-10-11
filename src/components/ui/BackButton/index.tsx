import styled from 'styled-components'
import { useRouter } from 'next/router'

import { laptopBreakpoint } from '../../../styles/variables'
import { FC } from 'react'

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 34px;
`

const Icon = styled.img``

const Text = styled.p`
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
}

const BackButton: FC<Props> = ({
  type,
  name,
  link,
  onlyType = false,
  noLink = false,
  queryLink,
}) => {
  const router = useRouter()
  return (
    <Wrapper
      onClick={() => {
        if (noLink) return
        if (queryLink && link) {
          router.push({ path: link, query: queryLink })
        }
        if (link && !queryLink) {
          router.push(link)
        }
      }}
    >
      <Icon alt="back" src="/arrow-back.svg" />
      <Text>{type}</Text>
      {!onlyType ? <Text>–</Text> : null}
      {!onlyType ? <Text>{name}</Text> : null}
    </Wrapper>
  )
}

export default BackButton
