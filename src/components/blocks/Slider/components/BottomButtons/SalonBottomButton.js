import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MeContext } from "../../../../../searchContext";
import { Plus, BottomText } from "./styles";
import goalIdObjects from "../../../../../lib/goalIdObjects";

const SalonBottomButton = ({ bgColor }) => {
  const router = useRouter();
  const [me] = useContext(MeContext);
  const isLoggedIn = me?.info !== undefined && me?.info !== null;
  const { addSalon } = goalIdObjects(router.pathname);

  return (
    <Link href={isLoggedIn ? "/createSalon" : "/login"}>
      <a>
        <BottomText
          bgColor={bgColor}
          onClick={() => {
            window.dataLayer.push({
              event: "event",
              eventProps: {
                category: "click",
                action: addSalon,
              },
            });
          }}
        >
          <Plus bgColor={bgColor} />
          Разместить свой салон
        </BottomText>
      </a>
    </Link>
  );
};

export default SalonBottomButton;
