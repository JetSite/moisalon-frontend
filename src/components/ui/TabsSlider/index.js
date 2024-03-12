import { Wrapper, Item, Count, Text, Content, OnlineButton } from "./styles";
import scrollIntoView from "scroll-into-view";
import { urlPatternHttp, urlPatternHttps } from "../../../utils/checkUrls";

const TabsSlider = ({
  tabs,
  noPadding,
  activeTab,
  setActiveTab,
  rent,
  salon,
}) => {
  const handleClick = (item) => {
    const element = document.getElementById(item.link.replace("#", ""));
    if (element) {
      scrollIntoView(element, {
        time: 500,
        align: {
          top: 0,
          topOffset: 100,
        },
      });
    }
  };

  return (
    <Wrapper>
      <Content noPadding={noPadding}>
        {tabs.map((item, i) =>
          item.show ? (
            <Item
              active={i == activeTab}
              onClick={() => {
                setActiveTab(i);
                handleClick(item);
              }}
              key={i}
            >
              <Text>{item.text}</Text>
              {item.count ? <Count>{item.count}</Count> : null}
            </Item>
          ) : null
        )}
        {rent ? (
          salon?.onlineBookingUrl ? (
            <noindex style={{ width: "100%" }}>
              <OnlineButton
                target="_blank"
                rel="nofollow"
                href={
                  urlPatternHttp.test(salon?.onlineBookingUrl) ||
                  urlPatternHttps.test(salon?.onlineBookingUrl)
                    ? salon?.onlineBookingUrl
                    : `https://${salon?.onlineBookingUrl}`
                }
              >
                Онлайн бронирование
              </OnlineButton>
            </noindex>
          ) : (
            <OnlineButton href={`tel:${salon?.phones[0]?.phoneNumber}`}>
              Онлайн бронирование
            </OnlineButton>
          )
        ) : null}
      </Content>
    </Wrapper>
  );
};

export default TabsSlider;
