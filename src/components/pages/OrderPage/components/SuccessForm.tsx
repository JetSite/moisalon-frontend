import Button from '../../../ui/Button';
import { FC, useEffect } from 'react';
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
  ImageWrapper,
  ItemCheckedRight,
  Name,
  Bottom,
  Price,
  Quantity,
  Total,
  TextSumm,
  TextTotal,
  ButtonWrap,
} from '../styles';
import { useMedia } from 'use-media';
import PopupOrder from './PopupOrder';
import Steps from './Steps';
import { PHOTO_URL } from '../../../../api/variables';
import { ISuccessOrderValues } from '../utils/getOrderData';
import { IDeliveryMethods, IPaymentMethods } from 'src/types';
import BackButton from '../../../ui/BackButton';
import { ISetState } from 'src/types/common';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

interface IProps {
  successOrderValues: ISuccessOrderValues;
  onSuccess: () => void;
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  paymentTitle: IPaymentMethods['title'];
  deliveryTitle: IDeliveryMethods['name'];
  setOrderForm: ISetState<boolean>;
}

const SuccessForm: FC<IProps> = ({
  successOrderValues,
  onSuccess,
  open,
  loading,
  handleClose,
  paymentTitle,
  deliveryTitle,
  setOrderForm,
}) => {
  const mobileMedia = useMedia({ maxWidth: 768 });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cartContent, total, userInfo, address, comment } = successOrderValues;

  return (
    <>
      <BackButton
        type="Редактировать заказ"
        noLink
        onlyType
        handleClick={() => {
          setOrderForm(true);
          window.scrollTo(0, 0);
        }}
      />
      <Content>
        <Title>Подтверждение заказа</Title>
        {mobileMedia ? <Steps active={2} /> : null}
        <SuccessWrapper>
          <SuccessLeft>
            <ContentWrap>
              <Desc>Данные получателя</Desc>
              <Text>{userInfo.username}</Text>
              <Text>{userInfo.phone}</Text>
              <Text>{userInfo.email}</Text>
            </ContentWrap>
            {address ? (
              <ContentWrap>
                <Desc>Адрес доставки</Desc>
                <Text>{address}</Text>
              </ContentWrap>
            ) : null}
            <ContentWrap>
              <Desc>Способ оплаты</Desc>
              <Text>{paymentTitle}</Text>
            </ContentWrap>
            <ContentWrap>
              <Desc>Способ доставки</Desc>
              <Text>{deliveryTitle}</Text>
            </ContentWrap>
            {comment.length ? (
              <ContentWrap>
                <Desc>Комментарий к заказу</Desc>
                <Text>{comment}</Text>
              </ContentWrap>
            ) : null}
          </SuccessLeft>
          <SuccessRight>
            <Desc>Состав заказа</Desc>
            {cartContent.map(cartItem => {
              return (
                <ItemChecked key={cartItem.product.id}>
                  <ImageWrapper>
                    <LazyImage
                      src={
                        cartItem.product.cover?.url
                          ? `${PHOTO_URL}${cartItem.product.cover.url}`
                          : '/cosmetic_placeholder.jpg'
                      }
                      alt="logo"
                    />
                  </ImageWrapper>
                  <ItemCheckedRight>
                    <Name>{cartItem.product.name}</Name>
                    <Bottom>
                      <Price>{`${
                        cartItem.product.salePrice
                          ? cartItem.product.salePrice * cartItem.quantity
                          : cartItem.product.regularPrice * cartItem.quantity
                      } ₽`}</Price>
                      <Quantity>{cartItem.quantity} шт.</Quantity>
                    </Bottom>
                  </ItemCheckedRight>
                </ItemChecked>
              );
            })}
            {/* {formValues?.product
              ? formValues?.product.map(product => (
                  <RepeatOrderProduct product={product} key={product.id} />
                ))
              : null} */}
            <Total>
              <TextSumm>Сумма заказа:</TextSumm>
              <TextTotal>{`${total} ₽`}</TextTotal>
            </Total>
            <ButtonWrap>
              <Button
                variant="red"
                size="medium"
                disabled={loading}
                loading={loading}
                autoFocus
                onClick={() => onSuccess()}
              >
                Оформить заказ
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
