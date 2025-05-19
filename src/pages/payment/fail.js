import FailPaymentPage from "@/components/blocks/PaymentPages/FailPaymentPage";

const Fail = () => {
  return (
      <FailPaymentPage />
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "Ошибка оплаты | MOI salon",
        description: "Произошла ошибка при обработке платежа на платформе MOI salon",
        image: "/mobile-main-bg.jpg",
        url: "https://moi.salon/payment/fail",
      },
    },
  };
};

export default Fail;
