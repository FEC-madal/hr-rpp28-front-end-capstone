import React from 'react';
import axios from 'axios';

import RelatedItemsList from './relatedItemsList.jsx';
import OutfitItemsList from './outfitItemsList.jsx';

class RelatedItemsModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItemsData: {},
      isLoading: true
    };
    this.data = [];
    this.product_id = 22134;
    // this.data = {};
  }

  componentDidMount() {
    this.getRelatedItemsInfo();
  }

  componentWillUnmount() {
    this.data = [];
    this.setState = () => {return;};
  }

  getRelatedItemsInfo() {
    axios({
      method: 'get',
      url: '/relatedItems/relatedItems',
      data: {
        product_id: this.product_id,
      },
    })
      .then((res) => {
        this.setState({
          relatedItemsData: res.data,
          isLoading: false,
        });
        this.data = res.data;
      })
      .catch((err) => {
        console.log('Catch block in main component', err);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div>... Related Items Loading ...</div>;
    }
    return (
      <div id="relatedItemsModule">
        <div id="relatedItemsList">
          This is the Related Items Module
          <RelatedItemsList data={this.state.relatedItemsData} />
        </div>
        <br />
        <div id="outfitItemsList">
          This is the Outfit items list
          <OutfitItemsList />
        </div>
        <br />
      </div>
    );
  }
};

export default RelatedItemsModule;