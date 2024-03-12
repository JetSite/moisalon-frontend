import { PHOTO_URL } from "../../../../../../../../variables";
import { ItemWrapper, Logo, RemoveButton } from "./styles";

const BrandItem = ({ brand, brands, handlePublish }) => {
  const published = brands?.find((el) => el.id === brand.id);
  return (
    <ItemWrapper published={published}>
      <Logo
        src={
          `${PHOTO_URL}${brand?.logoId}/original` ||
          brand?.photo?.url
        }
      />
      <RemoveButton
        published={published}
        onClick={(e) => handlePublish(e, brand.id, published)}
      />
    </ItemWrapper>
  );
};

export default BrandItem;
