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
    const { productId, updateProduct, relatedItems, ratings } = this.props;
    return (
      <RelatedModuleWrap id="relatedModuleWrap">
        <div>
          <section>
          <h3>Related items you may also like</h3>
          </section>
        </div>
        <ListWrap>
          <RelatedItemsList
            productId={productId}
            relatedItems={relatedItems}
            ratings={ratings}
            updateProduct={updateProduct}
          />
        </ListWrap>
        <div>
        <section>
          <h3>Your Outfit</h3>
        </section>
        </div>
        <ListWrap>
          <OutfitList
            parentId={productId}
            updateProduct={updateProduct}
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
  ratings: PropTypes.object
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
