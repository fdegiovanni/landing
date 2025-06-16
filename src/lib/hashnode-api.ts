import type { HashnodeResponse, HashnodePost } from "@/types/blog"

const HASHNODE_API_URL = "https://gql.hashnode.com/"

export async function fetchHashnodePosts(
  publicationHost: string,
  first = 6,
  after?: string,
): Promise<{ posts: HashnodePost[]; hasNextPage: boolean; endCursor: string }> {
  const query = `
    query GetPosts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              url
              coverImage {
                url
              }
              tags {
                name
                slug
              }
              readTimeInMinutes
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `

  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          host: publicationHost,
          first,
          after,
        },
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }

    const data: HashnodeResponse = await response.json()

    return {
      posts: data.data.publication.posts.edges.map((edge) => edge.node),
      hasNextPage: data.data.publication.posts.pageInfo.hasNextPage,
      endCursor: data.data.publication.posts.pageInfo.endCursor,
    }
  } catch (error) {
    console.error("Error fetching Hashnode posts:", error)
    return { posts: [], hasNextPage: false, endCursor: "" }
  }
}
