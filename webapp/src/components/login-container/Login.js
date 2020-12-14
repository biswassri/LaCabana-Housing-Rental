import React, { Component, Fragment } from "react";

import Header from "./../nav";
import Footer from "./../footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap" style={{backgroundImage:`url('/assets/cities_collage.jpg')`}}>
          <Header />
          <Fragment>
            <Container>
              <Row>
                <Col lg={6} md={6} sm={12} className="p-5 m-auto">
                  <div className="LoginBox p-5">
                    <Form className="mt-3">
                      <Form.Group> 
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <Button className="btn-block btn-secondary"  type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </Fragment>
        </div>
      </div>
    );
  }
}

export default Login;
