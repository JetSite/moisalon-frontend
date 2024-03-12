import MainLayout from "../../../layouts/MainLayout";
import AboutProject from "./components/AboutProject";
import Advantages from "./components/Advantages";
import BusinessPossibilities from "./components/BusinessPossibilities";
import Mission from "./components/Mission";
import Possibilities from "./components/Possibilities";
import ProjectNumbers from "./components/ProjectNumbers";

const Mobile = () => {
  return (
    <MainLayout>
      <AboutProject />
      <ProjectNumbers />
      <Mission />
      <Advantages />
      <BusinessPossibilities />
      <Possibilities />
    </MainLayout>
  );
};

export default Mobile;
