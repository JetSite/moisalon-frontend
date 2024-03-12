import { useQuery } from "@apollo/client";
import { brandQuery } from "../../../../_graphql-legacy/brand/brandQuery";
import { BrandsAddressWrap } from "../styles";

const BrandAddress = ({ brandId }) => {
  const { data } = useQuery(brandQuery, {
    variables: { id: brandId },
  });
  const brand = data?.brand || {};

  return (
    <BrandsAddressWrap>
      {brand.name}
      <br />
      {brand.address}
    </BrandsAddressWrap>
  );
};

export default BrandAddress;
