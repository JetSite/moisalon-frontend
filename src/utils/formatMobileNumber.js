export const formatMobileNumber = (phoneNumber) => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 9)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{2})(\d{1})/, "$1-$2-$3-$4");
};
