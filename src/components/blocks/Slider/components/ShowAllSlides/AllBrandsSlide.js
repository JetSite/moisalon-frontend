import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CityContext, MeContext } from "../../../../../searchContext";
import { AllBrands, AllTextBrand, AllIcon } from "./styles";
import { cyrToTranslit } from "../../../../../utils/translit";

const AllBrandsSlide = () => {
  const [city] = useContext(CityContext);
  const [me] = useContext(MeContext);
  const router = useRouter();
  const landingBrand = router.pathname === "/for_brand";
  const b2bClient = !!me?.master?.id || !!me?.salons?.length;

  return (
    <Link
      href={
        !landingBrand
          ? `/${cyrToTranslit(city)}/brand`
          : `/${cyrToTranslit(city)}/beautyFreeShop`
      }
    >
      <a>
        <AllBrands>
          <AllIcon />
          <AllTextBrand>Показать все бренды</AllTextBrand>
        </AllBrands>
      </a>
    </Link>
  );
};

export default AllBrandsSlide;
