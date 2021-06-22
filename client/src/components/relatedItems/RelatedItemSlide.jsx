import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Modal.jsx';
// Star Rating and average rating import or logic

class RelatedItemSlide extends React.Component {
  constructor(props) {
    super(props);

    const { parentInfo } = this.props;

    this.state = {
      parentData: parentInfo,
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
    this.setState({
      clickModal: !clickModal,
    });
    this.compareFeatures(parentFeature, productFeature);
  }

  getData() {
    const { product_id, parentInfo } = this.props;
    axios.get(`/relatedItems/products/?product_id=${product_id}`)
      .then((data) => {
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

    axios.get(`relatedItems/products/?product_id=${product_id}&flag=styles`)
      .then((data) => {
        let thumbnail = '';
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
          if (thumbnail === '') {
            this.setState({
              photoLoaded: this.state.photoLoaded + 1,
              // Should there be a 'PHOTO NOT FOUND' gif
            });
          } else {
            this.setState({
              photoLoaded: this.state.photoLoaded + 1,
              photoURL: thumbnail,
            });
          }
        }
      })
      .catch((err) => {
        console.log('Error fetching photos in relatedItemSlide: ', err);
      });
    // Axios reqquest for reviews and stars
  }

  compareFeatures(parentFeature, productFeature) {
    const compare = {};

    // Traversing through parentFeature array and setting a property to compare obj with name of feature as key and value or '-' for null
    parentFeature.forEach((item) => {
      if (!compare[item.feature]) {
        if (item.value === null) {
          compare[item.feature] = '-';
        } else {
          compare[item.feature] = item.value;
        }
      }
    });

    productFeature.forEach((item) => {
      if (!compare[item.feature]) {
        if (item.value === null) {
          compare[item.feature] = [];
          compare[item.feature][1] = '-';
        } else {
          compare[item.feature] = [];
          compare[item.feature][1] = item.value;
        }
      } else if (item.value === null) {
        compare[item.feature][1] = '-';
      } else {
        compare[item.feature][1] = item.value;
      }
    });

    const values = Object.values(compare);
    const keys = Object.keys(compare);
    const compareArray = [];

    for (let i = 0; i < keys.length; i++) {
      compareArray.push(values[i][0], keys[0], values[i][1]);
    }

    this.setState({
      compareFeatures: compareArray,
    });
  }

  newProduct() {
    const { product_id } = this.props;
    console.log('Need newProduct logic here...');
    // Need some sort of event handler to handle changing to a new product
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

    const sale = {
      color: salePrice ? 'red' : 'black',
      textDecoration: salePrice ? 'line-through' : 'none',
      fonstSize: '15px',
    };

    const loadPhoto = {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url("https://mk0wwwpoqcommervacts.kinstacdn.com/wp-content/uploads/2018/11/image3.gif")',
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
              <ButtonWrap>
                <CompareButton
                  onClick={this.handleModalClick}
                  className="fa fa-star"
                />
              </ButtonWrap>
              <ImageWrap onClick={this.newProduct}>
                <Image src={photoURL} alt={productInfo.name} />
              </ImageWrap>
              <ProductContentWrap style={{ fontSize: '10px'}}>{productInfo.category}</ProductContentWrap>
              <ProductContentWrap onClick={this.newProduct()} style={{ fontSize: '15px', fontWeight: 'bold' }}>{productInfo.name}</ProductContentWrap>
              <ProductContentWrap style={sale}>${productInfo.default_price}</ProductContentWrap>
              {salePrice ? <ProductContentWrap style={{ fontSize: '13px' }}>{salePrice}</ProductContentWrap> : null}
              {salePrice ? <LowerBorderDiv /> : <BorderDiv />}
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
}

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

export default RelatedItemSlide;
