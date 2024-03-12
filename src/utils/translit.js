export const cyrToTranslit = (string) => {
  if (!string) {
    return;
  }

  const translit = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  let newStr = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " " || string[i] === "-") {
      newStr += "-";
    } else {
      newStr += translit[string[i].toLowerCase()];
    }
  }

  return newStr.toLowerCase();
};
