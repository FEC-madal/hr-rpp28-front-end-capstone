import React from 'react';
import RelatedItemsList from './relatedItemsList.jsx';
import OutfitItemsList from './outfitItemsList.jsx';
import axios from 'axios';

class RelatedItemsModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItemsData: {},
      isLoading: true
    };

    this.data = {};
  }

  getRelatedItems() {
    let product_id = this.props.product_id;

    axios.get(`/products/${product_id}/related`, {
      params: {
        product_id: { product_id }
      }
    }).then(({ data }) => {
      return Promise.all(data.map((id) => {
        return this.getProductData(id);
      }));
    }).then(() => {
      this.setState({
        isLoading: false,
        relatedItemsData: this.data
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getProductData(id) {
    return axios.get(`/products/${id}`, {
      params: {
        product_id: id
      }
    }).then(({ data }) => {
      this.data[data.id] = data;
    });
  }

  componentDidMount() {
    this.getRelatedItems();
  }

  componentWillUnmount() {
    this.data = {};
  }

  render () {
    return (
      <div id="relatedItemsModule">
        <div id="relatedItemsList">This is the Related items list
          <RelatedItemsList />
        </div><br></br>
        <div id="outfitItemsList">This is the Outfit items list
          <OutfitItemsList />
        </div><br></br>
      </div>
    );
  }
};



export default RelatedItemsModule;