import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_BLOGS_BY_ID,
  GET_ALL_BLOGS,
  EDIT_BLOG_CHECK,
} from "../GraphQL/queries";
import { DELETE_BLOG } from "../GraphQL/mutations";
import { getAccessToken } from "../Authentication/auth";
import { useNavigate } from "react-router-dom";

import EditModal from "./EditModal";
import "./BlogContent.css";
import CommentsComp from "./CommentsComp";

const BlogContent = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data, loading } = useQuery(GET_BLOGS_BY_ID, {
    variables: { blogId: id },
  });

  const { data: isEditAccess, loading: isEditLoader } = useQuery(
    EDIT_BLOG_CHECK,
    {
      variables: { greetingId: id },
      context: {
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      },
    }
  );

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    onCompleted: () => {
      let path = "/";
      navigate(path);
    },
    refetchQueries: [{ query: GET_ALL_BLOGS }],
    context: {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    },
  });

  const deleteHandler = () => {
    deleteBlog({
      variables: {
        deleteBlogId: id,
      },
    });
  };

  const hideModal = () => setShowModal(false);

  return (
    <div>
      <br />
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div key={data?.blog.id}>
          <h2 className="title">{data?.blog.title}</h2>
          <div className="author">
            By: <span className="authorName">{data?.blog.author}</span>
          </div>
          <div className="category">
            Category:
            <span className="categoryName">{data?.blog.category}</span>
          </div>
          <div className="date">
            Published on:
            <span className="dateName">{data?.blog?.date}</span>
          </div>
          <div className="content">{data?.blog.content}</div> <br />
          {isEditLoader ? (
            <div>Loading...</div>
          ) : (
            isEditAccess?.isUsersBlog && (
              <div style={{ display: "flex" }}>
                <Button
                  style={{ width: "80vw", margin: "0 20px" }}
                  onClick={() => setShowModal(true)}
                >
                  Edit Blog
                </Button>
                <Button
                  variant="danger"
                  style={{ width: "80vw", margin: "0 20px" }}
                  onClick={deleteHandler}
                >
                  Delete Blog
                </Button>
              </div>
            )
          )}
          <EditModal hideModal={hideModal} showModal={showModal} data={data} />
          <CommentsComp comments={data?.blog?.comments} id={id} />
        </div>
      )}
    </div>
  );
};

export default BlogContent;
