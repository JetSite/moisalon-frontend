const parseToFloat = (str) => {
  if (!str) {
    return "";
  }
  const arr = str?.split("");
  let newStrArr = [];
  arr.forEach((item) => {
    if (item === ",") {
      return;
    }
    if (item === "₽") {
      return;
    }
    newStrArr.push(item);
  });
  return parseFloat(newStrArr.join(""));
};

export default parseToFloat;
