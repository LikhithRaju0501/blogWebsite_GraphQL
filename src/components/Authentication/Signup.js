import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { SIGNUP_USER } from "../GraphQL/mutations";

const Signup = () => {
  const [apiError, setApiError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const [signUpUser] = useMutation(SIGNUP_USER, {
    onCompleted: () => {
      setApiError(false);
      let path = "/login";
      navigate(path);
    },
    onError: () => {
      setApiError(true);
    },
  });

  const validations = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password should be minimun 6 characters",
      },
    },
  };

  const formSubmit = (data) => {
    signUpUser({
      variables: {
        input: data,
      },
    });
  };

  const formError = (error) => {
    console.log(error);
  };
  return (
    <div>
      <Card style={{ margin: "30vh 20vw", padding: "5vh 5vw" }}>
        {apiError && (
          <Alert variant="danger">
            Something went wrong, Please try again later
          </Alert>
        )}

        <Form onSubmit={handleSubmit(formSubmit, formError)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register("name", validations.name)}
            />
            <div style={{ color: "red" }}>{errors?.name?.message}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", validations.email)}
            />
            <div style={{ color: "red" }}>{errors?.email?.message}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", validations.password)}
            />
            <div style={{ color: "red" }}>{errors?.password?.message}</div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
