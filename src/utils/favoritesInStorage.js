export const favoritesInStorage = (array, obj) => {
  let favorites;

  if (typeof window !== "undefined") {
    const empty = {
      masters: [],
      salons: [],
      brands: [],
      products: [],
      advices: [],
      educations: [],
    };
    let data = JSON.parse(localStorage.getItem("favorites"));
    if (data) {
      const advices = data?.advices ? [...data.advices] : [];
      const educations = data?.educations ? [...data.educations] : [];
      data = { ...data, advices, educations };
    }
    favorites = data ? data : empty;
  }

  const isInArray = favorites[array]?.find((el) => el.id === obj.id);

  if (!isInArray) {
    favorites[array]?.push(obj);
  } else {
    const newArray = favorites[array]?.filter((item) => item.id !== obj.id);
    favorites[array] = newArray;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const inStorage = (array, obj) => {
  let favorites;

  if (typeof window !== "undefined") {
    const empty = {
      masters: [],
      salons: [],
      brands: [],
      products: [],
      advices: [],
      educations: [],
    };
    let data = JSON.parse(localStorage.getItem("favorites"));
    if (data) {
      const advices = data?.advices ? [...data.advices] : [];
      const educations = data?.educations ? [...data.educations] : [];
      data = { ...data, advices, educations };
    }
    favorites = data ? data : empty;
    return favorites[array]?.find((el) => el.id === obj.id);
  }
};
