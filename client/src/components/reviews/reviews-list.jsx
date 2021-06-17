import React from 'react';
import ReactDOM from 'react-dom';
import IRT from  './reviews-irt.jsx';
import axios from 'axios';


class ReviewsList extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      numberOfReviews: 0,
      count: 2
    }
    //this.bind here
    // this.initialReviews = this.initialReviews.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
  }

  moreReviews(count) {
        this.setState({
          allReviews: this.props.reviews,
          count: this.state.count += 2
        });
  }

  componentDidMount() {
    this.setState({
      count: 2
    })
  }
  render() {
    let allReviews = (this.state.allReviews.length >=1) ? this.state.allReviews : this.props.reviews
    let reviewList = allReviews.slice(0, this.state.count).map((item, index) => {
      return (
        <div key={index}>
        <IRT review={item} />
        </div>
      )
    });
    return (
      <div>
      <div>{this.props.totalRatings} reviews, sorted by</div>
      <div className={(this.state.count >= 6) ? "reviews-scroll" : null  }>
            {reviewList}
      </div>
      <div><button className={(this.state.count >= this.props.reviews.length) ? "morereviews-hidden" : null}type="button" onClick={() => {this.moreReviews(this.props.totalRatings)}}>MORE REVIEWS </button></div>
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