import { useState } from "react";
import Advantages from "./components/Advantages";
import Header from "./components/Header";
import Line from "./components/Line";
import Change from "./components/Change";
import RegInvite from "./components/RegInvite";
import Rent from "./components/Rent";
import Cards from "./components/Cards";
import Footer from "../../blocks/Footer";
import BrandLandingSlider from "./components/BrandLandingSlider";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import BrandLandingPopup from "./components/BrandLandingPopup";
import SuccessPopup from "./components/SuccessPopup";

const BrandLanding = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  return (
    <>
      <BrandLandingPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setOpenSuccess={setOpenSuccess}
      />
      <SuccessPopup openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} />
      <Header setOpenPopup={setOpenPopup} />
      <RegInvite />
      <Advantages />
      <Line
        text="1 платформа – 7 результатов."
        border="#fff"
        bg="#000"
        length="720"
      />
      <Rent />
      <Line
        text="Больше возможностей для развития бренда."
        border="#000"
        bg="#fff"
        length="1150"
      />
      <Cards />
      <Change setOpenPopup={setOpenPopup} />
      <BrandLandingSlider />
      <Tasks />
      <Login setOpenSuccess={setOpenSuccess} setOpenPopup={setOpenPopup} />
      <Footer landing={true} />
    </>
  );
};

export default BrandLanding;
