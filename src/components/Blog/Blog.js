import React, { useState } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setshowCard } from "../../redux/action";
import { useMutation } from "@apollo/client";

import { GET_ALL_BLOGS } from "../GraphQL/queries";
import { CREATE_BLOG } from "../GraphQL/mutations";
import { getAccessToken } from "../Authentication/auth";

import "./Blog.css";

const Blog = () => {
  const dispatch = useDispatch();
  const [image, setimage] = useState();
  let navigate = useNavigate();

  const [createBlog] = useMutation(CREATE_BLOG, {
    onCompleted: () => {
      dispatch(setshowCard());
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validations = {
    title: { required: "Title is required" },
    category: { required: "Category is required" },
    content: {
      required: "Content of your blog is required",
      minLength: {
        value: 30,
        message: "Content should be minimun 30 characters",
      },
    },
  };

  const formSubmit = (data) => {
    createBlog({
      variables: {
        input: { ...data, image },
      },
    });
  };

  const formError = (errors) => {
    errors?.title && console.log(errors.title.message);
    errors?.category && console.log(errors.category.message);
    errors?.content && console.log(errors.content.message);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setimage(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <div className="formPart">
        <form onSubmit={handleSubmit(formSubmit, formError)}>
          <InputGroup className="mb-1">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <FormControl
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="title"
              {...register("title", validations.title)}
            />
          </InputGroup>
          <div className="errorMessage">{errors?.title?.message}</div>

          <InputGroup>
            <InputGroup.Text id="basic-addon1">Post Category</InputGroup.Text>
            <FormControl
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="category"
              {...register("category", validations.category)}
            />
          </InputGroup>
          <div className="errorMessage">{errors?.category?.message}</div>
          <Form.Control
            as="textarea"
            placeholder="Post Your Content Here"
            style={{ height: "30vh", marginBottom: "1vh" }}
            name="content"
            {...register("content", validations.content)}
          />
          <div className="errorMessage">{errors?.content?.message}</div>
          <br />
          <Form.Group controlId="formFileSm">
            <Form.Label>Upload Blog Image</Form.Label>
            <Form.Control
              onChange={(e) => handleImage(e)}
              type="file"
              accept="image/*"
              size="sm"
            />
          </Form.Group>
          <br />
          {image ? (
            <div>
              <img src={image} width="100%" height="200px" alt="BlogImage" />
              <br /> <br />
            </div>
          ) : (
            <div></div>
          )}
          <br />
          <Button type="submit" variant="success">
            POST
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
