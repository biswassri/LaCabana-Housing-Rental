import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { register } from "../../actions";
import Header from "./../nav";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
/**
 * Registeration Page for Users
 */
class Register extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    };

    this.registerUser = this.registerUser.bind(this);
  }
  registerUser(userData) {
    register(userData).then(
      registered => this.setState({ redirect: true }),
      errors => this.setState({ errors })
    );
  }
  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{ pathname: "/", state: { successRegister: true } }}
        />
      );
    }

    return (
      <div className="page-container">
        <div
          className="content-wrap"
          style={{ backgroundImage: `url('/assets/cities_collage.jpg')` }}
        >
          <Header />
          <Fragment>
            <Container>
              <Row>
                <Col>
                  <section id="register">
                    <div className="bwm-form">
                      <div className="row">
                        <div className="col-md-5">
                          <h1>Register</h1>
                          <RegisterForm submitCb={this.registerUser} errors={errors} />
                        </div>
                      </div>
                    </div>
                  </section>
                </Col>
              </Row>

            </Container>
          </Fragment>
        </div>
      </div>

    );
  }
}

export default Register;
