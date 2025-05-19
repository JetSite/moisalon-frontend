import MainLayout from "../../../layouts/MainLayout";
import PaulOscarPage from "../../../components/pages/Beauty/PaulOscar";
import MainHead from "../../MainHead";
import { Fragment } from "react";

const PaulOscar = () => {
  return (
    <Fragment>
      <MainHead
        title="Paul Oscar | MOI salon"
        description="Профессиональная косметика Paul Oscar для салонов красоты на платформе MOI salon"
        image="/paul-oscar-1.jpg"
      />
      <MainLayout>
        <PaulOscarPage />
      </MainLayout>
    </Fragment>
  );
};

export default PaulOscar;
