import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PhotoAdd from "../CreateEducation/PhotoAdd";
import "moment/locale/ru";
import { laptopBreakpoint, red } from "../../../../styles/variables";
import { PHOTO_URL } from "../../../../variables";

const VacancyWrap = styled.div`
  width: 218px;
  padding: 22px 27px 25px 27px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
  color: #000;
  transition: 0.2s;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 12px 10px 15px 10px;
  }
`;

const VacancyTop = styled.div`
  width: 166px;
  height: 166px;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  overflow: hidden;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VacancyContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

const VacancyOwner = styled.p`
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`;

const VacancyTitle = styled.p`
  height: 66px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  margin-top: 5px;
  overflow: hidden;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 16px;
  }
`;

const VacancyBottom = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  flex-shrink: 1;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

const VacancyAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  background: ${red};
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const DeleteVacancyBtn = styled(VacancyAmount)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Vacancy = ({
  id,
  name,
  title,
  create = false,
  onAdd,
  photoId = null,
  type,
  removeVacancy,
}) => {
  const [hover, setHover] = useState(false);
  const { pathname } = useRouter();

  const removeVacancyHandler = (vacancyId) => {
    removeVacancy({
      variables: {
        input: {
          id: vacancyId,
        },
      },
    });
  };

  return (
    <VacancyWrap>
      {!create ? (
        <VacancyTop>
          <Image alt="photo" src={`${PHOTO_URL}${photoId}/original`} />
        </VacancyTop>
      ) : (
        <VacancyTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <PhotoAdd
            photoId={photoId}
            hover={hover && photoId}
            onAdd={onAdd}
            type={type}
          />
        </VacancyTop>
      )}
      <VacancyContent>
        <VacancyTitle>{title}</VacancyTitle>
        <VacancyOwner>{name}</VacancyOwner>
        <VacancyBottom>
          {/* {amountFrom && amountTo ? (
            <VacancyAmount>от {amountFrom} ₽</VacancyAmount>
          ) : null} */}
          {pathname === "/masterCabinet" && !create ? (
            <DeleteVacancyBtn onClick={() => removeVacancyHandler(id)}>
              Удалить вакансию
            </DeleteVacancyBtn>
          ) : null}
        </VacancyBottom>
      </VacancyContent>
    </VacancyWrap>
  );
};

export default Vacancy;
