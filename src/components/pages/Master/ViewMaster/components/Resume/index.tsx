import { FC } from 'react'
import { IResume } from 'src/types/masters'
import { MainContainer } from '../../../../../../styles/common'
import { Wrapper, Title, Content } from './styles'

interface Props {
  resume: IResume
}

const Resume: FC<Props> = ({ resume }) => {
  return (
    <MainContainer>
      <Wrapper>
        <Title>Резюме: {resume.title}</Title>
        <Content
          dangerouslySetInnerHTML={{
            __html: resume.content,
          }}
        />
      </Wrapper>
    </MainContainer>
  )
}

export default Resume
