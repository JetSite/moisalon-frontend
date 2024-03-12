import { useRef, useState, useCallback, useEffect } from "react";
import Header from "../../../pages/MainPage/components/Header";
import { MainContainer } from "../../../../styles/common";
import { Wrapper } from "./styled";
import Controls from "../../../blocks/Form/Controls";
import RegistrationForm from "./components/RegistrationForm";
import scrollIntoView from "scroll-into-view";
import BackArrow from "../../../ui/BackArrow";
import { PHOTO_URL } from "../../../../../variables";

const CreateSalon = ({ onAdd, salon, setMe, lessor = false }) => {
  const allTabs = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  
  const [tabs] = useState([
    { id: "1", value: "Информация о салоне", anchor: "about" },
    { id: "2", value: "Вид деятельности", anchor: "vid" },
    { id: "3", value: "Сервис для посетителей", anchor: "services" },
    { id: "4", value: "График работы", anchor: "schedule" },
    { id: "5", value: "Маршрут и администратор", anchor: "administartor" },
    { id: "6", value: "Дополнительная информация", anchor: "socials" },
    salon?.lessor
      ? {
          id: "7",
          value: "Рабочие места",
          anchor: "cabinet",
          href: "/rentSalonSeat",
          link: salon?.id,
        }
      : {},
  ]);

  const [refActive, setRefActive] = useState(false);
  const [ref1Visible, setRef1Visible] = useState(true);
  const [ref2Visible, setRef2Visible] = useState(false);
  const [ref3Visible, setRef3Visible] = useState(false);
  const [ref4Visible, setRef4Visible] = useState(false);
  const [ref5Visible, setRef5Visible] = useState(false);
  const [ref6Visible, setRef6Visible] = useState(false);
  const [photoSalonId, setPhotoId] = useState(null);
  const [noPhotoError, setNoPhotoError] = useState(false);

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
        top: 0,
      },
      {
        el: ref4?.current,
        func: setRef4Visible,
        top: 0,
      },
      {
        el: ref5?.current,
        func: setRef5Visible,
        top: 0,
      },
      {
        el: ref6?.current,
        func: setRef6Visible,
        top: 0,
      },
    ];
    elements.forEach((el) => handleElementPosition(el.el, el.func, el.top));
  }, []);

  useEffect(() => {
    ref1Visible
      ? setRefActive("1")
      : ref2Visible
      ? setRefActive("2")
      : ref3Visible
      ? setRefActive("3")
      : ref4Visible
      ? setRefActive("4")
      : ref5Visible
      ? setRefActive("5")
      : ref6Visible
      ? setRefActive("6")
      : null;
  }, [
    ref1Visible,
    ref2Visible,
    ref3Visible,
    ref4Visible,
    ref5Visible,
    ref6Visible,
  ]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [
    ref1Visible,
    ref2Visible,
    ref3Visible,
    ref4Visible,
    ref5Visible,
    ref6Visible,
  ]);

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
        <BackArrow
          link={
            salon?.lessor ? `rentSalonSeat?id=${salon?.id}` : "masterCabinet"
          }
        />
        <Wrapper>
          <Controls
            tabs={tabs}
            photoType={"salonPhoto"}
            refActive={refActive}
            photo={
              photoSalonId
                ? {
                    url: `${PHOTO_URL}${photoSalonId}/original`,
                  }
                : salon?.logo?.url
                ? { url: salon?.logo?.url }
                : null
            }
            id={null}
            onAdd={onAdd}
            setPhotoId={setPhotoId}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <RegistrationForm
            allTabs={allTabs}
            lessor={lessor}
            handleClickNextTab={handleClickNextTab}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            ref5={ref5}
            ref6={ref6}
            setMe={setMe}
            photoSalonId={photoSalonId}
            salon={salon}
            setNoPhotoError={setNoPhotoError}
          />
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default CreateSalon;
