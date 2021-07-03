import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from './starsrating.jsx';
import ReviewPhotos from './reviewphotos.jsx';
import ReviewBody from './review-body.jsx';
import axios from 'axios';

class IRT extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      helpful: this.props.review.helpfulness,
      checkedClicked: false,
    }
    //this.bind here
    this.helpful = this.helpful.bind(this);
    this.report = this.report.bind(this);
  }

  //functions here
  helpful() {
    let review_id = this.props.review.review_id;
    if (this.state.checkedClicked === true) {
    } else  {
      axios.put( 'reviews/helpful',{
        data: review_id
      })
        .then(() => {
          this.setState({
            checkedClicked: true,
            helpful: this.props.review.helpfulness + 1

          })
        })
    }
  }

  report() {
    let review_id = this.props.review.review_id;
    axios.put( 'reviews/report',{
      data: review_id
    })
      .then(() => {
       alert('Review Reported');
      })
  }

  render() {
    const check = '✓';
    return(
      <div className="reviews-irt-container">
      <div className="review-username">
       <span className="review-username-alignleft stars-noclick"><StarRating rating={this.props.review.rating}/></span>
       <span className="review-username-alignright">{this.props.review.reviewer_name}, {new Date(this.props.review.date.toString()).toLocaleString('en-us', {month: 'long', day: 'numeric', year : 'numeric'})}</span>
      </div>
      <div className="reviews-summary">{this.props.review.summary}</div>
      <div className="reviews-body"><ReviewBody body={this.props.review.body}/></div>
      <div><ReviewPhotos photos={this.props.review.photos}/></div>
      <div className={this.props.review.recommend ? null : "product-hidden" }>{`${check}` + ' ' + "I recommend this product"}</div>
      <div className={this.props.review.response ? "review-seller": "product-hidden"}><span>Response from Seller: {this.props.review.response}</span></div>
      <div className="reviews-helpful">
      <span onClick={this.helpful}>Helpful? Yes ({this.state.helpful}) | <span onClick={this.report}>Report</span></span>
      </div>
      <div className="reviews-divider"></div>
    </div>
    )
  }
}


export default IRT;



