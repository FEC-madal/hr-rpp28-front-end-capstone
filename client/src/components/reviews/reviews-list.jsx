import React from 'react';
import ReactDOM from 'react-dom';
import IRT from  './reviews-irt.jsx';
import Sorted from './reviews-sorted.jsx';
import AddReview from './reviews-add.jsx';
import axios from 'axios';


class ReviewsList extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      count: 2
    }
    //this.bind here
    // this.initialReviews = this.initialReviews.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
  }

  moreReviews(count) {
        this.setState({
          count: this.state.count += 2
        });
  }

  componentDidMount() {
    // let promise = new Promise ( (resolve, reject) => {
    //   let reviews =
    // });
  }
  render() {
    let allReviews = this.props.reviews
    // let allReviews = (this.state.allReviews.length >=1) ? this.state.allReviews : this.props.reviews
    let reviewList = allReviews.slice(0, this.state.count).map((item, index) => {
      return (
        <div key={index}>
        <IRT review={item} />
        </div>
      )
    });
    return (
      <div>
      <div><Sorted totalRatings={this.props.totalRatings} reviews={this.props.reviews} relevant={this.props.reviews} sortedReviews={this.props.sortedReviews} /></div>
      <div className={(this.state.count >= 6) ? "reviews-scroll" : null  }>
            {reviewList}
      </div>
      <div><button className={(this.state.count >= this.props.reviews.length) ? "morereviews-hidden" : null}type="button" onClick={() => {this.moreReviews(this.props.totalRatings)}}>MORE REVIEWS </button> <AddReview product_id={this.props.product_id} chars={this.props.chars}/></div>
      </div>
    );
  }
}



export default ReviewsList;


  // moreReviews() {
  //   //will need to reset number of reviews when a new product is introduced
  //   let more = this.state.numberOfReviews += 2;
  //   this.setState({
  //     numberOfReviews: more
  //   });
  //   axios.get('/reviews/review-product', {
  //     params: {
  //       count: more
  //     }
  //   })
  //     .then((response) => {
  //       // console.log('these is the reponse: ', response.data.results);
  //       this.setState({
  //         reviewList: response.data.results
  //       });
  //       // console.log('thsis the after: ', this.state.reviewList);
  //       // this.breakdown();
  //     })