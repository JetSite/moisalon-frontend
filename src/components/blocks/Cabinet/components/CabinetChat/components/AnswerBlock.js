import { useState } from "react";

import Icon from "./Icon";
import { AnswerInputWrapper, AnswerInput, AnswerIcon } from "./styles";

const AnswerBlock = ({ answerMessage }) => {
  const [answerInput, setAnswerInput] = useState("");

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      answerHandler(event);
    }
  };

  const answerHandler = (event) => {
    answerMessage(event, answerInput);
    setAnswerInput("");
  };

  return (
    <AnswerInputWrapper>
      <AnswerInput
        type="text"
        placeholder="Ответить"
        value={answerInput}
        onChange={(e) => setAnswerInput(e.target.value)}
        onKeyPress={keyPressHandler}
      />
      <AnswerIcon onClick={answerHandler}>
        <Icon active={answerInput?.length > 0} />
      </AnswerIcon>
    </AnswerInputWrapper>
  );
};

export default AnswerBlock;
