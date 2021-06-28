import React from 'react';
import styled from 'styled-components';
// Star Rating
import Ratings from '../reviews/breakdown-rating.jsx';
import Stars from '../reviews/starsrating.jsx';

class OutfitSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productInfo: '',
      productStyles: '',
      photoURL: '',
      loaded: 0,
      salePrice: '',
    };

    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  componentDidMount() {
    const { outfit } = this.props;
    const defaultInfo = outfit.styles.results.find((product) => product['default?'] === true);
    let thumbnailURL;

    if (!defaultInfo) {
      thumbnailURL = outfit.styles.results[0].photos[0].url;
      this.setState({
        salePrice: outfit.styles.results[0].sale_price,
      });
    } else {
      thumbnailURL = defaultInfo.photos[0].url;
      this.setState({
        salePrice: defaultInfo.sale_price,
      });
    }

    if (!thumbnailURL) {
      this.setState({
        productInfo: outfit.info,
        productStyles: outfit.styles,
        photoURL: 'https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg',
        loaded: this.state.loaded + 1,
      });
    } else {
      this.setState({
        productInfo: outfit.info,
        productStyles: outfit.styles,
        photoURL: thumbnailURL,
        loaded: this.state.loaded + 1,
      });
    }
  }

  deleteOutfit() {
    const { removeOutfit } = this.props;
    const { productStyles } = this.state;
    removeOutfit(productStyles.product_id);
  }

  changeProduct() {
    const { outfit, updateProduct } = this.props;
    const productId = outfit.styles.product_id;
    updateProduct(productId);
  }

  render() {
    const {
      productInfo, photoURL, loaded, salePrice,
    } = this.state;
    const sale = {
      textDecoration: salePrice ? 'line-through' : 'none',
      color: salePrice ? 'red' : 'black',
      fontSize: '15px',
    };
    return (
      <>
        {
          loaded === 1 && (
            <CardWrap>
              <ButtonWrap>
                <RemoveButton
                  onClick={this.deleteOutfit}
                  className='far fa-times-circle'
                  aria-label="Remove item from outfit"
                />
              </ButtonWrap>
              <ImageWrap onClick={this.changeProduct}>
                <Image src={photoURL} width='100%' height='auto' alt={productInfo.name} />
              </ImageWrap>
              <ProductContentWrap style={{ fonSize: '10px' }}>{productInfo.category}</ProductContentWrap>
              <ProductContentWrap style={{ fontSize: '15px', fontWeight: 'bold' }} onClick = {this.changeProduct}>{productInfo.name}</ProductContentWrap>
              <ProductContentWrap style={sale}>
                $
                {productInfo.default_price}
              </ProductContentWrap>
              {salePrice ? <ProductContentWrap style={{ fontSize: '13px' }} > {salePrice}</ProductContentWrap> : null}
              {salePrice ? <LowerBorderDiv /> : <BorderDiv />}
            </CardWrap>
          )
        }
      </>
    );
  }
}

const CardWrap = styled.div`
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

const Image = styled.img`
height: 100%;
width: 100%;
object-fit: contain;
z-index: 0;
`;

const RemoveButton = styled.button`
  right: 20%;
  top: 2%;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 25px;
  color: red;
  &:hover {
    color: white;
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  margin-top: 5px;
  z-index: 10;
  border-radius: 40%;
  &:hover {
    background: black;
  }
`;

const ProductContentWrap = styled.div`
  margin: 5px 15px;
`;

export default OutfitSlide;
