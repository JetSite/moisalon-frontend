import { useState, useEffect, FC, useRef } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../styles/variables'

const Text = styled.p<{ isCollapsed: boolean }>`
  width: 67%;
  /* padding-top: 75px; */
  font-size: 14px;
  line-height: 27px;
  max-height: ${({ isCollapsed }) =>
    isCollapsed ? '81px' : 'none'}; // 81px = 3 строки текста
  overflow: hidden;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin: 35px 0 20px 0;
  }
`

const ShowMore = styled.button`
  display: block;
  width: fit-content;
  margin-top: 25px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
  }
`

interface Props {
  description: string | null
}

// Функция для обработки переносов строк
const parseNewLines = (text: string | null) => {
  if (!text) return null
  return text.split('\n').map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ))
}

const EntityDescription: FC<Props> = ({ description }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      textRef.current &&
      textRef.current.scrollHeight > textRef.current.clientHeight
    ) {
      setShouldCollapse(true)
    }
  }, [description])

  const [renderDescription, setRenderDescription] = useState<
    JSX.Element[] | null
  >(parseNewLines(description))

  useEffect(() => {
    setRenderDescription(parseNewLines(description))
  }, [collapsed])

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  if (!description) return null

  return (
    <>
      <Text ref={textRef} isCollapsed={collapsed}>
        {renderDescription}
      </Text>
      {shouldCollapse && (
        <ShowMore onClick={handleChange}>
          {collapsed ? 'Узнать больше' : 'Скрыть'}
        </ShowMore>
      )}
    </>
  )
}

export default EntityDescription
