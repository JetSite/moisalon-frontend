import MainLayout from "../../layouts/MainLayout";
import Beauty from "../../components/pages/Beauty";

const BeautyPage = () => {
  return (
    <MainLayout>
      <Beauty />
    </MainLayout>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "Красота и стиль | MOI salon",
        description: "Все о красоте, стиле и уходе за собой на платформе MOI salon",
        image: "/services-page-photo8.jpg",
        url: "https://moi.salon/beauty",
      },
      schema: {
        type: 'CollectionPage',
        data: {
          name: "Красота и стиль | MOI salon",
          description: "Все о красоте, стиле и уходе за собой на платформе MOI salon",
          url: "https://moi.salon/beauty",
          image: "https://moi.salon/services-page-photo8.jpg",
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'WebPage',
            name: "Красота и стиль",
            description: "Все о красоте, стиле и уходе за собой на платформе MOI salon",
            url: "https://moi.salon/beauty",
          }
        }
      }
    },
  };
};

export default BeautyPage;