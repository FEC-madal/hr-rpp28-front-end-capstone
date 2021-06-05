import React from 'react';
import ReactDOM from 'react-dom';
import IRT from  './irt.jsx';


class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);

    // default state
    this.state = {};
  }

  render () {
    return (
      <div>
        <div>sort will go here</div>
        <div>
          <IRT />
        </div>
        <div><button type="button">MORE REVIEWS</button></div>
      </div>
    )
  }
}



export default RatingsReviews;