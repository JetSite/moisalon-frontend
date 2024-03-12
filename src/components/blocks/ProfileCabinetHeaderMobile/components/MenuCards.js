import { useContext } from "react";
import { useRouter } from "next/router";
import { CityContext } from "../../../../searchContext";
import { cyrToTranslit } from "../../../../utils/translit";
import {
  CardsWrapper,
  Card,
  CardTitle,
  CardBottom,
  Icon,
  CardQuantity,
} from "../styles";

const MenuCards = ({ tabs, setActiveTab, setToggle }) => {
  const dev = process.env.NEXT_PUBLIC_ENV !== "production";
  const router = useRouter();
  const [city] = useContext(CityContext);

  const handleLogout = async () => {
    const resData = await fetch(
      dev
        ? "https://stage-passport.moi.salon/api/logout"
        : "https://passport.moi.salon/api/logout",
      {
        credentials: "include",
        "Access-Control-Allow-Credentials": true,
      }
    );

    if (resData.status === 200) {
      router.push(`/${cyrToTranslit(city)}`);
    }
  };

  return (
    <CardsWrapper>
      {tabs?.map((tab) => (
        <Card
          key={tab.value}
          onClick={() => {
            setActiveTab(tab.value);
            setToggle(false);
          }}
        >
          <CardTitle>{tab.title}</CardTitle>
          <CardBottom quantity={tab.quantity}>
            <Icon src={tab.icon} />
            {tab.quantity ? <CardQuantity>{tab.quantity}</CardQuantity> : null}
          </CardBottom>
        </Card>
      ))}
      <Card
        onClick={() => {
          handleLogout();
        }}
      >
        <CardTitle>Выход</CardTitle>
      </Card>
    </CardsWrapper>
  );
};

export default MenuCards;
