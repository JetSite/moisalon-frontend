import Link from "next/link";
import { useContext } from "react";
import { CityContext } from "../../../../../../../searchContext";
import { cyrToTranslit } from "../../../../../../../utils/translit";
import BrandItem from "./BrandItem";
import { BrandsContent, MainTitle, ListWrapper, TextNoBrands } from "./styles";

const BrandsList = ({ brands, handlePublish }) => {
  const [city] = useContext(CityContext);
  return (
    <BrandsContent>
      <MainTitle>Профиль: Бренды, с которыми я работаю</MainTitle>
      {brands.length > 0 ? (
        <ListWrapper heightLarge={brands.length}>
          {brands.map((brand) => (
            <Link
              href={`/${cyrToTranslit(brand?.addressFull?.city || city)}/brand/${
                brand?.seo?.slug || brand.id
              }`}
              key={brand.id}
            >
              <a>
                <BrandItem
                  brand={brand}
                  brands={brands}
                  handlePublish={handlePublish}
                />
              </a>
            </Link>
          ))}
        </ListWrapper>
      ) : (
        <ListWrapper>
          <TextNoBrands>Нет брендов</TextNoBrands>
        </ListWrapper>
      )}

      {/* <Link href="/createBrand">
        <MobileHidden>
          <Button
            size="width374WithoutPadding"
            variant="darkTransparent"
            font="medium"
          >
            Добавить бренд
          </Button>
        </MobileHidden>
      </Link>
      <Link href="/createSalon">
        <MobileVisible>
          <Button size="fullWidth" variant="darkTransparent" font="small">
            Добавить бренд
          </Button>
        </MobileVisible>
      </Link> */}
    </BrandsContent>
  );
};

export default BrandsList;
