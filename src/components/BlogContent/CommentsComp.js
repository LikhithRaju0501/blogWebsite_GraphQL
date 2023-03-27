import React, { useState } from "react";

import { Accordion, Button } from "react-bootstrap";
import styled from "styled-components";
import { isLoggedIn } from "../Authentication/auth";
import CommentModal from "./CommentModal";

const AccordionWrapper = styled(Accordion)`
  width: 30vw;
  margin: auto;
`;

const Header = styled.div`
  width: 50vw;
  margin: auto;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentsComp = ({ comments, id }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const modalHandler = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <>
      <Header>
        Comments-
        {isLoggedIn() && (
          <Button variant="danger" onClick={modalHandler}>
            Add Comment
          </Button>
        )}
      </Header>
      <br />
      {comments?.map(({ author, message, id }, index) => {
        return (
          <AccordionWrapper key={index}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>-{author}</Accordion.Header>
              <Accordion.Body>{message}</Accordion.Body>
            </Accordion.Item>
          </AccordionWrapper>
        );
      })}
      <CommentModal
        toggleModal={toggleModal}
        modalHandler={modalHandler}
        id={id}
      />
    </>
  );
};

export default CommentsComp;
