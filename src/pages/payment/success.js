import React, { Fragment } from "react";
import SuccessPaymentPage from "../../components/blocks/PaymentPages/SuccessPaymentPage";
import MainHead from "../MainHead";

const SuccessPayment = () => {
  return (
    <Fragment>
      <MainHead
        title="Успешная оплата | MOI salon"
        description="Ваш платеж успешно обработан на платформе MOI salon"
        image="/master-landing-login.jpg"
      />
      <SuccessPaymentPage />
    </Fragment>
  );
};

export default SuccessPayment;
