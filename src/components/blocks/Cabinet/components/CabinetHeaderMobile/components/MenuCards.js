import { useRouter } from "next/router";
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import scrollIntoView from "scroll-into-view";
import { currentUserSalonsAndMasterQuery } from "../../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery";
import { CityContext, MeContext } from "../../../../../../searchContext";
import { cyrToTranslit } from "../../../../../../utils/translit";
import {
  CardsWrapper,
  Card,
  CardTitle,
  CardBottom,
  Icon,
  CardQuantity,
} from "../styles";

const MenuCards = ({ cards, itemId }) => {
  const dev = process.env.NEXT_PUBLIC_ENV !== "production";
  const router = useRouter();
  const [me, setMe] = useContext(MeContext);
  const [city] = useContext(CityContext);
  const handleClick = (item) => {
    const element = document.getElementById(item?.anchor?.replace("#", ""));
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

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: (res) => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      });
    },
  });

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
      await refetch();
      router.push(`/${cyrToTranslit(city)}`);
    }
  };

  return (
    <CardsWrapper>
      {cards?.map((card, id) => (
        <Card
          key={id}
          onClick={() => {
            handleClick(card);
            if (card.href) {
              router.push(
                {
                  pathname: card.href,
                  query: { id: itemId },
                },
                card.href
              );
            }
          }}
        >
          <CardTitle>{card.title}</CardTitle>
          <CardBottom quantity={card.quantity}>
            <Icon src={card.icon} />
            {card?.quantity ? (
              <CardQuantity>{card.quantity}</CardQuantity>
            ) : null}
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
