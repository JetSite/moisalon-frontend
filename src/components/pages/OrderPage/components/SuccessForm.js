import parseToFloat from "../../../../utils/parseToFloat";
import Button from "../../../ui/Button";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  SuccessWrapper,
  Content,
  Title,
  SuccessLeft,
  SuccessRight,
  Desc,
  ItemChecked,
  Text,
  ContentWrap,
  Image,
  ItemCheckedRight,
  Name,
  Bottom,
  Price,
  Quantity,
  Total,
  TextSumm,
  TextTotal,
  ButtonWrap,
} from "./../styles";
import { useMedia } from "use-media";
import PopupOrder from "./PopupOrder";
import Steps from "./Steps";
import RepeatOrderProduct from "./RepeatOrderProduct";
import { PHOTO_URL } from "../../../../../variables";

const totalSumm = (items) => {
  if (!items?.length) {
    return 0;
  } else {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      count +=
        parseToFloat(items[i].product.currentAmount.toString()) *
        items[i].quantity;
    }
    return count;
  }
};

const SuccessForm = ({
  formValues,
  checkedProducts,
  onSuccess,
  open,
  handleClose,
  loading,
  setSuccessPage,
}) => {
  const router = useRouter();
  const mobileMedia = useMedia({ maxWidth: 768 });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (url === "/order") {
        setSuccessPage(false);
        return false;
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  const amount = formValues?.product?.reduce(
    (sum, { price, count }) => sum + price * count,
    0
  );

  return (
    <>
      <Content>
        <Title>Подтверждение заказа</Title>
        {mobileMedia ? <Steps active={2} /> : null}
        <SuccessWrapper>
          <SuccessLeft>
            <ContentWrap>
              <Desc>Данные получателя</Desc>
              <Text>{formValues?.name}</Text>
              <Text>{formValues?.phone}</Text>
              <Text>{formValues?.email}</Text>
            </ContentWrap>
            {formValues?.address ? (
              <ContentWrap>
                <Desc>Адрес доставки</Desc>
                <Text>{formValues?.address}</Text>
              </ContentWrap>
            ) : null}
            {formValues?.inn ? (
              <ContentWrap>
                <Desc>ИНН</Desc>
                <Text>{formValues?.inn}</Text>
              </ContentWrap>
            ) : null}
            <ContentWrap>
              <Desc>Способ оплаты</Desc>
              <Text>
                {formValues.payment === 0
                  ? "Оплата картой на сайте"
                  : formValues.payment === 1
                  ? "Наличными"
                  : "Безналичный расчёт"}
              </Text>
            </ContentWrap>
            {formValues?.comment ? (
              <ContentWrap>
                <Desc>Комментарий к заказу</Desc>
                <Text>{formValues?.comment}</Text>
              </ContentWrap>
            ) : null}
          </SuccessLeft>
          <SuccessRight>
            <Desc>Состав заказа</Desc>
            {checkedProducts
              ? checkedProducts?.map((item, i) => (
                  <ItemChecked key={i}>
                    <Image>
                      <img
                        src={
                          item?.product?.photoIds[0]
                            ? ` ${PHOTO_URL}${item?.product?.photoIds[0]}/original`
                            : "/cosmetic_placeholder.jpg"
                        }
                        alt="logo"
                      />
                    </Image>
                    <ItemCheckedRight>
                      <Name>{item?.product?.title}</Name>
                      <Bottom>
                        <Price>{`${parseToFloat(
                          item?.product?.currentAmount.toString()
                        ).toLocaleString()} ₽`}</Price>
                        <Quantity>{item?.quantity} шт.</Quantity>
                      </Bottom>
                    </ItemCheckedRight>
                  </ItemChecked>
                ))
              : null}
            {formValues?.product
              ? formValues?.product.map((product) => (
                  <RepeatOrderProduct product={product} key={product.id} />
                ))
              : null}
            <Total>
              <TextSumm>Сумма заказа:</TextSumm>
              <TextTotal>{`${
                amount || totalSumm(checkedProducts).toLocaleString()
              } ₽`}</TextTotal>
            </Total>
            <ButtonWrap>
              <Button
                variant="red"
                size="medium"
                autoFocus
                onClick={() => onSuccess()}
                disabled={loading}
              >
                Оплатить заказ
              </Button>
            </ButtonWrap>
          </SuccessRight>
        </SuccessWrapper>
      </Content>
      <PopupOrder handleCloseSuccess={handleClose} open={open} />
    </>
  );
};

export default SuccessForm;
