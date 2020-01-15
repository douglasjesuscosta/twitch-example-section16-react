import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

import './styles.css';
import GoogleAuth from "../GoogleAuth";


const HeaderApplication = () => {
  return (
    <Container>
      <Navbar bg="light" variant="outline-primary" expand="lg" fixed="top" >
        <Navbar.Brand href="#">Streams</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/">All Streams</Nav.Link>
          <Nav.Link href="/streams/new">Create Stream</Nav.Link>

        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <GoogleAuth></GoogleAuth>
        </Navbar.Collapse>

      </Navbar>
    </Container>
  );
};

export default HeaderApplication;
