import Prismic from "@prismicio/client";
import {
  API_URL_KIT,
  API_TOKEN,
  GRAPHQL_API_URL,
  API_LOCALE,
  LAYOUT_UID,
} from "@utils/constants";
import { gql } from "graphql-request";

export const PrismicClient = Prismic.client(API_URL_KIT, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
        "Content-Type": "application/json",
        "Accept-Language": API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(gql`
    {
      allDocuments {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allDocuments?.edges;
}
export async function getDocument(uid, previewData) {
  const data = await fetchAPI(
    gql`
      query documentByUid($uid: String!, $lang: String!) {
        document(uid: $uid, lang: $lang) {
          title
          next_page {
            ... on Document {
              title
              _meta {
                uid
              }
            }
          }
          prev_page {
            ... on Document {
              title
              _meta {
                uid
              }
            }
          }
          body {
            __typename
            ... on DocumentBodyText {
              primary {
                rich_text
              }
            }
            ... on DocumentBodyImage {
              primary {
                image
              }
            }
            ... on DocumentBodyCode_snippet {
              primary {
                code_snippet
                languaje
              }
            }
            ... on DocumentBodyHighlighted_text {
              primary {
                highlight_text
                highlight_title
              }
            }
            ... on DocumentBodyTable {
              fields {
                column
              }
            }
            ... on DocumentBodyTable_row {
              fields {
                column
              }
            }
            ... on DocumentBodyTable_footer {
              fields {
                column
              }
            }
          }
          _meta {
            uid
            id
            tags
          }
        }
      }
    `,
    {
      previewData,
      variables: {
        lang: API_LOCALE,
        uid,
      },
    }
  );

  return data;
}
