import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { MobileVisible, MobileHidden } from "../../../styles/common";

const AboutPage = () => {
  return (
    <>
      <MobileHidden>
        <Desktop />
      </MobileHidden>
      <MobileVisible>
        <Mobile />
      </MobileVisible>
    </>
  );
};

export default AboutPage;
