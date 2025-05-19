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
    },
  };
};

export default ForBrand;
