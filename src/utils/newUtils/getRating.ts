import { IRating } from 'src/types'

export interface IRatingValue {
  rating: number
  ratingCount: number
}

type IGetRating = (ratings?: IRating[], add?: number) => IRatingValue

export const getRating: IGetRating = (ratings, add) => {
  if (!ratings) return { rating: 0, ratingCount: 0 }
  const ratingCount = add ? ratings.length + 1 : ratings.length
  const numbers = add
    ? ratings.map(e => +e.rating_value.id).concat(add)
    : ratings.map(e => +e.rating_value.id)
  const rating = +(
    numbers.reduce((acc, curr) => acc + curr, 0) / ratingCount
  ).toFixed(1)
  if (!ratingCount || !rating) {
    return { ratingCount: 0, rating: 0 }
  } else return { ratingCount, rating }
}
