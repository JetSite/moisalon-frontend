import { Wrapper } from "./styles";
import Main from "./components/Main";
import FastSearch from "./components/FastSearch";
import WithPlatform from "./components/WithPlatform";
import SalonsLandingSlider from "./components/SalonsLandingSlider";
import Login from "./components/Login";
import Footer from "../../blocks/Footer";

const MasterLanding = () => {
  return (
    <Wrapper>
      <Main />
      <FastSearch />
      <WithPlatform />
      <SalonsLandingSlider />
      <Login />
      <Footer landing={true} />
    </Wrapper>
  );
};

export default MasterLanding;
