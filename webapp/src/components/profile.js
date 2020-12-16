import React, { Component, Fragment } from "react";
import Footer from "./footer";
import Header from "./nav";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { getUserDetails, updateUserDetails } from "../actions/profile.action";

const INIT_USER_DETAILS = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  location: "",
};

class UserProfile extends Component {
  state = {
    userDetails: INIT_USER_DETAILS,
  };

  componentDidMount() {
    const { userId } = this.props.user;
    if (userId) {
      this.getUserDetails(userId);
    }
  }

  /**
   * Function to get user based on token
   */
  getUserDetails(userId) {
    const { userDetails } = this.state;
    getUserDetails(userId).then(
      (details) => {
        this.setState({
          userDetails: { ...userDetails, ...details },
        });
      },
      (err) => console.error(err)
    );
  }

  onSaveProfile = () => {
    const { userDetails } = this.state;
    const { userId } = this.props.user;

    updateUserDetails(userId, userDetails).then(
      (details) => alert("Data has been successfuly updated!"),
      (err) => {
        console.error(err);
      }
    );
  };

  render() {
    let { userDetails } = this.state;
    let {  firstname = "",
    lastname = "",
    phone = "",
    email = "",
    location = "" } = userDetails
    return (
      <div className="page-container">
        <div
          className="content-wrap"
          style={{
            background: "linear-gradient(#f5992a, #f0716f)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          <Header />
          <Fragment>
            <Container>
              <ToastContainer />
              <Row>
                <Col lg={6} md={6} sm={12} className="p-5 m-auto">
                  <div className="CreateRentalBox p-2">
                    <Form>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            userDetails.firstname = e.target.value
                            this.setState({
                                userDetails
                            })

                          }}
                          value={firstname}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) =>
                            {
                                userDetails.lastname = e.target.value
                                this.setState({
                                    userDetails
                                })
    
                            }
                          }
                          value={lastname}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) =>
                            {
                                userDetails.phone = e.target.value
                                this.setState({
                                    userDetails
                                })
    
                            }
                          }
                          value={phone}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) =>
                            {
                                userDetails.email = e.target.value
                                this.setState({
                                    userDetails
                                })
    
                            }
                          }
                          value={email}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) =>
                            {
                                userDetails.location = e.target.value
                                this.setState({
                                    userDetails
                                })
    
                            }
                          }
                          value={location}
                        />
                      </Form.Group>
                      <Button
                        className="btn-block btn-secondary"
                        onClick={this.onSaveProfile}
                      >
                        SAVE
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </Fragment>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(UserProfile);
