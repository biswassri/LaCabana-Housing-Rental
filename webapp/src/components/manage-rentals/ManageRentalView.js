import React, { Component } from "react";
import Header from "../nav";
import Footer from "../footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ManagePostingCard from "./ManagePostingCard";
import { fetchUserRentals, deleteRental } from "../../actions/rentallist.actions";

class ManageRentalView extends Component {
  state = {};
  deleteUserRental = this.deleteUserRental.bind(this);
  componentDidMount() {
    this.props.fetchUserRentals();
  }

  deleteUserRental(id) {
    console.log(id);
    console.log("Here");
    deleteRental(id).then(
      () => {
        toast.success("Rental is successfully deleted!");
        this.props.fetchUserRentals();
      },
      errors => toast.error(errors[0].detail)
    );
  }
  renderList(rentals) {
    
    return rentals.map((rental) => {
      return <ManagePostingCard key={rental._id} rental={rental} 
      deleteRentalCb={this.deleteUserRental}/>;
    });
  }

  render() {
    const { data: rentals, errors, isFetching } = this.props.rentals;

    return (
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <div className="container">
            <div className="row">{this.renderList(rentals)}</div>
            {!isFetching && errors.length === 0 && rentals.length === 0 && (
            <div className="alert alert-warning">
              You dont have any rentals currenty created. If you want advertised
              your property please follow this link.
              <Link
                style={{ marginLeft: "10px" }}
                className="btn btn-bwm"
                to="/postings/new"
              >
                Register Rental
              </Link>
            </div>
          )}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { rentals: state.rentals };
};
export default connect(mapStateToProps, { fetchUserRentals })(ManageRentalView);
