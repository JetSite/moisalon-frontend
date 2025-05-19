import AboutPage from "../../components/pages/AboutPage";
import { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <AboutPage />
    </Fragment>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "О компании | MOI salon",
        description: "Узнайте больше о платформе MOI salon - инновационное решение для салонов красоты и мастеров",
        image: "/mobile-about-woman.jpg",
        url: "https://moi.salon/about",
      },
    },
  };
};

export default About;
