import styled from "styled-components";
import { red, laptopBreakpoint } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  background: ${red};
  text-align: center;
  padding: 17px 0;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const Text = styled.p`
  display: inline-block;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  transform: perspective(1px) translateZ(0);
  backface-visibility: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;
