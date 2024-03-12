import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import {
  SearchMainQueryContext,
  CategoryPageQueryContext,
  MeContext,
} from "../../../../../searchContext";
import Tags from "../../../../ui/Tags";
import { Input, Wrapper, InputWrap } from "./styled";

const SearchMain = ({ setShowSearchPopup }) => {
  const router = useRouter();
  const textInput = useRef(null);
  const [me] = useContext(MeContext);
  const [inputValue, setInputValue] = useState("");

  const tagsSwitch = (url) => {
    const splitUrl = url.split("/");
    switch (splitUrl[1]) {
      case "master":
        return ["Колорист", "Бровист", "Макияж", "Пилинг", "Татуаж"];
      case "salon":
        return ["Хаммам", "Солярий", "Окрашивание", "Тату", "Массаж"];
      case "brand":
        return ["ESTEL", "Волосы", "Бальзам", "Краска", "Лак"];
      case "catalog":
        return ["Лечение", "Шампунь", "Краска", "Ногти", "Кожа"];
      default:
        return ["стрижка", "маникюр", "спа-салон", "L'OREAL", "барбер"];
    }
  };

  const placeholderSwitch = (url) => {
    const splitUrl = url.split("/");
    switch (splitUrl[1]) {
      case "master":
        return "Найти своего мастера";
      case "salon":
        return "Найти свой салон";
      case "brand":
        return "Найти свой бренд";
      case "catalog":
        return "Найти товар";
      default:
        return "Найти услугу / специалиста / косметику";
    }
  };

  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "/[city]") {
      setInputValue("");
      setQuery("");
    }
  }, []);

  useEffect(() => {
    if (router.query.q == "search") {
      textInput.current.focus();
    }
  }, [router.query.q]);

  useEffect(() => {
    if (router.query.q || router.query.q != "search") {
      queryObject = {
        query: router.query.q,
        city:
          me && me?.info && me?.info?.city
            ? me?.info?.city
            : cityInStorage
            ? cityInStorage
            : "",
      };
      setInputValue(router.query.q);
      setValueQuery(queryObject);

      updateQuery({
        ...queryObject,
      });
    }

    return () => {
      setInputValue("");
    };
  }, []);

  let cityInStorage;

  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }

  const [query, setQuery] = useContext(SearchMainQueryContext);
  const [categoryPageQuery, setCategoryPageQuery] = useContext(
    CategoryPageQueryContext
  );
  const [valueQuery, setValueQuery] = useState(query.query || "");

  let queryObject;

  const updateQuery = useCallback(
    (updatedQuery) => {
      setQuery(updatedQuery);
      setCategoryPageQuery({ query: "" });
    },
    [setQuery, setCategoryPageQuery]
  );

  useEffect(() => {
    if (!valueQuery) {
      updateQuery({ ...query, query: "" });
    }
  }, [valueQuery, updateQuery]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    queryObject = {
      query: e.target.value,
      city:
        me && me?.info && me?.info?.city
          ? me?.info?.city
          : cityInStorage
          ? cityInStorage
          : "",
    };
    setValueQuery(queryObject);

    updateQuery({
      ...queryObject,
    });
  };

  const queryTag = (item) => {
    setInputValue(item);
    setQuery({
      query: item,
      city: query.city,
    });
    setCategoryPageQuery({ query: "" });
  };

  const onEnterHandler = (e) => {
    if (e.key === "Enter" && inputValue != "") {
      setQuery("");
      setShowSearchPopup(false);
      e.target.blur();
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
      <InputWrap>
        <Input
          placeholder={placeholderSwitch(router.pathname)}
          value={
            router.pathname === "/" || router.pathname === "/[city]"
              ? inputValue
              : inputValue || query.query
          }
          onChange={handleSearch}
          ref={textInput}
          type="search"
          onKeyDown={onEnterHandler}
        />
      </InputWrap>
      <Tags tags={tagsSwitch(router.pathname)} queryTag={queryTag} />
    </Wrapper>
  );
};

export default SearchMain;
