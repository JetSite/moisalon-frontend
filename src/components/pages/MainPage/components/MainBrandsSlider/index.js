import { useQuery } from "@apollo/client";
import { brandsRandomQuery } from "../../../../../_graphql-legacy/brand/brandSearchRandom";
import Slider from "../../../../blocks/Slider";

const MainBrandsSlider = () => {
  const { data: brands, loading } = useQuery(brandsRandomQuery, {
    variables: { count: 10 },
  });

  return (
    <Slider
      type="brands"
      noScroll
      loading={loading}
      items={brands?.brandsRandom || []}
      title="Популярные бренды"
      pt={102}
      pb={91}
      mobileTitleWidth
      noPadding
      pl={20}
    />
  );
};

export default MainBrandsSlider;
