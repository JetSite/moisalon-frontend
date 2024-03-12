import { useState } from "react";
import styled from "styled-components";
import { red, laptopBreakpoint } from "../../../../styles/variables";

const Wrapper = styled.div`
  display: inline-block;
`;

const PencilIcon = styled.div`
  display: inline-block;
  margin-left: 15px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    width: 19px;
    height: 19px;
    svg {
      width: 100%;
      height: auto;
    }
  }
`;

const EditConfirmIcon = styled.div`
  display: inline-block;
  margin-left: 15px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    width: 19px;
    height: 19px;
    svg {
      width: 100%;
      height: auto;
    }
  }
`;

const EditIcons = ({
  setIsEditing = () => {},
  handleEditConfirm = () => {},
  disable = false,
}) => {
  const [fill, setFill] = useState("#DCDCDC");
  const [edit, setEdit] = useState(false);

  const pencilHandler = () => {
    if (!disable) {
      setEdit(true);
      setIsEditing(true);
    }
  };

  const editHandler = () => {
    setEdit(false);
    setIsEditing(false);
    handleEditConfirm();
  };

  return (
    <Wrapper>
      <PencilIcon
        onClick={pencilHandler}
        onMouseMove={() => {
          if (!disable) setFill(red);
        }}
        onMouseLeave={() => setFill("#DCDCDC")}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          xmlns="http://www.w3.org/2000/svg"
          fill={edit ? "red" : fill}
        >
          <path d="M20.3806 7.17327L22.3163 5.23762C23.2272 4.32673 23.2272 2.84653 22.3163 2.0495L20.9499 0.683168C20.039 -0.227723 18.6727 -0.227723 17.7618 0.683168L15.8262 2.61881C15.8262 2.61881 20.3806 7.17327 20.3806 7.17327Z" />
          <path d="M1.25248 17.0792L1.13861 17.3069L0 23L5.69307 21.8614L5.80693 21.6337L1.25248 17.0792Z" />
          <path d="M2.16406 16.2822L14.9165 3.41583L19.471 7.97029L6.71852 20.8366L2.16406 16.2822Z" />
        </svg>
      </PencilIcon>
      {edit && (
        <EditConfirmIcon onClick={editHandler}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#F0F0F0" />
            <path
              d="M6.66602 10.4L11.2374 16L18.666 6.66669"
              stroke="#A1A1A1"
            />
          </svg>
        </EditConfirmIcon>
      )}
    </Wrapper>
  );
};

export default EditIcons;
