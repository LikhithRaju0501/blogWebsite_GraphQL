import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { GET_ALL_BLOGS } from "../GraphQL/queries";
import { UPDATE_BLOG } from "../GraphQL/mutations";
import { getAccessToken } from "../Authentication/auth";

const EditBlog = ({ data, hideModal }) => {
  const { title, category, content, image: base64Img, id } = data?.blog;

  const [base64image, setBase64Image] = useState(base64Img);

  const [updateBlog] = useMutation(UPDATE_BLOG, {
    onCompleted: () => {
      hideModal();
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
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("title", title);
    setValue("category", category);
    setValue("content", content);
  });

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
    const input = base64image
      ? { ...data, id, image: base64image }
      : { ...data, id };

    updateBlog({
      variables: {
        input,
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
    // img.current = base64;
    // setimage(base64);
    setBase64Image(base64);
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
      <div>
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
          {base64image ? (
            <div>
              <img
                src={base64image}
                width="100%"
                height="200px"
                alt="BlogImage"
              />
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

export default EditBlog;
