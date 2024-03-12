import { formatNumber } from "./formatNumber";

const Abbreviations = {
  hour: "час",
  day: "день",
  week: "нед.",
  month: "мес.",
  year: "год",
};

export function formatRentalPricing(pricing) {
  for (const [key, abbreviation] of Object.entries(Abbreviations)) {
    const value = pricing[key];

    if (value) {
      return `от ${formatNumber(value)} ₽ / ${abbreviation}`;
    }
  }

  return "неизвестна";
}
