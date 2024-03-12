import Link from "next/link";
import RentCard from "../../../RentCard";
import { cyrToTranslit } from "../../../../../utils/translit";

const WorkplaceSlide = ({ item, salon }) => {
  return (
    <Link
      href={`/${cyrToTranslit(salon?.address?.city)}/rent/${
        salon?.seo?.slug || salon?.id
      }`}
    >
      <a>
        <RentCard item={item} salon={salon} />
      </a>
    </Link>
  );
};

export default WorkplaceSlide;
