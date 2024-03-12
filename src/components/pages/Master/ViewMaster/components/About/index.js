import { useState, useEffect } from "react";
import { MainContainer } from "../../../../../../styles/common";
import { textTruncate } from "../../../../../../utils/textTruncate";

import { Wrapper, ShowMore, Text } from "./styles";

const About = ({ master }) => {
  const description = master?.description;
  const [collapsed, setCollapsed] = useState(true);
  const collapsedDescription =
    collapsed && description ? textTruncate(description, 180) : description;
  const collapsedText = collapsed ? "Узнать больше" : "Скрыть";

  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (description?.length > 180) {
      setCollapsed(true);
    }
  }, []);

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
            "Нет описания"
          )}
          {description && description.length > 180 ? (
            <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default About;
