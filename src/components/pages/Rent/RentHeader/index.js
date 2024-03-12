import { useMutation } from "@apollo/client";
import { useContext, useState, useCallback } from "react";
import { createRequestToSalon } from "../../../../_graphql-legacy/salon/createRequestToSalon";
import { CatalogsContext, MeContext } from "../../../../searchContext";
import { MainContainer } from "../../../../styles/common";
import catalogOrDefault from "../../../../utils/catalogOrDefault";
import { formatNumber } from "../../../../utils/formatNumber";
import { selectedGroupNames } from "../../../../utils/serviceCatalog";
import { cyrToTranslit } from "../../../../utils/translit";
import BackButton from "../../../ui/BackButton";
import Button from "../../../ui/Button";
import Popup from "../../../ui/Popup";
import WritePopup from "../../../pages/Salon/ViewSalon/components/WritePopup.js";
import PhotoSlider from "../../../blocks/PhotoSlider";
import { MobileVisible, MobileHidden } from "../../../../styles/common";
import {
  Wrapper,
  Content,
  Top,
  TopImage,
  OnlineBooking,
  Icon,
  SalonDescription,
  InfoBlock,
  InfoBlockContent,
  Title,
  PriceLine,
  Time,
  Price,
  Dotted,
  Item,
  Text,
  IconCircle,
  ButtonRequest,
  InfoItem,
  InfoItemTitle,
  InfoItemTitleWide,
  InfoItemHorisontal,
  InfoItemContent,
  ItemWide,
  MobilePhotosBlock,
  PhotoWrapper,
  Photo,
  BottomButtons,
  DesktopBlock,
} from "./styles";
import { urlPatternHttp, urlPatternHttps } from "../../../../utils/checkUrls";

