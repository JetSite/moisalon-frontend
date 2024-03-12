import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MeContext } from "../../../../../searchContext";
import { Plus, BottomText } from "./styles";

const AdBottomButton = ({ bgColor }) => {
  const router = useRouter();
  const [me] = useContext(MeContext);
  const isLoggedIn = me?.info !== undefined && me?.info !== null;

  return (
    <Link
      href={
        isLoggedIn
          ? {
              pathname: "/masterCabinet",
              query: { tab: "sales" },
            }
          : "/login"
      }
    >
      <a>
        <BottomText bgColor={bgColor}>
          <Plus bgColor={bgColor} />
          Разместить свое объявление
        </BottomText>
      </a>
    </Link>
  );
};

export default AdBottomButton;
