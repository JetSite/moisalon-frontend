import BrandItem from "../../BrandsList/BrandItem";
import { ListWrapper, BrandItemWrapper, Published } from "../styles";

const SearchResults = ({ slicedSearchResults, dataSearch, handlePublish }) => {
  return (
    <ListWrapper>
      {slicedSearchResults.map((item) => (
        <BrandItemWrapper
          key={item.id}
          onClick={(e) =>
            handlePublish(
              e,
              item.id,
              dataSearch.find((el) => el.id === item.id)
            )
          }
        >
          <BrandItem brand={item} />
          <Published published={dataSearch.find((el) => el.id === item.id)} />
          {/* <Button
            variant="redWithRoundBorder"
            size="roundSmall"
            font="roundMedium"
            onClick={(e) =>
              handlePublish(
                e,
                item.id,
                dataSearch.find((el) => el.id === item.id)
              )
            }
          >
            {dataSearch.find((el) => el.id === item.id)
              ? "Убрать из брендов"
              : "Добавить в бренды"}
          </Button> */}
        </BrandItemWrapper>
      ))}
    </ListWrapper>
  );
};

export default SearchResults;
