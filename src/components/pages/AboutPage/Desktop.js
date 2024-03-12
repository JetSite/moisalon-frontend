import MainLayout from "../../../layouts/MainLayout";
import { MainContainer } from "../../../styles/common";
import AboutProject from "./components/AboutProject";
import Advantages from "./components/Advantages";
import BusinessPossibilities from "./components/BusinessPossibilities";
import Line from "./components/Line";
import Mission from "./components/Mission";
import Possibilities from "./components/Possibilities";
import ProjectNumbers from "./components/ProjectNumbers";
import { Wrapper } from "./styles";

const lineTop = [
  {
    icon: "/mobile-crown.svg",
    text: "Работаем, чтобы вы были эффективнее",
  },
  {
    icon: "/mobile-star.svg",
    text: "Работаем, чтобы вы были эффективнее",
  },
];

const lineBottom = [
  {
    icon: "/mobile-heart.svg",
    text: "Скоро с beauty-платформой МОЙ вы сможете больше",
  },
  {
    icon: "/mobile-business.svg",
    text: "",
  },
];

const Desktop = () => {
  return (
    <MainLayout>
      <AboutProject />
      <MainContainer>
        <Wrapper>
          <ProjectNumbers />
        </Wrapper>
      </MainContainer>
      <Mission />
      <Line items={lineTop} />
      <MainContainer>
        <Wrapper>
          <Advantages />
        </Wrapper>
      </MainContainer>
      <BusinessPossibilities />
      <Line items={lineBottom} />
      <MainContainer>
        <Wrapper>
          <Possibilities />
        </Wrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default Desktop;
