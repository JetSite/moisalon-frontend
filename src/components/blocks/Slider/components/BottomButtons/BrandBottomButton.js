import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MeContext } from "../../../../../searchContext";
import { Plus, BottomText } from "./styles";
import goalIdObjects from "../../../../../lib/goalIdObjects";

const BrandBottomButton = ({ bgColor }) => {
  const router = useRouter();
  const [me] = useContext(MeContext);
  const isLoggedIn = me?.info !== undefined && me?.info !== null;
  const { addBrand } = goalIdObjects(router.pathname);

  return (
    <Link href={isLoggedIn ? "/createBrand" : "/login"}>
      <a>
        <BottomText
          bgColor={bgColor}
          onClick={() => {
            window.dataLayer.push({
              event: "event",
              eventProps: {
                category: "click",
                action: addBrand,
              },
            });
          }}
        >
          <Plus bgColor={bgColor} />
          Добавить свой бренд
        </BottomText>
      </a>
    </Link>
  );
};

export default BrandBottomButton;
