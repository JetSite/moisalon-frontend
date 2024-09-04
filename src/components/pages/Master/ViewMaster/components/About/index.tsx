import { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import { textTruncate } from '../../../../../../utils/textTruncate'

import { Wrapper, ShowMore, Text } from './styles'
import { IMaster } from 'src/types/masters'

const About: FC<{ master: IMaster }> = ({ master }) => {
  const description = master?.description.replace(/\n/g, '<br />')
  const [collapsed, setCollapsed] = useState(true)
  const collapsedDescription =
    collapsed && description
      ? textTruncate(description.replace(/\n/g, '<br />'), 180)
      : description
  const collapsedText = collapsed ? 'Узнать больше' : 'Скрыть'

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    if (description?.length > 180) {
      setCollapsed(true)
    }
  }, [])

  return (
    <>
      <MainContainer id="about">
        <Wrapper>
          {description ? (
            collapsed ? (
              <Text
                dangerouslySetInnerHTML={{
                  __html: collapsedDescription,
                }}
              />
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )
          ) : (
            'Нет описания'
          )}
          {description &&
          (description.length > 180 || description.includes('<br />')) ? (
            <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default About
