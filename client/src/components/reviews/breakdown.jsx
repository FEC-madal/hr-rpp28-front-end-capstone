import React from 'react';
import ReactDOM from 'react-dom';
import AverageNum from './breakdown-number.jsx';
import StarRating from './starsrating.jsx';
import Ratings from './breakdown-rating.jsx';
import Product from './breakdown-product.jsx';
import axios from 'axios';


function Breakdown(props) {

    return (
      <div>
        {/* average number will go here && along with the star rating */}
        <AverageNum ratings={props.ratings} recommendations={props.recommendations}/>
        <Ratings ratings={props.ratings} totalRatings={props.totalRatings} starSort={props.starSort} starFilter={props.starFilter}/>
        <Product characteristics={props.characteristics}/>
        {/* the charractics will fgo here */}
      </div>
    );
}



export default Breakdown;