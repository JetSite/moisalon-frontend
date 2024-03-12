import { useContext } from "react";
import Link from "next/link";
import { CityContext } from "../../../../../searchContext";
import { AllMasters, AllText, AllIcon } from "./styles";
import { cyrToTranslit } from "../../../../../utils/translit";

const AllMastersSlide = () => {
  const [city] = useContext(CityContext);

  return (
    <Link href={`/${cyrToTranslit(city)}/master`}>
      <a>
        <AllMasters>
          <AllIcon />
          <AllText>Показать всех мастеров</AllText>
        </AllMasters>
      </a>
    </Link>
  );
};

export default AllMastersSlide;
