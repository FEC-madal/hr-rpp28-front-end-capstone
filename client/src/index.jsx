import React from "react";
import ReactDOM from "react-dom";
import Overview from "overview-module";
import QuestionAnswer from './components/questionanswer/questionanswer.jsx';
import Reviews from './components/reviews/reviews.jsx';
import Breakdown from './components/reviews/breakdown.jsx';
import RelatedMain from './components/relatedItems/RelatedMain.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    // default state
    this.state = {
      // The team will need a product review rating to render on multiple components

      defaultProduct: {
        "id": 22122,
        "campus": "hr-rpp",
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140.00",
        "created_at": "2021-03-18T16:09:30.589Z",
        "updated_at": "2021-03-18T16:09:30.589Z"
      },
      secondProduct:   {
        id: 22126,
        campus: 'hr-rpp',
        name: 'Heir Force Ones',
        slogan: 'A sneaker dynasty',
        description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
        category: 'Kicks',
        default_price: '99.00',
        created_at: '2021-03-18T16:09:30.589Z',
        updated_at: '2021-03-18T16:09:30.589Z'
      },
      productId: 22161,
      metaData: {},
    };

    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {


    // this.reviews()

  }

  updateProduct(productId) {
    // axios.get(`/reviews/?product_id=${productId}/getMeta`)
    //   .then((results) => {
    //     console.log('results in index.js updateProduct', results);
    //     this.setState({
    //       metaData: results.data,
    //       productId,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('error on meta GET request', err);
    //   });
  }

  render () {
    return (
      <div>
        <h1>FEC React Main App</h1>
        <Overview apiIP={"http://3.21.164.220"} productId={1}/>
        <br></br>
        <RelatedMain productId={this.state.productId} updateProduct={this.updateProduct}/>
        <br></br>
        <br></br>
        Ratings and Reviews
        <div><Reviews /></div>
         <QuestionAnswer currentProduct={this.state.secondProduct}/>
      </div>
    );

  }

};

ReactDOM.render(<App/>, document.getElementById('app'));
