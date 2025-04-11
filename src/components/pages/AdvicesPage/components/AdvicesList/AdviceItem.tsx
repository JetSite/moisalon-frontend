import { MobileVisible, MobileHidden } from '../../../../../styles/common';
import {
  AdvItem,
  AdvImage,
  AdvTitle,
  AdvDescription,
  AdvShortDescription,
  ReadMore,
} from '../../styles';
import { PHOTO_URL } from '../../../../../api/variables';
import { FC } from 'react';
import { IID, ISetState } from 'src/types/common';
import { IFeed } from '@/types/feed';

export interface AdviceItemProps {
  item: IFeed;
  adviceClicked: string | null;
  setCategoryClicked: (id: IID) => void;
  setAdviceClicked: ISetState<string | null>;
}

const AdviceItem: FC<AdviceItemProps> = ({
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
    if (adviceClicked && adviceClicked.length > 0) return;
    setCategoryClicked(item.feed_category[0].id);
    setAdviceClicked(item.id);
    window.scrollTo({ top: 0 });
  };

  const photoUrl = item?.cover?.url ? `${PHOTO_URL}${item.cover.url}` : '';

  return (
    <AdvItem
      onClick={clickHandler}
      opened={!!adviceClicked && adviceClicked.length > 0}
    >
      <AdvImage photoUrl={photoUrl} />
      {/* <Favorite isFavorite={isFavorite} onClick={(e) => addFavorite(e, item)} /> */}
      <MobileHidden>
        <AdvTitle>{item.title}</AdvTitle>
      </MobileHidden>
      <MobileVisible>
        <AdvTitle>{item.title}</AdvTitle>
      </MobileVisible>
      {adviceClicked ? (
        <AdvDescription
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}
        />
      ) : (
        <AdvShortDescription>
          {item.shortDescription} <ReadMore>Далее</ReadMore>
        </AdvShortDescription>
      )}
    </AdvItem>
  );
};

export default AdviceItem;
