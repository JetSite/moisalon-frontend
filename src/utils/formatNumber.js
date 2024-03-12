import React from "react";

export const formatCurrency = (val) =>
  val.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });

export const formatNumber = (val) =>
  val.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
  });

export function replaceItem(array, indexOrPredicate, ...items) {
  const index =
    typeof indexOrPredicate === "number"
      ? indexOrPredicate
      : array.findIndex(indexOrPredicate);

  if (index >= 0) {
    array = [...array];

    array.splice(index, 1, ...items);
  }

  return array;
}

export function pluralize(count, one, some, many, zero) {
  if (count === 0) {
    return zero ? zero : `0 ${many}`;
  }

  const hModulo = count % 100;
  const tModulo = count % 10;

  if ((hModulo > 4 && hModulo < 20) || tModulo === 0 || tModulo > 4) {
    return `${count} ${many}`;
  }

  if (tModulo === 1) {
    return `${count} ${one}`;
  }

  return `${count} ${some}`;
}

export function another(items, count) {
  return (
    <>
      {items.length ? items.slice(0, count).join(", ") : null}
      {items.length > count ? (
        <>
          {" "}
          и{" "}
          <span
            className="another"
            onClick={(ev) => ev.preventDefault()}
            title={items.slice(count, items.length).join(", ")}
          >
            ещё&#160;{items.length - count}
          </span>
        </>
      ) : null}
    </>
  );
}

export function textTruncate(str, length = 180, ending = "...") {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

export const defaultNumber = (str) => {
  let arr = str.split("");
  let newNumberNotSpace = "";
  let newNumberSpaced = "";
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 && arr[i] === "8") {
      newNumberNotSpace += "+7";
    } else if (
      arr[i] === " " ||
      arr[i] === "-" ||
      arr[i] === "(" ||
      arr[i] === ")"
    ) {
      newNumberNotSpace += "";
    } else {
      newNumberNotSpace += arr[i];
    }
  }
  for (let i = 0; i < newNumberNotSpace.length; i++) {
    if (i === 2 || i === 5 || i === 8 || i === 10) {
      newNumberSpaced += ` ${newNumberNotSpace[i]}`;
    } else {
      newNumberSpaced += newNumberNotSpace[i];
    }
  }
  return newNumberSpaced;
};

export const numberForSocials = (str) => {
  let arr = str.split("");
  let newNumberNotSpace = "";
  let newNumberSpaced = "";
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 && arr[i] === "8") {
      newNumberNotSpace += "7";
    } else if (
      arr[i] === " " ||
      arr[i] === "-" ||
      arr[i] === "(" ||
      arr[i] === "+" ||
      arr[i] === ")"
    ) {
      newNumberNotSpace += "";
    } else {
      newNumberNotSpace += arr[i];
    }
  }
  for (let i = 0; i < newNumberNotSpace.length; i++) {
    newNumberSpaced += newNumberNotSpace[i];
  }
  return newNumberSpaced;
};
