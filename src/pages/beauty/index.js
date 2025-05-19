import MainLayout from "../../layouts/MainLayout";
import Beauty from "../../components/pages/Beauty";
import MainHead from "../MainHead";
import { Fragment } from "react";

const BeautyPage = () => {
  return (
    <Fragment>
      <MainHead
        title="Красота и стиль | MOI salon"
        description="Все о красоте, стиле и уходе за собой на платформе MOI salon"
        image="/services-page-photo8.jpg"
      />
      <MainLayout>
        <Beauty />
      </MainLayout>
    </Fragment>
  );
};

export default BeautyPage;
