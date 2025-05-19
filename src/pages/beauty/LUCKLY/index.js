import MainLayout from "../../../layouts/MainLayout";
import LucklyPage from "../../../components/pages/Beauty/LUCKLY";

const Luckly = () => {
  return (
    <MainLayout>
      <LucklyPage />
    </MainLayout>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "LUCKLY | MOI salon",
        description: "Профессиональная косметика LUCKLY для салонов красоты на платформе MOI salon",
        image: "/luckly-1.jpg",
        url: "https://moi.salon/beauty/LUCKLY",
      },
    },
  };
};

export default Luckly;
