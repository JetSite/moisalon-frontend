import { IUser } from 'src/types/me'

export const countOwnerReviews = (user: IUser | null): number => {
  if (!user || !user.owner) return 0

  let totalReviews = 0

  if (user.owner.salons && user.owner.salons.length > 0) {
    user.owner.salons.forEach(salon => {
      if (salon.reviews && salon.reviews.length > 0) {
        totalReviews += salon.reviews.length
      }
    })
  }

  if (user.owner.brands && user.owner.brands.length > 0) {
    user.owner.brands.forEach(brand => {
      if (brand.reviews && brand.reviews.length > 0) {
        totalReviews += brand.reviews.length
      }
    })
  }

  if (user.owner.masters && user.owner.masters.length > 0) {
    user.owner.masters.forEach(master => {
      if (master.reviews && master.reviews.length > 0) {
        totalReviews += master.reviews.length
      }
    })
  }

  return totalReviews
}
