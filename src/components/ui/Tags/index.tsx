import { FC } from 'react'
import { Wrapper, Tag } from './styled'

interface Props {
  tags: string[]
  queryTag: (item: string) => void
}

const Tags: FC<Props> = ({ tags, queryTag }) => {
  return (
    <Wrapper>
      {tags?.map(item => (
        <Tag key={item} onClick={() => queryTag(item)}>
          {item}
        </Tag>
      ))}
    </Wrapper>
  )
}

export default Tags
