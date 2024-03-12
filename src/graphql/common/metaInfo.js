import { gql } from "@apollo/client";

export const metaInfo = `
    meta {
        pagination {
            total
            page
            pageSize
            pageCount
        }
    }
`;
