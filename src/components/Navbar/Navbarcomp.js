import React from "react";

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { isLoggedIn, logout } from "../Authentication/auth";

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const Navbarcomp = () => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar
        fixed="top"
        className="test"
        collapseOnSelect
        expand="lg"
        bg="success"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">GARAGE-TECHFORUM</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {isLoggedIn() ? (
              <Nav>
                <LinkWrapper to="/">
                  <Nav style={{ color: "white" }}>
                    <Button variant="success" size="small">
                      HOME
                    </Button>
                  </Nav>
                </LinkWrapper>
                <LinkWrapper to="/blog">
                  <Nav style={{ color: "white" }}>
                    <Button variant="success" size="small">
                      ADD BLOG
                    </Button>
                  </Nav>
                </LinkWrapper>
                <LinkWrapper to="/contact">
                  <Nav style={{ color: "white" }}>
                    <Button variant="success">CONTACT US</Button>
                  </Nav>
                </LinkWrapper>{" "}
                <Button variant="success" onClick={logout}>
                  LOGOUT
                </Button>
              </Nav>
            ) : (
              <Nav>
                <LinkWrapper to="/signup">
                  <Nav style={{ color: "white" }}>
                    <Button variant="success" size="small">
                      SIGNUP
                    </Button>
                  </Nav>
                </LinkWrapper>
                <LinkWrapper to="/login">
                  <Nav style={{ color: "white" }}>
                    <Button variant="success" size="small">
                      LOGIN
                    </Button>
                  </Nav>
                </LinkWrapper>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarcomp;
