import Footer from "../components/blocks/Footer";
import Header from "../components/pages/MainPage/components/Header";
import About from "../components/pages/MainPage/components/About";

const BusinessCategoryPageLayout = ({ children, me, loading }) => {
  return (
    <>
      <Header loading={loading} />
      {children}
      <About me={me} />
      <Footer />
    </>
  );
};

export default BusinessCategoryPageLayout;
