import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview.jsx';
import QuestionAnswer from './components/questionanswer.jsx';
import RatingsReviews from './components/reviews/ratingsreviews.jsx';
import RelatedItemsModule from './components/relatedItems/relatedItemsModule.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    // default state
    this.state = {
      // Tim will need a property for current product id to make a GET request for related items
      // The team will need a product review rating to render on multiple components
      reviews: {}
    };
  }
  

  render () {

    return (
      <div>
        <h1>FEC React Main App</h1>
        <Overview/>
        <br></br>
        <RelatedItemsModule /> {/* Need to pass this.state.currentProductId */}
        <br></br>
        <QuestionAnswer/>
        <br></br>
        <div className="reviews-container">
          <div className="reviews-column-container">
            <div className="reviews-left">Ratings and Product</div>
            <div className="reviews-right"><RatingsReviews /></div>
          </div>
        </div>
      </div>
    );

  }

};

ReactDOM.render(<App/>, document.getElementById('app'));