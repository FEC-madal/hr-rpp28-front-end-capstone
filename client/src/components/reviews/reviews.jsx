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
      stars: [], //going to use this for sort later
      clickTracking: []
    };
    //this.binds go here
    this.metaData = this.metaData.bind(this);
    this.initialReviews = this.initialReviews.bind(this);
    this.numberOfReviews = this.numberOfReviews.bind(this);
    this.sortedReviews = this.sortedReviews.bind(this);
    this.starSort = this.starSort.bind(this);
    this.relevant = this.relevant.bind(this);
    this.dateDiff = this.dateDiff.bind(this);
    this.clickThrough = this.clickThrough.bind(this);
  }
  //functions go here
  metaData() {
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
    this.initialReviews();
  }

  initialReviews(count) {

    axios.get('/reviews/review-product', {
      params: {
        count: this.state.totalRatings,
        product_id: this.props.product_id
      }
    })
      .then((response) => {
        this.relevant(response.data.results)
          .then( (array) => {
            this.setState({
              reviewList: array,
              allReviews: array
            });
          });

      })
  }

  sortedReviews(array) {
    this.setState({
      reviewList: array,
      allReviews: array
    });
  }



  starSort(stars) {
    let starsReviews = [... this.state.allReviews];
    let starHolder = [... this.state.stars];
    if (stars === "remove") {
      starHolder = [];
    } else if (starHolder.indexOf(stars) !== -1) {
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
        if (this.state.stars.length === 0) {
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

  relevant(reviews) {
    return new Promise ( (resolve, reject) => {
      let relevant = [ ... reviews];
      for (let i = 0; i < relevant.length; i++) {
          // relevant[i][Date] = 12;
          let dateNum = this.dateDiff(new Date(relevant[i].date), new Date());
          if (dateNum >= 0 && dateNum <= 30) {
            relevant[i]["ranking"] = Math.floor(relevant[i]["helpfulness"] / 2) + relevant[i]["helpfulness"]
          }

          if (dateNum >= 31 && dateNum <= 180) {
            relevant[i]["ranking"] = Math.floor(relevant[i]["helpfulness"] / 3) + relevant[i]["helpfulness"]

          }

          if (dateNum >= 181 ) {
            relevant[i]["ranking"] = Math.floor(relevant[i]["helpfulness"] / 5) + relevant[i]["helpfulness"]
          }

      }
      resolve(relevant.sort( (a, b) => {
        return b.ranking - a.ranking;
      }));
    });
  }

  dateDiff(d1, d2) {
    let diff = Math.abs(d1.getTime() - d2.getTime());
    return (diff / (1000 * 60 * 60 * 24)).toFixed();
  }


  componentDidMount() {
    this.metaData();
  }

  clickThrough(event) {

    const timeStamp = event.timeStamp;
    const dateObject = new Date();
    const readableTime = dateObject.toLocaleString()
    const target = event.target;
    const name = "Review Widget"
    let submissionHolder = {time: readableTime, element: target, name: name}
    let submission = [... this.state.clickTracking];
    submission.push(submissionHolder);
    this.setState({
      clickTracking: submission
    });
    console.log(this.state.clickTracking);
  }

  render() {
    return(
      <div className="reviews-container" onClick={this.clickThrough}>
            <div className="reviews-left"><Breakdown starSort={this.starSort} ratings={this.state.ratingsBreakdown} recommendations={this.state.recommendations} totalRatings={this.state.totalRatings} characteristics={this.state.productBreakdown} starFilter={this.state.stars}/></div>
            <div className="reviews-right"><ReviewsList reviews={this.state.reviewList} totalRatings={this.state.totalRatings} sortedReviews={this.sortedReviews} product_id={this.props.product_id} chars={this.state.productBreakdown} productName={this.props.productName} getReviews={this.initialReviews} allReviews={this.state.allReviews}/></div>
      </div>
    )
  }

}

export default Reviews;


