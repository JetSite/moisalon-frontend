import Footer from "../components/blocks/Footer";
import Header from "../components/pages/MainPage/components/Header";
import MasterSlider from "../components/pages/MainPage/components/MainMasterSlider";
import SalonSlider from "../components/pages/MainPage/components/MainSalonsSlider";
import BrandSlider from "../components/pages/MainPage/components/MainBrandsSlider";
import Line from "../components/pages/MainPage/components/Line";
import About from "../components/pages/MainPage/components/About";

const CategoryPageLayout = ({ rent = false, children, me, loading }) => {
  return (
    <>
      <Header loading={loading} />
      {children}
      {rent ? null : <MasterSlider me={me} />}
      <SalonSlider rent={rent} me={me} />
      <BrandSlider me={me} />
      <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
      <About me={me} />
      <Footer />
    </>
  );
};

export default CategoryPageLayout;
