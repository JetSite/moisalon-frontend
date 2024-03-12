import {
  LineWrapper,
  LineContent,
  LineElement,
  LineTitle,
  LineIcon,
} from "../styles";

const Line = ({ items }) => {
  return (
    <LineWrapper>
      <LineContent>
        {items.map((item) => (
          <LineElement>
            <LineIcon src={item.icon} />
            <LineTitle>{item.text}</LineTitle>
          </LineElement>
        ))}
      </LineContent>
    </LineWrapper>
  );
};

export default Line;
