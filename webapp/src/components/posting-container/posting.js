import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import StarRatings from "react-star-ratings";
import { fetchRentalByID, getReviews } from "../../actions/rentallist.actions";
import PostingDetailInfo from "./postingDetails";
import RentalDetailUpdate from "./postingUpdate";

class PostingDetail extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  setMapHeight() {
    this.forceUpdate();
  }
//   renderSingleReview(review) {
//     return (
//       <div key={review._id} className="card review-card">
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-2 user-image">
//               <img
//                 src="https://image.ibb.co/jw55Ex/def_face.jpg"
//                 className="img img-rounded img-fluid"
//                 alt=""
//               />
//               <p className="text-secondary text-center">{review.createdAt}</p>
//             </div>
//             <div className="col-md-10">
//               <div>
//                 <a>
//                   <strong>{review.user.username}</strong>
//                 </a>
//                 <div className="review-section">
//                   <StarRatings
//                     rating={review.rating}
//                     starRatedColor="orange"
//                     starHoverColor="orange"
//                     starDimension="25px"
//                     starSpacing="2px"
//                     numberOfStars={5}
//                     name="rating"
//                   />
//                 </div>
//               </div>
//               <div className="clearfix" />
//               <p>{review.text}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   renderReviews() {
//     const { reviews } = this.state;
//     if (reviews.length === 0) {
//       return <h5>Be the first to review this rental.</h5>;
//     }
//     return (
//       <div className="row">
//         <div className="col-md-8">
//           <section style={{ marginBottom: "40px" }}>
//             <h2>Reviews</h2>
//             {reviews.map(review => this.renderSingleReview(review))}
//           </section>
//         </div>
//       </div>
//     );
//   }

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
                src={rental.image}
                alt=""
              />
            </div>
            <div className="col-md-6 ">
              
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