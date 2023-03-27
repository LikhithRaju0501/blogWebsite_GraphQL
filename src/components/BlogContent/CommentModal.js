import React from "react";
import { Alert, Button, Modal, InputGroup, FormControl } from "react-bootstrap";

import { useForm } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { GET_ALL_BLOGS } from "../GraphQL/queries";
import { ADD_COMMENT } from "../GraphQL/mutations";
import { getAccessToken } from "../Authentication/auth";

const CommentModal = ({ modalHandler, toggleModal, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      modalHandler();
      resetField("message");
      window.location.reload();
    },
    refetchQueries: [{ query: GET_ALL_BLOGS }],
    context: {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    },
  });

  const formSubmit = (data) => {
    console.log(data);
    addComment({
      variables: {
        input: {
          id,
          message: data.message,
        },
      },
    });
  };

  return (
    <Modal show={toggleModal} onHide={modalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>A D D - C O M M E N T</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(formSubmit)}>
          {error?.message && <Alert variant="danger">{error.message}</Alert>}
          <InputGroup className="mb-1">
            <InputGroup.Text id="basic-addon1">Comment</InputGroup.Text>
            <FormControl
              aria-describedby="basic-addon1"
              name="message"
              {...register("message", { required: "Comment is required" })}
            />
          </InputGroup>
          <div className="errorMessage">{errors?.message?.message}</div>
          <Button variant="success" type="submit">
            POST
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
