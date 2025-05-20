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
      schema: {
        type: 'WebPage',
        data: {
          '@type': 'AboutPage',
          name: "Правовая информация | MOI salon",
          description: "Правовая информация, условия использования и политика конфиденциальности платформы MOI salon",
          url: "https://moi.salon/legals",
          image: "https://moi.salon/mobile-main-bg.jpg",
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          }
        }
      }
    },
  };
};

export default Legals
