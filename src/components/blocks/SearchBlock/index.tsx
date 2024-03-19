import { FC } from 'react'
import { MainContainer } from '../../../styles/common'
import Search from '../../ui/Search'
import { Wrapper } from './styled'

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
