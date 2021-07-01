import React from "react";
import ReactDOM from "react-dom";
// import Overview from "overview-module";
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
        id: 22134,
        campus: 'hr-rpp',
        name: 'Heir Force Ones',
        slogan: 'A sneaker dynasty',
        description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
        category: 'Kicks',
        default_price: '99.00',
        created_at: '2021-03-18T16:09:30.589Z',
        updated_at: '2021-03-18T16:09:30.589Z'
      },
      productId: 22122,
      relatedItems: [],
      relatedItemsRatings: {},
      productData: {},
      productName: "Camo Onesie",
    };
    this.ratingData = {};
    this.getRelated = this.getRelated.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    this.getRelated(this.state.productId);
  }

  getRelated(productId) {
    axios.get(`/relatedItems/products/?productId=${productId}&flag=related`)
      .then((relatedIds) => {
        this.setState({
          relatedItems: relatedIds.data,
        });
        return relatedIds.data;
      })
      // get related product ratings
      .then((relatedItemsIds) => {
        let relatedRatings = relatedItemsIds.map((item) => {
          return this.getRatings(item);
        })
        this.setState({
          relatedItemsRatings: relatedRatings
        });
      })
      .then(() => {
        let { relatedItemsRatings } = this.state;
        for (let i = 0; i < relatedItemsRatings.length; i++) {
          if (relatedItemsRatings[i] === undefined) {
            relatedItemsRatings.splice(i);
          }
        }
        this.setState({
          relatedItemsRatings: relatedItemsRatings
        })
      })
      .catch((err) => {
        console.log('Error fetching Related Product IDs: ', err);
      });
  }

  getRatings(productId) {
    axios.get(`/relatedItems/reviews/meta?product_id=${productId}`)
      .then((ratings) => {
        let newRatings = {
          1: '0',
          2: '0',
          3: '0',
          4: '0',
          5: '0'
        }

        for (var key in ratings.data) {
          newRatings[key] = ratings.data[key];
        }

        let divisor = 0;
        let numerator = (parseInt(newRatings['1']) * 1) + (parseInt(newRatings['2']) * 2) + (parseInt(newRatings['3']) * 3) + (parseInt(newRatings['4']) * 4) + (parseInt(newRatings['5']) * 5);

        for (let key in newRatings) {
          divisor = divisor + parseInt(newRatings[key]);
        }

        let average = numerator / divisor;

        if (isNaN(average)) {
          average = 0;
        }

        let objKey = productId;
        this.ratingData[objKey] = average;

        this.setState({
          relatedItemsRatngs: this.ratingData
        });
      })
      .catch((err) => {
        console.log('Error fetching meta data: ', err);
      });
  }

  updateProduct(newProductId, newProductName) {
    this.setState({
      productId: newProductId,
      productName: newProductName,
      relatedItems: [],
      relatedItemsRatings: []
    });

    this.getRelated(newProductId);
  }

  render () {
    var styleOBJ = {
      // height:'20vw',
      // overflow:'auto',
      width: '95vw',
      border: '1px solid black',
    };

    let { productId, relatedItems, relatedItemsRatings } =  this.state;
    return (
      <div>
        <h1>FEC React Main App</h1>
        {/* <Overview/> */}
        <br></br>
        <RelatedMain
          productId={productId}
          relatedItems={relatedItems}
          ratings={this.ratingData}
          updateProduct={this.updateProduct}
        />
        <br></br>
        <br></br>
        <h1>Questions and Answers </h1>
        <div style={styleOBJ}> <QuestionAnswer currentProduct={this.state.productId} productName={this.state.productName} defaultProduct={this.state.defaultProduct}/></div>
        <br></br>
        <br></br>
        <div><Reviews product_id={this.state.productId} productName={this.state.productName}/></div>
      </div>
    );

  }

};

ReactDOM.render(<App/>, document.getElementById('app'));

