import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import Header from "../nav";
import Footer from "../footer";
import { Container, Row, Col, Form, Button, Alert, InputGroup, FormControl } from "react-bootstrap";

import { updateRental, fetchRentals} from "../../actions/rentallist.actions";

import { Redirect } from "react-router";

class EditPostingForm extends Component {
  state = {
    title : '',
    description: '',
    city: '',
    street: '',
    category: 'apartment',
    bedroom: 1,
    rate: 500,
    isSuccess: false,
  };
  onSubmitRental = () => {
    let {
      title = '',
      description = '',
      city = '',
      street = '',
      category = 'apartment',
      bedroom = 1,
      rate = 0,
    } = this.state;
    try{
      bedroom = parseInt(bedroom);
      rate = parseInt(rate);
    }
    catch(e){

    }
    updateRental({rentalId, title, description, city, street, category, bedrooms : bedroom, dailyRate : rate})
    this.setState({
      isSuccess : true
    })
    this.props.fetchRentals()
  }
  render() { 
    const { title, description, city, street, category, bedroom, rate, isSuccess } = this.state
    if (isSuccess) {
      return <Redirect to={`/room/${city}`} />;
    }
    return ( 
      <div className="page-container">
        <div className="content-wrap"
        style={{ backgroundImage: `url('/assets/Bedroom.jpg')`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", backgroundPosition:"center" }}>
          <Header />
          <Fragment>
            <Container>
              <Row>
                <Col lg={6} md={6} sm={12} className="p-5 m-auto">
                  <div className="CreateRentalBox p-2">
                    <Form >
                      <Form.Label style={{fontSize:'25px', paddingLeft:'35%'}}> Edit Posting</Form.Label>
                      <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="" 
                        onChange={(e) =>
                          this.setState({
                            title: e.target.value,
                          })
                        }
                        value={title}
                        />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        onChange={(e) =>
                          this.setState({
                            description: e.target.value,
                          })
                        }
                        value={description}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="formGridCity" >
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                        onChange={(e) =>
                          this.setState({
                            city: e.target.value,
                          })
                        }
                        value={city}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="formGridStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control 
                        onChange={(e) =>
                          this.setState({
                            street: e.target.value,
                          })
                        }
                        value={street}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="formGridApartment">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"
                        onChange={(e) =>
                          this.setState({
                            category: e.target.value,
                          })
                        }
                        value={category}
                        >
                        <option>apartment</option>
                        <option>house</option>
                        <option>condo</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Label>Bedrooms</Form.Label>
                        <Form.Control as="select" type="number" custom 
                        onChange={(e) =>
                          this.setState({
                            bedroom: e.target.value,
                          })
                        }
                        value={bedroom}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Daily Rate</Form.Label>
                        <InputGroup className="mt-3">
                          <InputGroup.Prepend>
                          <InputGroup.Text>@</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl id="inlineFormInputGroup" type="number" placeholder="USD" 
                           onChange={(e) =>
                            this.setState({
                              rate: e.target.value,
                            })
                          }
                          value={rate}
                          />
                          </InputGroup>
                      </Form.Group>
                      <Form.Group>
                          <Form.Check
                            type="checkbox"
                            id="autoSizingCheck"
                            className="mt-3"
                            label="Shared"
                          />
                      </Form.Group>
                      <Button className="btn-block btn-secondary" onClick={this.onSubmitRental}>
                        Save
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
  return {  user : state.state,
  rental : state.rental
  };
};
export default connect(mapStateToProps, {updateRental})(EditPostingForm);