import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import PropTypes from 'prop-types';
import Ratings from '../reviews/breakdown-rating.jsx';
import Stars from '../reviews/starsrating.jsx';

class RelatedItemSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parentData: this.props.parentInfo,
      productInfo: '',
      photoURL: '',
      photoLoaded: 0,
      clickModal: false,
      compareFeatures: '',
      salePrice: '',
    };

    this.newProduct = this.newProduct.bind(this);
    this.compareFeatures = this.compareFeatures.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleModalClick() {
    const { clickModal, parentFeature, productFeature } = this.state;
    this.props.relatedClicks('modalClick');
    this.setState({
      clickModal: !clickModal,
    });
    this.compareFeatures(parentFeature, productFeature);
  }

  getData() {
    const { productId, parentInfo } = this.props;
    axios.get(`/relatedItems/products/?productId=${productId}`)
      .then((data) => {
        // Get data.data.name from each product, add it to state
        this.setState({
          productInfo: data.data,
          parentFeature: parentInfo.features,
          productFeature: data.data.features,
          photoLoaded: this.state.photoLoaded + 1,
        });
      })
      .catch((err) => {
        console.log('Error fetching product info for RelatedItemSlide: ', err);
      });

    axios.get(`/relatedItems/products/?productId=${productId}&flag=styles`)
      .then((data) => {
        let thumbnail;
        const mainProductDescription = data.data.results.find((product) => product['default?'] === true);
        if (!mainProductDescription) {
          thumbnail = data.data.results[0].photos[0].thumbnail_url;
          this.setState({
            salePrice: data.data.results[0].salePrice,
          });
        } else {
          thumbnail = mainProductDescription.photos[0].thumbnail_url;
          this.setState({
            salePrice: mainProductDescription.sale_price,
          });
        }
        if (!thumbnail) {
            this.setState({
              photoLoaded: this.state.photoLoaded + 1,
            });
        } else {
            this.setState({
              photoLoaded: this.state.photoLoaded + 1,
              photoURL: thumbnail,
            });
        }
      })
      .catch((err) => {
        console.log('Error fetching photos in relatedItemSlide: ', err);
      });
  }

  compareFeatures(parentFeature, productFeature) {
    const compare = {};

    parentFeature.forEach((item) => {
      if (!compare[item.feature]) {
        if (item.value === null) {
          compare[item.feature] = ['\u2713'];
        } else {
          compare[item.feature] = [item.value];
        }
      }
    });

    productFeature.forEach((item) => {
      if (!compare[item.feature]) {
        if (item.value === null) {
          compare[item.feature] = [];
          compare[item.feature][1] = '\u2713';
        } else {
          compare[item.feature] = [];
          compare[item.feature][1] = item.value;
        }
      } else if (item.value === null) {
        compare[item.feature][1] = '\u2713';
      } else {
        compare[item.feature][1] = item.value;
      }
    });

    const values = Object.values(compare);
    const keys = Object.keys(compare);
    const compareArray = [];

    for (let i = 0; i < keys.length; i++) {
      if (values[i][0] === undefined) {
        values[i][0] = '';
      }
      if (values[i][1] === undefined) {
        values[i][1] = '';
      }
      compareArray.push(values[i][0], keys[i], values[i][1]);
    }

    this.setState({
      compareFeatures: compareArray,
    });
  }

  newProduct() {
    // grab product name from state and send back to index.jsx to update state for Tom and Chris
    const { productId, updateProduct } = this.props;
    const { productInfo } = this.state;
    this.props.relatedClicks('relatedSlideClick');
    let productName = productInfo.name;
    updateProduct(productId, productName);
  }

  render() {
    const {
      parentData,
      productInfo,
      photoURL,
      photoLoaded,
      compareFeatures,
      salePrice,
      clickModal,
    } = this.state;

    const { rating } = this.props;

    const sale = {
      color: salePrice ? 'red' : 'black',
      textDecoration: salePrice ? 'line-through' : 'none',
      fonstSize: '20px',
    };

    const loadPhoto = {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div>
        {
          photoLoaded < 2 && <SlideContainer style={loadPhoto} />
        }
        {
          photoLoaded === 2
          && (
            <SlideContainer>
              <ButtonWrap aria-label="Compare Items">
                <CompareButton
                  onClick={this.handleModalClick}
                  aria-label="Compare Items"
                >
                  <div dangerouslySetInnerHTML={{__html: '&#9734'}} />
                </CompareButton>
              </ButtonWrap>
              <ImageWrap onClick={this.newProduct} aria-label="Show new Product">
                <Image src={photoURL} alt={productInfo.name} />
              </ImageWrap>
              <StarsWrap>
              <div className="stars-noclick">
                <Stars rating={rating}/>
              </div>
              </StarsWrap>
              <ProductContentWrap style={{ fontSize: '15px'}}>{productInfo.category}</ProductContentWrap>
              <ProductContentWrap style={{ fontSize: '20px', fontWeight: 'bold' }}>{productInfo.name}</ProductContentWrap>
              <ProductContentWrap style={sale}>${productInfo.default_price}</ProductContentWrap>
              {salePrice ? <ProductContentWrap style={{ fontSize: '15px', fontWeight: 'bold' }}>{salePrice}</ProductContentWrap> : null}
              {salePrice ? <LowerBorderDiv /> : <BorderDiv />}
              <br />
            </SlideContainer>
          )
        }
        {
          clickModal
          && (
            <div>
              <Modal
                close={this.handleModalClick}
                parentName={parentData.name}
                compareName={productInfo.name}
                compareFeatures={compareFeatures}
              />
            </div>
          )
        }
      </div>
    );
  }
};

RelatedItemSlide.propTypes = {
  parentInfo: PropTypes.object,
  productId: PropTypes.number,
  updateProduct: PropTypes.func,
  rating: PropTypes.number,
  relatedClicks: PropTypes.func
};

const SlideContainer = styled.div`
height: 400px;
width: 275px;
position: relative;
flex-shrink: 0;
margin: 0px 10px;
background: rgba(255,255,255,0.1);
background: linear-gradient(180deg, hsl(190,70%,99%), hsl(240,60%,100%));
&:hover {
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  bottom-border: 0px;
  cursor: pointer;
}
`;

const Image = styled.img`
height: 100%;
width: 100%;
object-fit: contain;
object-position: 50% 0;
z-index: 0;
`;

const BorderDiv = styled.div`
border-bottom: 2px solid grey;
align: center;
width: 90%;
margin-top: 72px;
margin-left: 5%;
margin-right: 5%;
position: relative;
bottom: 0px;
`;

const LowerBorderDiv = styled.div`
border-bottom: 2px solid grey;
align: center;
width: 90%;
margin-top: 47px;
margin-left: 5%;
margin-right: 5%;
position: relative;
bottom: 0px;
`;

const ImageWrap = styled.div`
height: 200px;
width: auto;
margin-bottom: 30px;
`;

const ButtonWrap = styled.div`
position: absolute;
top: 0px;
right: 0px;
margin-top: 5px;
z-index: 10;
`;

const CompareButton = styled.button`
  postition: relative;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 25px;
  color: red;
  &:hover {
    color: gold;
  }
`;

const ProductContentWrap = styled.div`
  margin: 5px 15px;
`;

const StarsWrap = styled.div`
  margin: 5px 15px;
`;

export default RelatedItemSlide;
