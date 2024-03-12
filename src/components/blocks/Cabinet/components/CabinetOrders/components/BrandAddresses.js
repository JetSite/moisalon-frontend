import { useQuery } from "@apollo/client";
import { brandQuery } from "../../../../../../_graphql-legacy/brand/brandQuery";
import {
  Details,
  DetailsLeftAddress,
  BrandName,
  BrandAddress,
} from "../styles";

const BrandAddresses = ({ brandId }) => {
  const { data, loading } = useQuery(brandQuery, {
    variables: { id: brandId },
  });
  const brand = data?.brand || {};

  return (
    <Details>
      <DetailsLeftAddress>
        <BrandName>{brand?.name}</BrandName>
        <BrandAddress>{brand?.address}</BrandAddress>
      </DetailsLeftAddress>
    </Details>
  );
};

export default BrandAddresses;
