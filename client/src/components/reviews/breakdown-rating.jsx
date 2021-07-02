import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const Ratings = (props) => {
  let ratings = props.ratings;
  let totalRatings = props.totalRatings;
  let ratingArray = [];
  //need to get each number and add them all together - people who posted a review
  //get all of the ratings
  for (let key in ratings) {
    ratingArray[key] = (Number(ratings[key]));
  }
  let max = `${totalRatings}`;

  let starholder = (num) => {
    props.starSort(num);
  }

  let removeFilter = () => {
    props.starSort("remove");
  }

  return (
    <div className="reviews-container-progressbar">
      <div>Ratings Breakdown</div>
      <div className="reviews-starfilter-selection">
      <span>Star Filters Applied:</span>
      <span className={(props.starFilter.indexOf(5) !== -1) ? "reviews-starfilter-selection-aligncenter" : "product-hidden"}>5</span>
      <span className={(props.starFilter.indexOf(4) !== -1) ? "reviews-starfilter-selection-aligncenter" : "product-hidden"}>4</span>
      <span className={(props.starFilter.indexOf(3) !== -1) ? "reviews-starfilter-selection-aligncenter" : "product-hidden"}>3</span>
      <span className={(props.starFilter.indexOf(2) !== -1) ? "reviews-starfilter-selection-aligncenter" : "product-hidden"}>2</span>
      <span className={(props.starFilter.indexOf(1) !== -1) ? "reviews-starfilter-selection-aligncenter" : "product-hidden"}>1</span>
      </div>
      <div className={(props.starFilter.length > 0) ? null: "product-hidden"} style={{textDecoration: 'underline'}}onClick={removeFilter}>Remove all filters</div>
        <div className="reviews-starholder-progressbar" onClick={() => {starholder(5)}}>
          <label className="alignleft-star-rating" htmlFor="5star">5 Star</label>
          <progress id="5star"  max={max} value={ratingArray[5] || 0} ></progress>
          <span className="alignright-star-rating">{ratingArray[5] || 0}</span>
        </div>
        <div className="reviews-starholder-progressbar" onClick={() => {starholder(4)}}>
        <label className="alignleft-star-rating" htmlFor="4star">4 Star</label>
        <progress id="4star"max={max} value={ratingArray[4] || 0}></progress>
        <span className="alignright-star-rating">{ratingArray[4] || 0}</span>
        </div>
        <div className="reviews-starholder-progressbar" onClick={() => {starholder(3)}}>
        <label className="alignleft-star-rating" htmlFor="3star">3 Star</label>
        <progress id="3star"max={max}value={ratingArray[3] || 0}></progress>
        <span className="alignright-star-rating">{ratingArray[3] || 0}</span>
        </div>
        <div className="reviews-starholder-progressbar" onClick={() => {starholder(2)}}>
        <label className="alignleft-star-rating" htmlFor="2star">2 Star</label>
        <progress id="2star"max={max} value={ratingArray[2] || 0}></progress>
        <span className="alignright-star-rating">{ratingArray[2] || 0}</span>
        </div>
        <div className="reviews-starholder-progressbar" onClick={() => {starholder(1)}}>
        <label className="alignleft-star-rating" htmlFor="1star">1 Star</label>
        <progress id="1star"max={max} value={ratingArray[1] || 0}></progress>
        <span className="alignright-star-rating">{ratingArray[1] || 0}</span>
        </div>
    </div>
  )
};

export default Ratings;