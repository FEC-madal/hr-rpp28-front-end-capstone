import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RelatedItemsList from './RelatedItemsList.jsx';
import OutfitList from './OutfitList.jsx';

class RelatedMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { productId, updateProduct, relatedItems, ratings, relatedClicks, outfitClicks } = this.props;
    return (
      <RelatedModuleWrap id="relatedModuleWrap">
          <section>
            <h2>Related items you may also like</h2>
          </section>
        <ListWrap>
          <RelatedItemsList
            productId={productId}
            relatedItems={relatedItems}
            ratings={ratings}
            updateProduct={updateProduct}
            relatedClicks={relatedClicks}
          />
        </ListWrap>
        <section>
          <h2>Your Outfit</h2>
        </section>
        <ListWrap>
          <OutfitList
            parentId={productId}
            updateProduct={updateProduct}
            outfitClicks={outfitClicks}
          />
        </ListWrap>
      </RelatedModuleWrap>

    );
  }
};

RelatedMain.propTypes = {
  productId: PropTypes.number,
  updateProduct: PropTypes.func,
  relatedItems: PropTypes.array,
  ratings: PropTypes.object,
  relatedClicks: PropTypes.func,
  outfitClicks: PropTypes.func
};

const RelatedModuleWrap = styled.div`
padding: 5px 40px 0px 40px;
display: flex;
flex-direction: column;
justify-content: center;
margin: 10px auto;
max-width: 1200px;
`;

const ListWrap = styled.div`
margin: 10px 0px 0px;
position: relative;
width: 100%;
`;

export default RelatedMain;
