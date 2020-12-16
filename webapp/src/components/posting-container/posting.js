import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchRentalByID, getReviews } from "../../actions/rentallist.actions";
import PostingDetailInfo from "./postingDetails";
import RentalDetailUpdate from "./postingUpdate";
import GoogleMap from "../map/GoogleMap";
class PostingDetail extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  setMapHeight() {
    this.forceUpdate();
  }

  renderRentalDetail(rental) {
    const { isUpdate } = this.props.location.state || false;
    if (isUpdate)
      return (
        <div className="col-md-12">
          <RentalDetailUpdate />{" "}
        </div>
      );
    return (
      <React.Fragment>
        <div className="col-md-8">
          <PostingDetailInfo rental = {rental} />
        </div>
        <div className="col-md-4">
          
        </div>
        {/* {this.renderReviews()} */}
      </React.Fragment>
    );
  }

  render() {
    const { id } = this.props.match.params;
    const {rentals} = this.props;
    const rental = rentals.find(x => x.id === id);
    if (!rental ) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container" id="rentalDetails">
        <ToastContainer />
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img
                ref={this.imgRef}
                onLoad={() => this.setMapHeight()}
                src="/assets/roomPosting.jpg"
                alt=""
              />
            </div>
            <div className="col-md-6 ">
            <GoogleMap
                height={
                  this.imgRef.current ? this.imgRef.current.clientHeight : 0
                }
                address={`${rental.city}, ${rental.street}`}
              />
            </div>
          </div>
        </div>
        <div className="details-section">
          <div className="row">{this.renderRentalDetail(rental)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    // // console.log(state);
  return {
    rentals: state.rentals.data
  };
};

export default connect(mapStateToProps, { fetchRentalByID })(PostingDetail);