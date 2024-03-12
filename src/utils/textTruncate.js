export function textTruncate(str, length = 180, ending = "...") {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
