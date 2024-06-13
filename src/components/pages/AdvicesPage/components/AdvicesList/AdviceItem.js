import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import {
  AdvItem,
  AdvImage,
  AdvTitle,
  AdvDescription,
  AdvShortDescription,
  ReadMore,
} from '../../styles'
import { PHOTO_URL } from '../../../../../api/variables'

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
    if (adviceClicked.length > 0) return
    setCategoryClicked(item.attributes.feed_category.data[0].id)
    setAdviceClicked(item.id)
    window.scrollTo({ top: 0 })
  }

  const photoUrl = item?.attributes?.cover?.data?.attributes?.url
    ? `${PHOTO_URL}${item.attributes.cover.data.attributes.url}`
    : ''

  return (
    <AdvItem onClick={clickHandler} opened={adviceClicked.length > 0}>
      <AdvImage photoUrl={photoUrl} />
      {/* <Favorite isFavorite={isFavorite} onClick={(e) => addFavorite(e, item)} /> */}
      <MobileHidden>
        <AdvTitle>{item.attributes.title}</AdvTitle>
      </MobileHidden>
      <MobileVisible>
        <AdvTitle>{item.attributes.title}</AdvTitle>
      </MobileVisible>
      {!!adviceClicked ? (
        <AdvDescription
          dangerouslySetInnerHTML={{
            __html: item.attributes.content,
          }}
        />
      ) : (
        <AdvShortDescription>
          {item.attributes.shortDescription} <ReadMore>Далее</ReadMore>
        </AdvShortDescription>
      )}
    </AdvItem>
  )
}

export default AdviceItem
