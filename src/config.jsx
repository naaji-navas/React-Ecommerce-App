// src/config.tsx

import { gql } from '@apollo/client';


export const GET_PRODCUCT_DETAILS_BY_ID = gql`
query getProductDetails($id: ID!) {
  product(id: $id, channel: "default-channel") {
    id
    name
    images {
      url
    }
    pricing {
          priceRange {
            start {
              gross {
                amount
                currency
              }
            }
          }
        }
    
    description
    category {
      name
    }
  }
}
`;
export const GET_LATEST_PRODUCTS = gql`
 query {
  products(first: 20, channel: "default-channel" filter: { search: "Saree" } ) {
    edges {
      node {
        id
        name
        images {
          url
        }
        pricing {
          priceRange {
            start {
              gross {
                amount
                currency
              }
            }
          }
        }
        descriptionJson
        thumbnail {
          url
        }
        category {
          name
        }
      }
    }
  }
}
`;