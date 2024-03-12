const dev = process.env.NEXT_PUBLIC_ENV !== "production";
const uploadPhoto = async (file, photoType) => {
  const uploadUrl = dev
    ? `https://stage-moi.moi.salon/api/photos/upload/${photoType}`
    : `https://moi.salon/api/photos/upload/${photoType}`;
  const formData = new FormData();
  formData.append("file", file);
  const options = {
    method: "POST",
    body: formData,
    credentials: "include",
  };
  return fetch(uploadUrl, options).then((response) => {
    if (response.status !== 200) {
      throw new Error("Не удалось загрузить изображение.");
    }
    return response.text();
  });
};

export const replacePhoto = async (id, file) => {
  const uploadUrl = dev
    ? `https://stage-moi.moi.salon/api/photos/upload/${id}`
    : `https://moi.salon/api/photos/upload/${id}`;
  const formData = new FormData();
  formData.append("file", file);
  const options = {
    method: "PUT",
    body: formData,
    credentials: "include",
  };
  return fetch(uploadUrl, options).then((response) => {
    if (response.status !== 204) {
      throw new Error("Не удалось загрузить изображение.");
    }
    return id;
  });
};

export default uploadPhoto;
