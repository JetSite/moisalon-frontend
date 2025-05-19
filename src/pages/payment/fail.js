import React, { Fragment } from "react";
import FailPaymentPage from "../../components/blocks/PaymentPages/FailPaymentPage";
import MainHead from "../MainHead";

const FailPayment = () => {
  return (
    <Fragment>
      <MainHead
        title="Ошибка оплаты | MOI salon"
        description="К сожалению, произошла ошибка при обработке платежа на платформе MOI salon"
        image="/master-landing-login.jpg"
      />
      <FailPaymentPage />
    </Fragment>
  );
};

export default FailPayment;
