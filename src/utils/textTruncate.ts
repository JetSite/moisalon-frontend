export function textTruncate(
  str: string,
  length: number = 180,
  ending: string = '...',
): string {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}
