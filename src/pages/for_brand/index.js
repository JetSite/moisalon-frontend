import BrandLanding from "../../components/pages/BrandLanding";
import { Fragment } from "react";

const ForBrand = () => {
  return (
    <Fragment>
      <BrandLanding />
    </Fragment>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "Для брендов | MOI salon",
        description: "MOI salon - платформа для косметических брендов. Продвигайте продукцию, находите партнеров и расширяйте аудиторию",
        image: "/ribbon-1.jpg",
        url: "https://moi.salon/for_brand",
      },
      schema: {
        type: 'WebPage',
        data: {
          name: "Для брендов | MOI salon",
          description: "MOI salon - платформа для косметических брендов. Продвигайте продукцию, находите партнеров и расширяйте аудиторию",
          url: "https://moi.salon/for_brand",
          image: "https://moi.salon/ribbon-1.jpg",
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'Service',
            name: 'Платформа для косметических брендов',
            description: 'Продвигайте продукцию, находите партнеров и расширяйте аудиторию на платформе MOI salon',
            provider: {
              '@type': 'Organization',
              name: 'MOI salon',
              url: 'https://moi.salon',
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Beauty Brands',
            }
          }
        }
      }
    },
  };
};

export default ForBrand;
