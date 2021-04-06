import React from "react";
import Feed from "./Feed";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap"

function Main() {
  return (
    <div>
      <div>
      <Header />
      </div>
      <Container fluid>
        <Row>
        <Col></Col>
          <Col>
            <Feed />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
