import { useRef, useState, useEffect, useCallback } from "react";
import scrollIntoView from "scroll-into-view";
import { MainContainer, MobileHidden } from "../../../../styles/common";
import Header from "../../../pages/MainPage/components/Header";
import { Wrapper } from "./styled";
import Controls from "../../../blocks/Form/Controls";
import CabinetForm from "./components/CabinetForm";
import CabinetHeaderMobile from "../../../blocks/Cabinet/components/CabinetHeaderMobile";

const BrandCabinet = ({ me, brand }) => {
  const allTabs = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const [tabs] = useState([
    { id: "1", value: "Наши продукты", anchor: "products" },
    { id: "2", value: "Отзывы клиентов", anchor: "reviews" },
    { id: "3", value: "Представители", anchor: "person" },
    { id: "4", value: "Наши профили", anchor: "profiles" },
    {
      id: "5",
      value: "Данные бренда",
      anchor: "cabinet",
      href: "/createBrand",
      link: brand?.id,
      back: true,
    },
  ]);

  const [refActive, setRefActive] = useState(false);
  const [ref1Visible, setRef1Visible] = useState(true);
  const [ref2Visible, setRef2Visible] = useState(false);
  const [ref3Visible, setRef3Visible] = useState(false);
  const [ref4Visible, setRef4Visible] = useState(false);

  const handleElementPosition = (element, func, top) => {
    const posTop = element?.getBoundingClientRect()?.top;
    if (
      posTop > 0
        ? window?.innerHeight > posTop + top
        : element?.clientHeight + posTop > window?.innerHeight
    ) {
      func(true);
    } else func(false);
  };

  useEffect(() => {
    ref1Visible
      ? setRefActive("1")
      : ref2Visible
      ? setRefActive("2")
      : ref3Visible
      ? setRefActive("3")
      : ref4Visible
      ? setRefActive("4")
      : null;
  }, [ref1Visible, ref2Visible, ref3Visible, ref4Visible]);

  const handleScroll = useCallback(() => {
    const elements = [
      {
        el: ref1?.current,
        func: setRef1Visible,
        top: 0,
      },
      {
        el: ref2?.current,
        func: setRef2Visible,
        top: 0,
      },
      {
        el: ref3?.current,
        func: setRef3Visible,
        top: 600,
      },
      {
        el: ref4?.current,
        func: setRef4Visible,
        top: 600,
      },
    ];
    elements.forEach((el) => handleElementPosition(el.el, el.func, el.top));
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [ref1Visible, ref2Visible, ref3Visible, ref4Visible]);

  const handleClickNextTab = (number) => {
    const newTab = tabs.find((item) => +item.id === number + 1);
    const element = document.getElementById(newTab.anchor.replace("#", ""));
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
    <>
      <Header />
      <MainContainer>
        <CabinetHeaderMobile me={me} category={brand} />
        <Wrapper>
          <MobileHidden>
            <Controls
              tabs={tabs}
              photoType={"brand"}
              refActive={refActive}
              noSetPhoto={true}
              photo={brand?.photo ? brand?.photo : null}
            />
          </MobileHidden>
          <CabinetForm
            allTabs={allTabs}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            brand={brand}
            brandId={brand?.id}
            handleClickNextTab={handleClickNextTab}
          />
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default BrandCabinet;
