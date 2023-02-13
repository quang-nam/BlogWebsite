export function discussionSql(gitDiscussionCategoryId: string | undefined) {
  return `{
          repository(name: "BlogWebsite", owner: "quang-nam") {
              discussions(categoryId: "${gitDiscussionCategoryId}", first: 100) {
                nodes {
                  title
                  createdAt
                  number
                  url
                  bodyText
                  bodyHTML
                  lastEditedAt
                  author {
                    login
                    url
                    avatarUrl
                  }
                  labels(first: 100) {
                      nodes {
                        name
                      }
                    }
                }
              }
            }
      }`;
}

// single post

export function discussionDetailGql(postId: number | undefined) {
  return `{
      repository(owner: "quang-nam", name: "BlogWebsite") {
        discussion(number: ${postId}) {
          title
          bodyHTML
          createdAt
          author {
            login
            url
            avatarUrl
          }
        }
      }
    }`;
}
