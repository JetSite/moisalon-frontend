import SuccessPaymentPage from "@/components/blocks/PaymentPages/SuccessPaymentPage";

const Success = () => {
  return (
      <SuccessPaymentPage />
  );
};

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: "Успешная оплата | MOI salon",
        description: "Ваш платеж успешно обработан на платформе MOI salon",
        image: "/mobile-main-bg.jpg",
        url: "https://moi.salon/payment/success",
      },
    },
  };
};

export default Success;
