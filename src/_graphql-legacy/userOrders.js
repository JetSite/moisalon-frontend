import { gql } from "@apollo/client";

export const userOrders = gql`
  query {
    ordersUser {
      id
      number
      payment
      name
      email
      inn
      phone
      specialization
      delivery
      address
      comment
      createAt
      product {
        description
        brandName
        id
        count
        price
      }
      brandsIds
      status
    }
  }
`;
