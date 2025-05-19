import AboutPage from "../../components/pages/AboutPage";
import MainHead from "../MainHead";
import { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <MainHead 
        title="О компании | MOI salon"
        description="Узнайте больше о платформе MOI salon - инновационное решение для салонов красоты и мастеров"
        image="/mobile-about-woman.jpg"
      />
      <AboutPage />
    </Fragment>
  );
};

export default About;
