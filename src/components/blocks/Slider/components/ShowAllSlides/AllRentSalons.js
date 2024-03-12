import { useContext } from "react";
import Link from "next/link";
import { CityContext } from "../../../../../searchContext";
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from "./styles";
import { cyrToTranslit } from "../../../../../utils/translit";

const AllRentSalons = () => {
  const [city] = useContext(CityContext);

  return (
    <Link href={`/${cyrToTranslit(city)}/rent`}>
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

export default AllRentSalons;
