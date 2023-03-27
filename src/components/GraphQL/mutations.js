import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation createBlog($input: createBlogInput!) {
    createBlog(input: $input) {
      id
      title
      image
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog($input: updateBlogInput!) {
    updateBlog(input: $input) {
      id
      author
      title
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($deleteBlogId: ID!) {
    deleteBlog(id: $deleteBlogId) {
      id
      title
      author
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signUpUser($input: signUpUserInput!) {
    signUpUser(input: $input) {
      name
      email
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($input: commentInput!) {
    addComment(input: $input) {
      id
      title
      comments {
        id
        author
        message
      }
    }
  }
`;
