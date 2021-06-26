import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from './starsrating.jsx';

const AverageNumber = (props) => {

  let ratings = props.ratings;
  let numberOfPeople = 0;
  let totalRatings = 0;
  //need to get each number and add them all together - people who posted a review
  //get all of the ratings
  for (let key in ratings) {
    numberOfPeople += Number(ratings[key]);
    totalRatings += (Number(key) * Number(ratings[key]));
  }
  let averageRating = (totalRatings / numberOfPeople).toFixed(1);
  console.log('total ratings:', totalRatings);
  let recommendations = ((props.recommendations / numberOfPeople) * 100).toFixed();

  return (
    <div className="stars-noclick">
      {averageRating} <StarRating rating={averageRating}/>
      <div>{recommendations}% of reviews recommend this product</div>
    </div>
  )
};

export default AverageNumber;