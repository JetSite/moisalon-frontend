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
      schema: {
        type: 'Organization',
        data: {
          name: 'MOI salon',
          description: 'MOI salon - инновационное решение для салонов красоты и мастеров',
          url: 'https://moi.salon',
          logo: 'https://moi.salon/logo.png',
          image: 'https://moi.salon/mobile-about-woman.jpg',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'RU'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'info@moi.salon'
          }
        }
      }
    },
  };
};

export default About;
