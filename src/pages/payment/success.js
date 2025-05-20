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
      schema: {
        type: 'WebPage',
        data: {
          name: "Успешная оплата | MOI salon",
          description: "Ваш платеж успешно обработан на платформе MOI salon",
          url: "https://moi.salon/payment/success",
          image: "https://moi.salon/mobile-main-bg.jpg",
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          }
        }
      }
    },
  };
};

export default Success;
