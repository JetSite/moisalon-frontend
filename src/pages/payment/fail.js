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
      schema: {
        type: 'WebPage',
        data: {
          name: "Ошибка оплаты | MOI salon",
          description: "Произошла ошибка при обработке платежа на платформе MOI salon",
          url: "https://moi.salon/payment/fail",
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

export default Fail;
