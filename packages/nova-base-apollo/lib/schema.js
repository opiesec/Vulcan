import Posts from 'meteor/nova:posts';
import Users from 'meteor/nova:users';
import Comments from 'meteor/nova:comments';
import Categories from 'meteor/nova:categories';

const postSchema = `
  type Post {
    _id: String
    createdAt: String
    postedAt: String
    url: String
    title: String
    slug: String
    body: String
    htmlBody: String
    excerpt: String
    sticky: Boolean
    viewCount: Int
    lastCommentedAt: String
    clickCount: Int
    status: Int
    isFuture: Boolean
    user: User
    commentCount: Int
    commenters: [User]
    comments: [Comment]
    categories: [Category]
    scheduledAt: String
    dummySlug: String
    isDummy: String
    upvotes: Int
    upvoters: [User]
    downvotes: Int
    downvoters: [User]
    baseScore: Int
    score: Float
    clickCount: Int
    viewCount: Int
    thumbnailUrl: String
    userIP: String
    userAgent: String
    referrer: String
  }
`;

const userSchema = `
  type User {
    _id: String
    username: String
    createdAt: String
    isAdmin: Boolean
    telescope: UserTelescope
  }

  type UserTelescope {
    bio: String
    commentCount: Float
    displayName: String
    downvotedComments: [Vote]
    downvotedPosts: [Vote]
    email: String
    emailHash: String
    htmlBio: String
    karma: Float
    postCount: Int
    slug: String
    twitterUsername: String
    upvotedComments: [Vote]
    upvotedPosts: [Vote]
    website: String
    groups: [String]
    notifications_users: Boolean
    notifications_posts: Boolean
    newsletter_subscribeToNewsletter: Boolean
    isDummy: Boolean
  }

  type Vote {
    itemId: String
    power: Float
    votedAt: String
  }
`;

const commentSchema = `
  type Comment {
    _id: String
    parentComment: Comment
    topLevelComment: Comment
    createdAt: String
    postedAt: String
    body: String
    htmlBody: String
    author: String
    inactive: Boolean
    post: Post
    user: User
    isDeleted: Boolean
    isDummy: Boolean
    upvotes: Int
    upvoters: [User]
    downvotes: Int
    downvoters: [User]
    baseScore: Int
    score: Float
  }
`

const categorySchema = `
  type Category {
    _id: String
    name: String
    description: String
    order: Int
    slug: String
    image: String
    parent: Category
  }
`;

export default schema = [`
${postSchema}
${userSchema}
${commentSchema}
${categorySchema}
input Terms {
  view: String
  userId: String
  cat: String
  date: String
  after: String
  before: String
  enableCache: Boolean
  listId: String
  query: String # search query
}
type Query {
  posts(terms: Terms, offset: Int, limit: Int): [Post]
  postsViewTotal(terms: Terms): Int 
  post(_id: String): Post
  users: [User]
  user(_id: String, slug: String): User
  comments: [Comment]
  comment(_id: String): Comment
  categories: [Category]
  category(_id: String): Category
}
`];