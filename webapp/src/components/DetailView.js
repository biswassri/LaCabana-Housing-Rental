import React, { Component } from "react";
import Header from "./nav";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostingCard from "./PostingCard";
import { fetchRentals } from "../actions/rentallist.actions";

class RoomDetails extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchRentals();
  }

  renderList() {
    return this.props.rentals.map((rental) => {
      return <PostingCard key={rental._id} rental={rental} />;
    });
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <div className="container">
            <div className="row">{this.renderList()}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { rentals: state.rentals.data };
};
export default connect(mapStateToProps, { fetchRentals })(RoomDetails);
