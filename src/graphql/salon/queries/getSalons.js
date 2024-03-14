import { gql } from "@apollo/client";
import { metaInfo } from "../../common/metaInfo";
import { imageInfo } from "../../common/imageInfo";
import {
  salonAdministratorsFragment,
  salonBrandsFragment,
  salonMastersFragment,
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
            salonCover {
              ${imageInfo}
            }
            salonLogo {
              ${imageInfo}
            }
            salonPhotos {
              ${imageInfo}
            }
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
