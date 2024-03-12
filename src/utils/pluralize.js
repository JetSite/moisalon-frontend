export function pluralize(count, one, some, many, zero) {
  if (count === 0) {
    return zero ? zero : `${many}`;
  }

  const hModulo = count % 100;
  const tModulo = count % 10;

  if ((hModulo > 4 && hModulo < 20) || tModulo === 0 || tModulo > 4) {
    return `${many}`;
  }

  if (tModulo === 1) {
    return `${one}`;
  }

  return `${some}`;
}
