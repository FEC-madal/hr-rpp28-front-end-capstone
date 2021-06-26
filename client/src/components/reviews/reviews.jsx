import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewsList from './reviews-list.jsx';
import Breakdown from './breakdown.jsx';
import Promise from 'bluebird';


class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsBreakdown: {},
      productBreakdown: {},
      recommendations: '',
      reviewList: [],
      allReviews: [],
      totalRatings: '',
      stars: [] //going to use this for sort later
    };
    //this.binds go here
    this.metaData = this.metaData.bind(this);
    this.initialReviews = this.initialReviews.bind(this);
    this.numberOfReviews = this.numberOfReviews.bind(this);
    this.sortedReviews = this.sortedReviews.bind(this);
    this.starSort = this.starSort.bind(this);
  }
  //functions go here
  metaData() {
    console.log('these are the passed props: ', this.props.product_id.id)
    axios.get('/reviews/breakdown', {
      params: {
        product_id: this.props.product_id
      }
    })
      .then((response) => {
        this.setState({
          productBreakdown: response.data.characteristics,
          ratingsBreakdown: response.data.ratings,
          recommendations: response.data.recommended['true']
        });
      })
      .then(() => {
        this.numberOfReviews(this.state.ratingsBreakdown);
      });
      // .then(() => {
      //   this.initialReviews(this.state.numberOfReviews);
      //   console.log('Refactor this is the state after Meta: ', this.state);
      // })

  }

  numberOfReviews(ratings) {
    let totalRatings = 0;
    let ratingArray = [];
    for (let key in ratings) {
      totalRatings += (Number(ratings[key]));
      ratingArray[key] = (Number(ratings[key]));
    }
    this.setState({
      totalRatings: totalRatings
    });
    this.initialReviews(this.state.totalRatings);
  }

  initialReviews(count) {

    axios.get('/reviews/review-product', {
      params: {
        count: count,
        product_id: this.props.product_id
      }
    })
      .then((response) => {
        this.setState({
          reviewList: response.data.results,
          allReviews: response.data.results
        });
      })
  }

  sortedReviews(array) {
    this.setState({
      reviewList: array,
      allReviews: array
    });
  }

  // starSort(stars) {

  //   let starsReviews = [... this.state.reviewList];
  //   console.log(starsReviews, stars[0]);
  //   let filtered = starsReviews.filter(item => {
  //     console.log('item: ', item)
  //     item.rating === stars[0] || stars[1] ||stars[2] || stars[3] ||stars[4]
  //   });
  //   this.setState({
  //     reviewList: filtered
  //   });
  // }

  starSort(stars) {
    let starsReviews = [... this.state.allReviews];
    let starHolder = [... this.state.stars];
    if (starHolder.indexOf(stars) !== -1) {
      starHolder.splice(starHolder.indexOf(stars), 1);
    } else {
      starHolder.push(stars);
    }

    return Promise.map(starsReviews, review => {
      this.setState({
        stars: starHolder
      });
      return review
    })
      .filter(review => {

       return  starHolder.includes(review['rating'])
    })
      .then((results) => {
        console.log('something', this.state.stars);
        if (this.state.stars.length === 0) {
          console.log('empty');
          this.setState({
            reviewList: this.state.allReviews
          });
        } else {
          this.setState({
            reviewList: results
          });
        }
      });
  }

  componentDidMount() {
    this.metaData();
    // this.initialReviews();
    // first will be the metaData
    // next will be the get rviuews based off of the meta data number - call that in the meta data call
  }

  render() {
    return(
      <div className="reviews-container">
            <div className="reviews-left"><Breakdown starSort={this.starSort} ratings={this.state.ratingsBreakdown} recommendations={this.state.recommendations} totalRatings={this.state.totalRatings} characteristics={this.state.productBreakdown}/></div>
            <div className="reviews-right"><ReviewsList reviews={this.state.reviewList} totalRatings={this.state.totalRatings} sortedReviews={this.sortedReviews} product_id={this.props.product_id} chars={this.state.productBreakdown}/></div>
      </div>
    )
  }

}

export default Reviews;