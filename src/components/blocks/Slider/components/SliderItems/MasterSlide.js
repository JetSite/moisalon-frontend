import { useContext } from "react";
import Link from "next/link";
import MasterItem from "../../../MasterCard";
import { cyrToTranslit } from "../../../../../utils/translit";
import { CityContext } from "../../../../../searchContext";

const MasterSlide = ({ item, catalog }) => {
  const [city] = useContext(CityContext);

  return (
    <Link
      href={`/${cyrToTranslit(item?.addressFull?.city || city)}/master/${
        item?.seo?.slug || item?.id
      }`}
    >
      <a>
        <MasterItem
          master={item}
          catalog={catalog}
          shareLink={`https://moi.salon/${cyrToTranslit(
            item?.addressFull?.city || city
          )}/master/${item?.seo?.slug || item?.id}`}
        />
      </a>
    </Link>
  );
};

export default MasterSlide;
