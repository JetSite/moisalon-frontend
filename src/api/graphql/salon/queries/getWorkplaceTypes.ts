import { gql } from '@apollo/client'
import { workplaceTypesFragment } from '../../fragments/workplaceTypes'

export const WORKPLACE_TYPES = gql`
  query workspaceTypes {
    salonWorkplaceTypes(pagination: {pageSize: 100}) {
      ${workplaceTypesFragment}
      }
  }
`
