import { useContext } from "react";
import Link from "next/link";
import { CityContext, MeContext } from "../../../../../searchContext";
import { AllGoods, AllText, AllIcon } from "./styles";
import { cyrToTranslit } from "../../../../../utils/translit";

const AllGoodsSlide = () => {
  const [me] = useContext(MeContext);
  const [city] = useContext(CityContext);
  const b2bClient = !!me?.master?.id || !!me?.salons?.length;

  return (
    <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
      <a>
        <AllGoods>
          <AllIcon />
          <AllText>Показать все товары</AllText>
        </AllGoods>
      </a>
    </Link>
  );
};

export default AllGoodsSlide;
