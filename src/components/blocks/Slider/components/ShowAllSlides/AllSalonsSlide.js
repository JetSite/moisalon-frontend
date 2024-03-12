import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CityContext } from "../../../../../searchContext";
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from "./styles";
import { cyrToTranslit } from "../../../../../utils/translit";

const AllSalonsSlide = () => {
  const [city] = useContext(CityContext);
  const router = useRouter();
  const landingMaster = router.pathname === "/for_master";

  return (
    <Link
      href={
        !landingMaster
          ? `/${cyrToTranslit(city)}/salon`
          : `/${cyrToTranslit(city)}/rent`
      }
    >
      <a>
        <AllSalons>
          <AllIconSalon />
          <FavoriteIcon />
          <AllText>Показать все салоны</AllText>
        </AllSalons>
      </a>
    </Link>
  );
};

export default AllSalonsSlide;
