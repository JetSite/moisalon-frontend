import { NumberWrapper, Item, Content, Quantity, NumbersText } from "../styles";

const nums = [
  { quantity: 60, text: "городов" },
  { quantity: 20000, text: "посетителей в месяц" },
  { quantity: 1200, text: "салонов красоты" },
  { quantity: 410, text: "мастеров" },
  { quantity: 195, text: "брендов" },
];

const ProjectNumbers = () => {
  return (
    <NumberWrapper>
      {nums.map((num, id) => (
        <Item key={id}>
          <Content>
            <Quantity>{num.quantity}</Quantity>
            <NumbersText>{num.text}</NumbersText>
          </Content>
        </Item>
      ))}
    </NumberWrapper>
  );
};

export default ProjectNumbers;
