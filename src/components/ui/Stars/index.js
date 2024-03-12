import { Wrapper, ActiveStar, DisableStar } from "./styled";

const Stars = ({ count }) => {
  let countNum = count > 0 && count < 6 ? count : 0;

  return (
    <Wrapper>
      {[...Array(countNum)].map((_, i) => (
        <ActiveStar key={i} />
      ))}
      {[...Array(5 - countNum)].map((_, i) => (
        <DisableStar key={i} />
      ))}
    </Wrapper>
  );
};

export default Stars;
