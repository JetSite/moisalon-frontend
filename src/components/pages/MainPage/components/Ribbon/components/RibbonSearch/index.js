import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../../styles/variables";

const Wrapper = styled.div`
  width: 535px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;

  &:after {
    content: "";
    width: 20px;
    height: 22px;
    position: absolute;
    top: 17px;
    right: 24px;
    background: url("/search.svg") no-repeat center;
    background-size: contain;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
    margin-bottom: 10px;
    &:after {
      width: 15px;
      height: 17px;
      top: 10px;
      right: 18px;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding-left: 25px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 400;
  outline: none;

  &::-webkit-input-placeholder {
    font-size: 18px;
    font-weight: 400;
  }
  &::-moz-placeholder {
    font-size: 18px;
    font-weight: 400;
  }
  &:-moz-placeholder {
    font-size: 18px;
    font-weight: 400;
  }
  &:-ms-input-placeholder {
    font-size: 18px;
    font-weight: 400;
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 36px;
    padding-left: 15px;
    font-size: 14px;

    &::-webkit-input-placeholder {
      font-size: 14px;
    }
    &::-moz-placeholder {
      font-size: 14px;
    }
    &:-moz-placeholder {
      font-size: 14px;
    }
    &:-ms-input-placeholder {
      font-size: 14px;
    }
  }
`;

const RibbonSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Поиск по бьюти-ленте"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </Wrapper>
  );
};

export default RibbonSearch;
