import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  SearchMainQueryContext,
  CategoryPageQueryContext,
  CityContext,
} from "../../../searchContext";

import Tags from "../Tags";
import { cyrToTranslit } from "../../../utils/translit";
import { Input, Wrapper, InputWrap, ClearIcon } from "./styled";

const tagsSwitch = (url) => {
  const splitUrl = url.split("/");
  switch (splitUrl[1]) {
    case "master":
      return ["Колорист", "Бровист", "Макияж", "Пилинг", "Татуаж"];
    case "salon":
      return ["Хаммам", "Солярий", "Окрашивание", "Тату", "Массаж"];
    case "brand":
      return ["ESTEL", "Волосы", "Бальзам", "Краска", "Лак"];
    case "brand":
      return ["ESTEL", "Волосы", "Бальзам", "Краска", "Лак"];
    case "catalog":
      return ["Лечение", "Шампунь", "Краска", "Ногти", "Кожа"];
    case "catalogB2c":
      return ["Лечение", "Шампунь", "Краска", "Ногти", "Кожа"];
    default:
      return ["Стрижка", "Маникюр", "Колорист", "Массаж", "Бровист"];
  }
};

const Search = ({ title, noFilters }) => {
  const router = useRouter();
  const [query, setQuery] = useContext(SearchMainQueryContext);
  const [city] = useContext(CityContext);
  const [categoryPageQuery, setCategoryPageQuery] = useContext(
    CategoryPageQueryContext
  );
  const [inputValue, setInputValue] = useState(
    categoryPageQuery.query.length ? categoryPageQuery.query : query.query
  );

  useEffect(() => {
    setQuery({
      ...query,
      // query: categoryPageQuery.query.length ? "" : query.query || "",
    });
  }, []);

  const queryHandler = (e) => {
    setInputValue(e.target.value);
    setQuery({
      query: e.target.value,
      city: query.city,
    });
    if (
      router.pathname === "/[city]/master" ||
      router.pathname === "/[city]/salon" ||
      router.pathname === "/[city]/brand" ||
      router.pathname === "/catalogB2cAll" ||
      router.pathname === "/catalogB2c" ||
      router.pathname === "/catalogB2b"
    ) {
      setCategoryPageQuery({ query: e.target.value });
    }
    if (
      (router.pathname === "/catalogB2c" ||
        router.pathname === "/catalogB2cAll") &&
      e.target.value === ""
    ) {
      router.push({
        pathname: "/catalogB2cAll",
        query: { query: "", type: "query" },
      });
      return;
    }
    if (router.pathname === "/catalogB2b" && e.target.value === "") {
      return;
    }
  };

  const queryTag = (item) => {
    setInputValue(item);
    setQuery({
      query: item,
      city: query.city,
    });
    if (
      router.pathname === "/[city]/master" ||
      router.pathname === "/[city]/salon" ||
      router.pathname === "/[city]/brand" ||
      router.pathname === "/catalogB2cAll" ||
      router.pathname === "/catalogB2c"
    ) {
      setCategoryPageQuery({ query: item });
    }
    if (
      router.pathname === "/catalogB2c" ||
      router.pathname === "/catalogB2cAll"
    ) {
      router.push({
        pathname: "/catalogB2cAll",
        query: { query: item, type: "query" },
      });
      return;
    }
    if (router?.query?.id?.length || router?.query?.slug?.length) {
      router.push(
        { pathname: `/${cyrToTranslit(city)}`, query: { q: item } },
        `/${cyrToTranslit(city)}`
      );
    }
  };

  const inputSubmitHandler = (e) => {
    if (
      (router.pathname == "/[city]/master" ||
        router.pathname == "/[city]/salon" ||
        router.pathname == "/[city]/brand" ||
        router.pathname == "/[city]/rent") &&
      e.key === "Enter" &&
      inputValue != ""
    ) {
      e.target.blur();
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });
    } else {
      if (e.key === "Enter" && inputValue != "") {
        if (
          router.pathname === "/catalogB2c" ||
          router.pathname === "/catalogB2cAll"
        ) {
          router.push({
            pathname: "/catalogB2cAll",
            query: { query: query.query, type: "query" },
          });
          return;
        } else if (router.pathname === "/catalogB2b") {
          return;
        }
        router.push(
          { pathname: `/${cyrToTranslit(city)}`, query: { q: inputValue } },
          `/${cyrToTranslit(city)}`
        );
      }
    }
  };

  useEffect(() => {
    // if (
    //   (router.pathname == "/[city]/master" ||
    //     router.pathname == "/[city]/salon" ||
    //     router.pathname == "/[city]/brand") &&
    //   categoryPageQuery?.query?.length
    // ) {
    //   setInputValue("");
    // } else if (router?.query?.id?.length || router?.query?.slug?.length) {
    //   setInputValue("");
    // } else if (
    //   router?.pathname === "/catalogB2b" ||
    //   router?.pathname === "/catalogB2c"
    // ) {
    //   setInputValue("");
    // }
    if (router?.pathname !== "/" && router?.pathname !== "/[city]") {
      setInputValue("");
      setQuery({
        ...query,
        query: "",
      });
      setCategoryPageQuery({ query: "" });
    }
  }, [router.pathname]);

  return (
    <Wrapper>
      <InputWrap noFilters={noFilters}>
        <Input
          placeholder={title || "Найти услугу / специалиста / косметику"}
          value={inputValue}
          onChange={queryHandler}
          onKeyDown={inputSubmitHandler}
          type="search"
        />
        <ClearIcon
          onClick={() => {
            setInputValue("");
            setQuery({
              ...query,
              query: "",
            });
          }}
        />
      </InputWrap>
      {!noFilters ? (
        <Tags tags={tagsSwitch(router.pathname)} queryTag={queryTag} />
      ) : null}
    </Wrapper>
  );
};

export default Search;
