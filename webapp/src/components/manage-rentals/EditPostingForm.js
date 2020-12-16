import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import Header from "../nav";
import Footer from "../footer";
import { Container, Row, Col, Form, Button, Alert, InputGroup, FormControl } from "react-bootstrap";

import { updateRental, fetchRentalByID} from "../../actions/rentallist.actions";

import { Redirect } from "react-router";

class EditPostingForm extends Component {
  constructor(props){
    super(props);
  } 
  state = {
    postingDetails : {},
    title : '',
    description: '',
    city: '',
    street: '',
    category: 'apartment',
    bedroom: 1,
    rate: 500,
    isSuccess: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.fetchRentalDetails(id);
    }
  }

  fetchRentalDetails=(rentalId) =>{
    const { postingDetails } = this.state;
    this.props.fetchRentalByID(rentalId).then(
      (details) => {
  //      console.log(details);
        this.setState({
          postingDetails: details.data,
        });
      },
      (err) => console.error(err)
    );
  }

  onSubmitRental = () => {
    let {
      id = '',
      title = '',
      description = '',
      city = '',
      street = '',
      category = 'apartment',
      bedrooms = 1,
      dailyRate = 0,
    } = this.state.postingDetails;
    try{
      bedrooms = parseInt(bedrooms);
      dailyRate = parseInt(dailyRate);
    }
    catch(e){

    }
    updateRental(id,{id, title, description, city, street, category, bedrooms , dailyRate }).then(
      (details) => alert("Data has been successfuly updated!"),
      (err) => {
        console.error(err);
      }
    );
  }
  render() { 

    // console.log(this.state);
    // console.log("-----------");
    // console.log(this.props);

    // console.log("-----------");
    // console.log(this.state.postingDetails);

    // console.log("-----------");
    let { postingDetails } = this.state
    let { title = '', description = '', city = '', street = '', category = '', bedrooms = '', dailyRate ='', isSuccess } = postingDetails;
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
                        onChange={(e) =>{
                          postingDetails.title = e.target.value
                          this.setState({
                            postingDetails
                          })
                        }
                        }
                        value={title}
                        />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        onChange={(e) =>{
                          postingDetails.description = e.target.value
                          this.setState({
                            postingDetails
                          })
                        }
                        }
                        value={description}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="formGridCity" >
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                        onChange={(e) =>{
                          postingDetails.city = e.target.value
                          this.setState({
                            postingDetails
                          })
                        }
                        }
                        value={city}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="formGridStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control 
                        onChange={(e) =>{
                          postingDetails.street = e.target.value
                          this.setState({
                            postingDetails
                          })
                        }
                        }
                        value={street}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="formGridApartment">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"
                        onChange={(e) =>{
                          postingDetails.category = e.target.value
                          this.setState({
                            postingDetails
                          })
                        }
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
                        onChange={(e) =>{
                          postingDetails.bedrooms = e.target.value
                          this.setState({
                            postingDetails
                          })
                        }
                        }
                        value={bedrooms}>
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
                          onChange={(e) =>{
                            postingDetails.dailyRate = e.target.value
                            this.setState({
                              postingDetails
                            })
                          }
                          }
                          value={dailyRate}
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
  return {  
    user : state.state,
    rental : state.rentals.data
  };
};
export default connect(mapStateToProps, {fetchRentalByID})(EditPostingForm);