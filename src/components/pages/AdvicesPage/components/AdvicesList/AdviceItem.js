import { MobileVisible, MobileHidden } from "../../../../../styles/common";
import {
  AdvItem,
  AdvImage,
  AdvTitle,
  AdvDescription,
  AdvShortDescription,
  ReadMore,
} from "../../styles";
import { PHOTO_URL } from "../../../../../../variables";

const AdviceItem = ({
  item,
  adviceClicked,
  setAdviceClicked,
  setCategoryClicked,
}) => {
  // const [isFavorite, setIsFavorit] = useState(false);

  // useEffect(() => {
  //   const isInStorage = inStorage("advices", item);
  //   setIsFavorit(!!isInStorage);
  // }, []);

  // const addFavorite = (e, item) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   favoritesInStorage("advices", item);
  //   setIsFavorit(!isFavorite);
  // };

  const clickHandler = () => {
    if (adviceClicked.length > 0) return;
    setCategoryClicked(item.categoryId);
    setAdviceClicked(item.id);
    window.scrollTo({ top: 0 });
  };

  const photoUrl = `${PHOTO_URL}${item?.photoId}/original`;

  return (
    <AdvItem onClick={clickHandler} opened={adviceClicked.length > 0}>
      <AdvImage photoUrl={photoUrl} />
      {/* <Favorite isFavorite={isFavorite} onClick={(e) => addFavorite(e, item)} /> */}
      <MobileHidden>
        <AdvTitle>{item.title}</AdvTitle>
      </MobileHidden>
      <MobileVisible>
        <AdvTitle>{item.title}</AdvTitle>
      </MobileVisible>
      {adviceClicked.length ? (
        <AdvDescription
          dangerouslySetInnerHTML={{
            __html: item.desc,
          }}
        />
      ) : (
        <AdvShortDescription>
          {item.short_desc} <ReadMore>Далее</ReadMore>
        </AdvShortDescription>
      )}
    </AdvItem>
  );
};

export default AdviceItem;
