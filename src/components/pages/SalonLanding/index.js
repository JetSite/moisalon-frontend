import Advantages from "./components/Advantages";
import Header from "./components/Header";
import Line from "./components/Line";
import Login from "./components/Login";
import RegInvite from "./components/RegInvite";
import Rent from "./components/Rent";
import SalonsSlider from "./components/SalonLandinSalonsSlider";
import Footer from "../../blocks/Footer";

const SalonLanding = () => {
  return (
    <>
      <Header />
      <RegInvite />
      <Advantages />
      <Line
        text="Новый формат работы преображает бизнес от и до."
        border="#fff"
        bg="#000"
        length="1300"
      />
      <Rent />
      <SalonsSlider />
      <Line
        text="14000+ МАСТЕРОВ ИЩУТ РАБОЧЕЕ МЕСТО ЕЖЕМЕСЯЧНО."
        border="#fff"
        bg="#000"
        length="1260"
      />
      <Login />
      <Footer landing={true} />
    </>
  );
};

export default SalonLanding;
