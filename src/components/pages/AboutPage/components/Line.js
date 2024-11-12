import {
  LineWrapper,
  LineContent,
  LineElement,
  LineTitle,
  LineIcon,
} from '../styles'

const Line = ({ items }) => {
  return (
    <LineWrapper>
      <LineContent>
        {items.map(item => (
          <LineElement key={item.text}>
            <LineIcon src={item.icon} />
            <LineTitle>{item.text}</LineTitle>
          </LineElement>
        ))}
      </LineContent>
    </LineWrapper>
  )
}

export default Line
