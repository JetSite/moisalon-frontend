import Link from "next/link";
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from "./styles";

const AllAdsSlide = () => {
  return (
    <Link href={"/sales"}>
      <a>
        <AllSalons>
          <AllIconSalon />
          <FavoriteIcon />
          <AllText>Показать все объявления</AllText>
        </AllSalons>
      </a>
    </Link>
  );
};

export default AllAdsSlide;
