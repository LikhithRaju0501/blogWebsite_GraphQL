import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  query getAllBlogs {
    blogs {
      id
      author
      title
      content
      category
      date
      image
    }
  }
`;

export const GET_BLOGS_BY_ID = gql`
  query getBlog($blogId: ID!) {
    blog(id: $blogId) {
      id
      author
      title
      category
      date
      content
      image
      comments {
        message
        author
      }
    }
  }
`;

export const EDIT_BLOG_CHECK = gql`
  query isUsersBlog($greetingId: ID!) {
    isUsersBlog(id: $greetingId)
  }
`;
