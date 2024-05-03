import { FC } from 'react'
import { MainContainer } from '../../../styles/common'
import { Wrapper } from './styled'
import Search from 'src/components/ui/Search'

interface Props {
  title?: string
  noFilters?: boolean
}

const SearchBlock: FC<Props> = ({ title, noFilters = false }) => {
  return (
    <MainContainer>
      <Wrapper>
        <Search noFilters={noFilters} title={title} />
      </Wrapper>
    </MainContainer>
  )
}

export default SearchBlock
