import BrandLanding from "../../components/pages/BrandLanding";
import MainHead from "../MainHead";
import { Fragment } from "react";

const ForBrand = () => {
  return (
    <Fragment>
      <MainHead 
        title="Для брендов | MOI salon"
        description="MOI salon - платформа для косметических брендов. Продвигайте продукцию, находите партнеров и расширяйте аудиторию"
        image="/ribbon-1.jpg"
      />
      <BrandLanding />
    </Fragment>
  );
};

export default ForBrand;
