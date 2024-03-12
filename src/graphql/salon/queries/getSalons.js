import { gql } from "@apollo/client";
import { metaInfo } from "../../common/metaInfo";
import {
  salonAdministratorsFragment,
  salonBrandsFragment,
  salonCoverFragment,
  salonLogoFragment,
  salonMastersFragment,
  salonPhotosFragment,
  salonReviewsFragment,
  salonServicesFragment,
} from "../fragments";

export const getSalons = gql`
  query salons {
    salons {
      data {
        id
        attributes {
            salonName
            salonID
            salonAddress
            salonIsPublished
            salonIsNotRent
            salonWebSiteUrl
            salonEmail
            salonPhones
            salonSocialNetworkUrls
            salonAverageScore
            salonSumScore
            salonRating
            salonOwnerConfirmed
            salonOnlineBookingUrl
            salonWorkingHours
            salonLocationDirections
            salonDescription
            salonContactPersonName
            salonContactPersonPhone
            salonContactPersonEmail
            salonCantactPresonWorkingHoursAt
            salonCantactPresonWorkingHoursTo
            salonWorkplacesCount
            salonReviewsCount
            salonMastersCount
            salonBrandsCount
            createdAt
            updatedAt
            publishedAt
            ${salonCoverFragment}
            ${salonPhotosFragment}
            ${salonLogoFragment}
            ${salonAdministratorsFragment}
            ${salonBrandsFragment}
            ${salonMastersFragment}
            ${salonReviewsFragment}
            ${salonServicesFragment}
        }
      }
      ${metaInfo}
    }
  }
`;
