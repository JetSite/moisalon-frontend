import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainContainer } from "../../../../../../styles/common";
import { textTruncate } from "../../../../../../utils/textTruncate";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

const Wrapper = styled.div`
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`;

const Text = styled.div`
  width: 67%;
  padding-top: 75px;
  font-size: 14px;
  line-height: 27px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin: 35px 0 20px 0;
  }
`;

const TextCollapsed = styled.div`
  width: 67%;
  padding-top: 75px;
  font-size: 14px;
  line-height: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    width: 100%;
    margin: 35px 0 20px 0;
  }
`;

const ShowMore = styled.span`
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
`;

const About = ({ salon }) => {
  const description = salon?.description;
  const [collapsed, setCollapsed] = useState(false);
  const collapsedDescription =
    collapsed && description ? textTruncate(description, 180) : description;
  const collapsedText = collapsed ? "Узнать больше" : "Скрыть";

  useEffect(() => {
    if (description?.length > 180) {
      setCollapsed(true);
    }
  }, []);

  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  return (
    <MainContainer id="about">
      <Wrapper>
        {description ? (
          collapsed ? (
            <TextCollapsed>{collapsedDescription}</TextCollapsed>
          ) : (
            <Text>{description}</Text>
          )
        ) : (
          "Нет описания"
        )}
        {description && description.length > 180 ? (
          <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
        ) : null}
      </Wrapper>
    </MainContainer>
  );
};

export default About;
