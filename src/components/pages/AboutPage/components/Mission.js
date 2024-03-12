import { MobileHidden } from "../../../../styles/common";
import {
  MissionWrapper,
  MissionContent,
  MissionTitle,
  MissionText,
  Romb,
  Rectangle,
  OneIcon,
  Star,
  RedCircle,
  BlackArrow,
  SmallCircle,
  RedHook,
  BigRomb,
} from "../styles";

const Mission = () => {
  return (
    <MissionWrapper>
      <MissionContent>
        <MissionTitle>Миссия</MissionTitle>
        <MissionText>
          Мы создаём инфраструктуру и постоянно совершенствуем инструменты для
          комфортного и прозрачного взаимодействия представителей
          бьюти-индустрии между собой и со своими клиентами.
        </MissionText>
      </MissionContent>
      <MobileHidden>
        <Romb />
        <Rectangle />
        <OneIcon />
        <Star />
        <RedCircle />
        <BlackArrow />
        <SmallCircle />
        <RedHook />
        <BigRomb />
      </MobileHidden>
    </MissionWrapper>
  );
};

export default Mission;
