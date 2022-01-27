import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navsecond from "./navsecond";

function Mypdf() {
  return (
    <>
      <Navsecond />
      <Container>
        <br />
        <Row>
          <Col>
            <Form action="http://localhost:9000/api/download">
              <Button type="submit" variant="success">
                Download PDF
              </Button>
            </Form>
          </Col>
          <Col>
            <Form action="http://localhost:9000/api/sendpdf">
              <Button type="submit" variant="success">
                Send PDF (Email)
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Mypdf;
