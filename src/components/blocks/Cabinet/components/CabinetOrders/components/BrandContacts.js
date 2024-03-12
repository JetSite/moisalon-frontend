import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { brandQuery } from "../../../../../../_graphql-legacy/brand/brandQuery";
import {
  Details,
  DetailsLeft,
  BrandName,
  BrandPhone,
  DetailsRight,
  SocialsWrapper,
} from "../styles";
import ViberIcon from "./ViberIcon";
import WhatsappIcon from "./WhatsappIcon";
import TelegramIcon from "./TelegramIcon";

const BrandContacts = ({ brandId, productBrands, setProductBrands }) => {
  const { data, loading } = useQuery(brandQuery, {
    variables: { id: brandId },
  });
  const brand = data?.brand || {};

  useEffect(() => {
    if (brand?.id) {
      if (!productBrands.find((item) => item?.id === brand?.id)) {
        setProductBrands((prevState) => [...prevState, brand]);
      }
    }
  }, [brand]);

  return (
    <Details>
      <DetailsLeft>
        <BrandName>{brand?.name}</BrandName>
        <BrandPhone>{brand?.phone?.phoneNumber}</BrandPhone>
      </DetailsLeft>
      <DetailsRight>
        <SocialsWrapper>
          <ViberIcon active={brand?.phone?.haveViber} />
          <WhatsappIcon active={brand?.phone?.haveWhatsApp} />
          <TelegramIcon active={brand?.phone?.haveTelegram} />
        </SocialsWrapper>
      </DetailsRight>
    </Details>
  );
};

export default BrandContacts;
