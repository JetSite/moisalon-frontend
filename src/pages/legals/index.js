import MainLayout from "../../layouts/MainLayout"
import LegalsPage from "../../components/pages/LegalsPage"

const Legals = () => {
  return (
    <MainLayout>
      <LegalsPage />
    </MainLayout>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "Правовая информация | MOI salon",
        description: "Правовая информация, условия использования и политика конфиденциальности платформы MOI salon",
        image: "/mobile-main-bg.jpg",
        url: "https://moi.salon/legals",
      },
    },
  };
};

export default Legals