const RentHeader = ({ city, salonData, roomData }) => {
  const catalogs = useContext(CatalogsContext);
  const [me] = useContext(MeContext);
  const [openWritePopup, setOpenWritePopup] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const handleCloseWritePopup = useCallback(() => {
    setOpenWritePopup(false);
  }, [setOpenWritePopup]);

  const closeSuccessPopup = useCallback(() => {
    setOpenSuccessPopup(false);
  }, [setOpenSuccessPopup]);

  const [createRequestPopup] = useMutation(createRequestToSalon, {
    onCompleted: () => {
      setOpenWritePopup(false);
      setOpenSuccessPopup(true);
    },
  });

  const onSubmit = (values) => {
    createRequestPopup({
      variables: {
        input: {
          salonId: salonData?.id,
          ...values,
        },
      },
    });
  };

  const roomServicesCatalog = catalogOrDefault(
    catalogs?.salonRoomServicesCatalog
  );

  const foundServices = [];
  roomData.services.forEach((service) => {
    roomServicesCatalog?.groups[0]?.subGroups?.forEach((serviceCatalog) => {
      serviceCatalog.items.forEach((serviceItem) => {
        if (service.id === serviceItem.id) {
          foundServices.push({
            groupTitle: serviceCatalog.title,
            serviceDetail: serviceItem.title,
            quantity: service.value,
          });
        }
      });
    });
  });
  const foundServicesGroups = [];
  foundServices.forEach((foundService) => {
    const foundGroup = foundServicesGroups.find(
      (item) => item === foundService.groupTitle
    );
    if (!foundGroup) {
      foundServicesGroups.push(foundService.groupTitle);
    }
  });

  const hasRentalPrice =
    roomData?.seat?.rentalPricing?.hour ||
    roomData?.seat?.rentalPricing?.day ||
    roomData?.seat?.rentalPricing?.week ||
    roomData?.seat?.rentalPricing?.month ||
    roomData?.seat?.rentalPricing?.year;

  const hasPaymentVariants =
    roomData?.seat?.rentalPaymentMethods?.appleOrGooglePay ||
    roomData?.seat?.rentalPaymentMethods?.bankingCard ||
    roomData?.seat?.rentalPaymentMethods?.cash ||
    roomData?.seat?.rentalPaymentMethods?.wireTransfer;

  return (
    <>
      <Wrapper>
        <Content>
          <BackButton
            type="Аренда – Салон"
            link={`/${cyrToTranslit(city)}/rent/${salonData?.id}`}
            name={roomData?.seat?.seatNumber}
          />
        </Content>
      </Wrapper>
      <TopImage photoUrl={roomData?.seat?.photo?.url}>
        {salonData?.onlineBookingUrl ? (
          <noindex>
            <OnlineBooking
              target="_blank"
              rel="nofollow"
              href={salonData?.onlineBookingUrl}
            >
              <Icon src="/booking-blank.svg" />
              Онлайн бронирование
            </OnlineBooking>
          </noindex>
        ) : (
          <OnlineBooking href={`tel:${salonData?.phones[0]?.phoneNumber}`}>
            <Icon src="/booking-blank.svg" />
            Онлайн бронирование
          </OnlineBooking>
        )}
      </TopImage>
      <Wrapper>
        <Content>
          <Top>
            <SalonDescription>{salonData?.description}</SalonDescription>
            {salonData?.onlineBookingUrl ? (
              <noindex>
                <ButtonRequest
                  target="_blank"
                  rel="nofollow"
                  href={
                    urlPatternHttps.test(salonData?.onlineBookingUrl) ||
                    urlPatternHttp.test(salonData?.onlineBookingUrl)
                      ? salonData?.onlineBookingUrl
                      : `https://${salonData?.onlineBookingUrl}`
                  }
                >
                  Отправить заявку
                </ButtonRequest>
              </noindex>
            ) : (
              <ButtonRequest href={`tel:${salonData?.phones[0]?.phoneNumber}`}>
                Отправить заявку
              </ButtonRequest>
            )}
          </Top>
          <MobileHidden>
            {roomData?.photos?.length ? (
              <PhotoSlider
                wrapperWidth={1164}
                items={roomData.photos}
                itemWidth={360}
                itemHeight={370}
                itemMarginRight={27}
              />
            ) : null}
          </MobileHidden>
          <MobileVisible>
            <MobilePhotosBlock>
              {roomData?.photos?.map((photo) => (
                <PhotoWrapper key={photo.id}>
                  <Photo src={photo.url} />
                </PhotoWrapper>
              ))}
            </MobilePhotosBlock>
          </MobileVisible>
          {hasRentalPrice || hasPaymentVariants ? (
            <InfoBlock>
              <Title>Оплата</Title>
              <InfoBlockContent>
                {hasRentalPrice ? (
                  <InfoItem>
                    <InfoItemTitle>Стоимость</InfoItemTitle>
                    {roomData?.seat?.rentalPricing?.hour ? (
                      <PriceLine>
                        <Time>Час</Time>
                        <Dotted />
                        <Price>
                          от {formatNumber(roomData?.seat?.rentalPricing?.hour)}{" "}
                          ₽
                        </Price>
                      </PriceLine>
                    ) : null}
                    {roomData?.seat?.rentalPricing?.day ? (
                      <PriceLine>
                        <Time>День</Time>
                        <Dotted />
                        <Price>
                          от {formatNumber(roomData?.seat?.rentalPricing?.day)}{" "}
                          ₽
                        </Price>
                      </PriceLine>
                    ) : null}
                    {roomData?.seat?.rentalPricing?.week ? (
                      <PriceLine>
                        <Time>Неделя</Time>
                        <Dotted />
                        <Price>
                          от {formatNumber(roomData?.seat?.rentalPricing?.week)}{" "}
                          ₽
                        </Price>
                      </PriceLine>
                    ) : null}
                    {roomData?.seat?.rentalPricing?.month ? (
                      <PriceLine>
                        <Time>Месяц</Time>
                        <Dotted />
                        <Price>
                          от{" "}
                          {formatNumber(roomData?.seat?.rentalPricing?.month)} ₽
                        </Price>
                      </PriceLine>
                    ) : null}
                    {roomData?.seat?.rentalPricing?.year ? (
                      <PriceLine>
                        <Time>Год</Time>
                        <Dotted />
                        <Price>
                          от {formatNumber(roomData?.seat?.rentalPricing?.year)}{" "}
                          ₽
                        </Price>
                      </PriceLine>
                    ) : null}
                  </InfoItem>
                ) : null}
                {hasPaymentVariants ? (
                  <InfoItem>
                    <InfoItemTitle>Способ оплаты</InfoItemTitle>
                    {roomData?.seat?.rentalPaymentMethods?.appleOrGooglePay ? (
                      <Item>
                        <IconCircle src="/service-rent-icon.svg" />
                        <Text>Apple Pay / Google Pay</Text>
                      </Item>
                    ) : null}
                    {roomData?.seat?.rentalPaymentMethods?.bankingCard ? (
                      <Item>
                        <IconCircle src="/service-rent-icon.svg" />
                        <Text>Карта</Text>
                      </Item>
                    ) : null}
                    {roomData?.seat?.rentalPaymentMethods?.cash ? (
                      <Item>
                        <IconCircle src="/service-rent-icon.svg" />
                        <Text>Наличные</Text>
                      </Item>
                    ) : null}
                    {roomData?.seat?.rentalPaymentMethods?.wireTransfer ? (
                      <Item>
                        <IconCircle src="/service-rent-icon.svg" />
                        <Text>Банковский перевод</Text>
                      </Item>
                    ) : null}
                  </InfoItem>
                ) : null}
              </InfoBlockContent>
            </InfoBlock>
          ) : null}
          {roomData?.seat?.allowJointRental || roomData?.seat?.allowSublease ? (
            <InfoBlock>
              <Title>Общая информация</Title>
              <InfoItemHorisontal>
                <InfoItemTitleWide>Вид аренды</InfoItemTitleWide>
                <InfoItemContent>
                  {roomData?.seat?.allowJointRental ? (
                    <ItemWide>
                      <IconCircle src="/service-rent-icon.svg" />
                      <Text>Совместная аренда</Text>
                    </ItemWide>
                  ) : null}
                  {roomData?.seat?.allowSublease ? (
                    <ItemWide>
                      <IconCircle src="/service-rent-icon.svg" />
                      <Text>Возможность субаренды</Text>
                    </ItemWide>
                  ) : null}
                </InfoItemContent>
              </InfoItemHorisontal>
            </InfoBlock>
          ) : null}
          <InfoBlock>
            <Title>Технические параметры</Title>
            {roomData?.space ? (
              <InfoItemHorisontal>
                <DesktopBlock>
                  <InfoItemTitleWide>Площадь</InfoItemTitleWide>
                  <InfoItemContent>
                    <ItemWide>
                      <Text>{roomData.space} м2</Text>
                    </ItemWide>
                  </InfoItemContent>
                </DesktopBlock>
                <MobileVisible>
                  <InfoItemTitle>Площадь</InfoItemTitle>
                  <ItemWide>
                    <Text>{roomData.space} м2</Text>
                  </ItemWide>
                </MobileVisible>
              </InfoItemHorisontal>
            ) : null}
            {roomData?.floor ? (
              <InfoItemHorisontal>
                <DesktopBlock>
                  <InfoItemTitleWide>Этаж</InfoItemTitleWide>
                  <InfoItemContent>
                    <ItemWide>
                      <Text>{roomData.floor}</Text>
                    </ItemWide>
                  </InfoItemContent>
                </DesktopBlock>
                <MobileVisible>
                  <InfoItemTitle>Этаж</InfoItemTitle>
                  <ItemWide>
                    <Text>{roomData.floor}</Text>
                  </ItemWide>
                </MobileVisible>
              </InfoItemHorisontal>
            ) : null}
            <InfoItemHorisontal>
              <InfoItemTitleWide>Окна</InfoItemTitleWide>
              <InfoItemContent>
                <ItemWide>
                  <Text>{roomData?.hasWindows ? "да" : "нет"}</Text>
                </ItemWide>
              </InfoItemContent>
            </InfoItemHorisontal>
            {foundServicesGroups.map((group) => (
              <InfoItemHorisontal key={group}>
                <InfoItemTitleWide>{group}</InfoItemTitleWide>
                <InfoItemContent>
                  {foundServices.map((service) => {
                    if (service.groupTitle === group) {
                      return (
                        <ItemWide key={service.serviceDetail}>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>{service.serviceDetail}</Text>
                          {service.serviceDetail.includes("шт.") ||
                          service.quantity > 1 ? (
                            <Text>- {service.quantity}</Text>
                          ) : null}
                        </ItemWide>
                      );
                    }
                  })}
                </InfoItemContent>
              </InfoItemHorisontal>
            ))}
            {roomData?.wetPointsHands ||
            roomData?.wetPointsHead ||
            roomData?.wetPointsShower ? (
              <InfoItemHorisontal>
                <InfoItemTitleWide>Мокрые точки</InfoItemTitleWide>
                <InfoItemContent>
                  {roomData?.wetPointsHands ? (
                    <>
                      <DesktopBlock>
                        <ItemWide>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>Для мытья рук</Text>
                        </ItemWide>
                        <ItemWide>
                          <Text>{roomData?.wetPointsHands} шт</Text>
                        </ItemWide>
                      </DesktopBlock>
                      <MobileVisible>
                        <ItemWide>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>Для мытья рук</Text>
                          <Text>- {roomData?.wetPointsHands} шт</Text>
                        </ItemWide>
                      </MobileVisible>
                    </>
                  ) : null}
                  {roomData?.wetPointsHead ? (
                    <>
                      <DesktopBlock>
                        <ItemWide>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>Для мытья головы</Text>
                        </ItemWide>
                        <ItemWide>
                          <Text>{roomData?.wetPointsHead} шт</Text>
                        </ItemWide>
                      </DesktopBlock>
                      <MobileVisible>
                        <ItemWide>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>Для мытья головы</Text>
                          <Text>- {roomData?.wetPointsHead} шт</Text>
                        </ItemWide>
                      </MobileVisible>
                    </>
                  ) : null}
                  {roomData?.wetPointsShower ? (
                    <>
                      <DesktopBlock>
                        <ItemWide>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>Душ</Text>
                        </ItemWide>
                        <ItemWide>
                          <Text>{roomData?.wetPointsShower} шт</Text>
                        </ItemWide>
                      </DesktopBlock>
                      <MobileVisible>
                        <ItemWide>
                          <IconCircle src="/service-rent-icon.svg" />
                          <Text>Душ</Text>
                          <Text>- {roomData?.wetPointsShower} шт</Text>
                        </ItemWide>
                      </MobileVisible>
                    </>
                  ) : null}
                </InfoItemContent>
              </InfoItemHorisontal>
            ) : null}
          </InfoBlock>
          <BottomButtons>
            {salonData?.onlineBookingUrl ? (
              <noindex>
                <ButtonRequest
                  target="_blank"
                  rel="nofollow"
                  href={salonData?.onlineBookingUrl}
                >
                  Отправить заявку
                </ButtonRequest>
              </noindex>
            ) : (
              <ButtonRequest href={`tel:${salonData?.phones[0]?.phoneNumber}`}>
                Отправить заявку
              </ButtonRequest>
            )}
          </BottomButtons>
        </Content>
      </Wrapper>
      <>
        <WritePopup
          user={me?.info}
          open={openWritePopup}
          handleClose={handleCloseWritePopup}
          onSubmit={onSubmit}
        />
        <Popup
          isOpen={openSuccessPopup}
          onClose={closeSuccessPopup}
          title="Ваше сообщение отправлено"
          description={`Администратор салона свяжется с вами в ближайшее время!`}
        >
          <Button
            style={{ marginTop: 20 }}
            onClick={closeSuccessPopup}
            variant="red"
          >
            Закрыть
          </Button>
        </Popup>
      </>
    </>
  );
};

export default RentHeader;
