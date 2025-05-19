import MainLayout from "../../../layouts/MainLayout";
import PaulOscarPage from "../../../components/pages/Beauty/PaulOscar";

const PaulOscar = () => {
  return (
    <MainLayout>
      <PaulOscarPage />
    </MainLayout>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "Paul Oscar | MOI salon",
        description: "Профессиональная косметика Paul Oscar для салонов красоты на платформе MOI salon",
        image: "/paul-oscar-1.jpg",
        url: "https://moi.salon/beauty/PaulOscar",
      },
    },
  };
};

export default PaulOscar;
