import MainLayout from "../../../layouts/MainLayout";
import LucklyPage from "../../../components/pages/Beauty/LUCKLY";
import MainHead from "../../MainHead";
import { Fragment } from "react";

const Luckly = () => {
  return (
    <Fragment>
      <MainHead
        title="LUCKLY | MOI salon"
        description="Профессиональная косметика LUCKLY для салонов красоты на платформе MOI salon"
        image="/luckly-1.jpg"
      />
      <MainLayout>
        <LucklyPage />
      </MainLayout>
    </Fragment>
  );
};

export default Luckly;
