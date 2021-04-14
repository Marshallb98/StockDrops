import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function LandingPage() {
  return (
    <div>
      <Container fluid>

         <Row>
           <Col>
            <h1>Stalk Stock Drops</h1>
            </Col>
            </Row>
        <Row className="justify-content-md-center">
          <Col><button href="/login" type="button" class="btn btn-secondary"> Login </button></Col>
          <Col><button href="/signup" type="button" class="btn btn-secondary"> Sign Up </button></Col>
        </Row>
        <Row className="justify-content-md-center">
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
