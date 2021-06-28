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
      relatedItems: [],
      productData: {},
      metaData: {},
    };

    // Tim's RelatedItems bindings
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    // Get product data

    // Get metaData
    const { productId } = this.state;
    axios.get(`/relatedItems/products/?productId=${productId}&flag=related`)
      .then((relatedIds) => {
        this.setState({
          relatedItems: relatedIds.data,
        });
      })
      .catch((err) => {
        console.log('Error fetching Related Product IDs: ', err);
      });

  }

  // Tim's methods for RelatedProducts and Outfit List
  updateProduct(newProductId) {
    this.setState({
      productId: newProductId,
      relatedItems: []
    });

    axios.get(`/relatedItems/products/?productId=${newProductId}&flag=related`)
    .then((relatedIds) => {
      this.setState({
        relatedItems: relatedIds.data,
      });
    })
    .catch((err) => {
      console.log('Error fetching Related Product IDs: ', err);
    });
  }

  render () {
    let { productId, relatedItems } =  this.state;

    return (
      <div>
        <h1>FEC React Main App</h1>
        {/* <Overview/> */}
        <br></br>
        <RelatedMain
          productId={productId}
          updateProduct={this.updateProduct}
          relatedItems={relatedItems}
        />
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
