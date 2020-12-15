import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect} from 'react-router-dom'

import Header from "./../nav";
import Footer from "./../footer";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { login, clearLoginErrors } from "../../actions/user.actions";

class Login extends Component {
  state = {
    email : '',
    password: ''
  };
  componentDidMount(){
    this.props.clearLoginErrors();
  }
  onLogin = () => {
    const {
      email = '',
      password = ''
    } = this.state;
    this.props.login({email, password})
  }
  render() {
    const { email, password} = this.state
    const { isLogin = false, errors = [] } = this.props.user;
    if (isLogin) {
      return <Redirect to="/" />;
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
                <Col lg={6} md={6} sm={12} className="p-5 m-auto">
                  <div className="LoginBox p-5">
                    <Form className="mt-3" >
                      <Form.Group>
                        <Form.Control type="email" placeholder="Enter email" 
                          onChange={(e) =>
                            this.setState({
                              email: e.target.value,
                            })
                          }
                          value={email}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Control type="password" placeholder="Password" 
                          onChange={(e) =>
                            this.setState({
                              password: e.target.value,
                            })
                          }
                          value={password}
                        />
                      </Form.Group>

                      <Button className="btn-block btn-secondary" onClick={this.onLogin}>
                        Submit
                      </Button>
                    </Form>
                    {
                      (errors && errors.length > 0)
                      ? 
                        <Alert onClose={() => this.props.clearLoginErrors()} variant="danger" dismissible>
                          <Alert.Heading>{errors[0].title}</Alert.Heading>
                          <p>
                            {errors[0].detail}
                          </p>
                        </Alert>
                      : ""
                    }
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
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { login,clearLoginErrors })(Login);
