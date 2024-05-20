export const ratingsFragment = `
data {
  id
  attributes {
    user{
      data{
        id
      }
    }
    rating_value {
      data {
        id
      }
    }
  }
}
`
