const defaultNumber = (str) => {
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

export default defaultNumber;