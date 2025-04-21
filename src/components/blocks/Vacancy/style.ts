import { LazyImage } from '@/components/newUI/common/LazyIMage';
import { laptopBreakpoint, red } from 'src/styles/variables';
import styled from 'styled-components';

export const VacancyWrap = styled.li`
  width: 218px;
  min-height: 346px;
  padding: 22px 27px 25px 27px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
  color: #000;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 12px 10px 15px 10px;
  }
`;

export const VacancyTop = styled.div`
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

export const Image = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 300px;
  }
`;

export const VacancyContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const VacancyOwner = styled.p`
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`;

export const VacancyTitle = styled.p`
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
    height: auto;
  }
`;

export const VacancyBottom = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  flex-shrink: 1;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const VacancyAmount = styled.div`
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

export const DeleteVacancyBtn = styled.button`
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
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
