import React, { useState } from "react";
import {
  Item,
  Wrapper,
  Text,
  Tab,
  ImageBox,
  TabBody,
  DescriptionBox,
} from "./styles";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Wrapper>
        <Item
          active={"1"}
          openTab={activeTab}
          onClick={() => {
            toggle("1");
          }}
        >
          <Text>История</Text>
        </Item>
        <Item
          active={"2"}
          openTab={activeTab}
          onClick={() => {
            toggle("2");
          }}
        >
          <Text>Технологии</Text>
        </Item>
        <Item
          active={"3"}
          openTab={activeTab}
          onClick={() => {
            toggle("3");
          }}
        >
          <Text>Производство</Text>
        </Item>
      </Wrapper>
      <TabBody tabId={"1"} openTab={activeTab}>
        <Tab>
          <DescriptionBox>
            Косметическая линия впервые вышла в свет после удачных экспериментов
            химика Льва Охотина. Он специализировался на продвижении брендов и
            занимался рекламой. В один удачный день Охотин смог вывести из
            кризиса компанию, руководство которой и само не верило в возможность
            дальнейшего существования на рынке косметических услуг. После этого
            предприниматель решил создать собственный бренд. В 2001 году
            появился первый образец краски для волос под наименованием Estel. Он
            включал в себя 15 стойких оттенок, которые отвечали требованиям моды
            того времени. С этого периода бренд стал узнаваемым и покупаемым во
            многих регионах РФ. 2005 год был ознаменован выпуском 70 оттенков
            красящих составов, а также шампуней, масок, бальзамом, кремов для
            волос.
          </DescriptionBox>
          <ImageBox>
            <img src={"../../../../../tabMainImaje.png"} alt="" />
          </ImageBox>
        </Tab>
      </TabBody>
      <TabBody tabId={"2"} openTab={activeTab}>
        <Tab>
          <DescriptionBox>
            Косметическая линия впервые вышла в свет после удачных экспериментов
            химика Льва Охотина. Он специализировался на продвижении брендов и
            занимался рекламой. В один удачный день Охотин смог вывести из
            кризиса компанию, руководство которой и само не
          </DescriptionBox>
          <ImageBox>
            <img
              src="https://bipbap.ru/wp-content/uploads/2017/04/72fqw2qq3kxh.jpg"
              alt=""
            />
          </ImageBox>
        </Tab>
      </TabBody>
      <TabBody tabId={"3"} openTab={activeTab}>
        <Tab>
          <DescriptionBox>
            Косметическая линия впервые вышла в свет после удачных экспериментов
            химика Льва Охотина. Он специализировался на продвижении брендов и
            занимался рекламой. В один
          </DescriptionBox>
          <ImageBox>
            <img
              src="https://im0-tub-ru.yandex.net/i?id=b935bbd8db0e239086c5ced5b90e25b5-l&n=27&h=384&w=480"
              alt=""
            />
          </ImageBox>
        </Tab>
      </TabBody>
    </>
  );
};

export default Tabs;
