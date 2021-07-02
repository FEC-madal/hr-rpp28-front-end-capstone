import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OutfitSlide from './OutfitSlide.jsx';
import PropTypes from 'prop-types';
// Star ratings

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      parentStyles: '',
      parentInfo: '',
      showScrollRight: false,
      showScrollLeft: false,
      loaded: false,
    };

    this.addOutfit = this.addOutfit.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.overflow = this.overflow.bind(this);
  }

  componentDidMount() {
    const { parentId } = this.props;

    if (parentId !== undefined) {
      axios.get(`relatedItems/products/?productId=${parentId}`)
        .then((data) => {
          this.setState({
            parentInfo: data.data,
          });
        })
        .catch((err) => {
          console.log('Error fetching parent product info OutfitList CDM: ', err);
        });

      axios.get(`relatedItems/products/?productId=${parentId}&flag=styles`)
        .then((data) => {
          this.setState({
            parentStyles: data.data
          });
        })
        .catch((err) => {
          console.log('Error fetching product styles in OutfitList CDM: ', err);
        });

      axios.get('relatedItems/outfits')
        .then((data) => {
          this.setState({
            outfits: data.data,
            loaded: true,
          }, this.overlfow);
        })
        .catch((err) => {
          console.log('Error fetching outfit info in OutfitList CDM: ', err);
        });
    }
  }

  addOutfit() {
    const { parentStyles, parentInfo, outfits } = this.state;
    const outfitId = parentStyles.product_id;
    let idx;
    this.props.outfitClicks('addOutfit');
    outfits.forEach((outfit, i) => {
      if (outfit.styles.product_id === outfitId) {
        idx = i;
      }
    });
    if (idx >= 0) {
      console.log('Outfit already added - should show no change in outfit slides');
    } else {
      const newOutfitInfoConstructor = [
        {
          info: parentInfo,
          styles: parentStyles,
        }
      ];
      const newOutfitInfoObject = newOutfitInfoConstructor[0];

      this.setState({
        outfits: [],
      });

      axios.post('/relatedItems/outfits', newOutfitInfoObject)
        .then((data) => {
          this.setState({
            outfits: data.data,
            loaded: true,
          }, this.overflow);
        })
        .catch((err) => {
          console.log('Error posting outfit to API in OutfitList addOutfit: ', err);
        });
    }
  }

  removeOutfit(id) {
    const outfitToRemove = {
      id: id,
    }
    this.setState({
      outfits: [],
    }, () => {
      axios.delete('/relatedItems/outfits', { data: outfitToRemove })
        .then((data) => {
          if (data.data.length > 0) {
            this.setState({
              outfits: data.data,
            });
          } else {
            this.setState({
                outfits: data.data,
                loaded: false,
            });
          }
        })
        .catch((err) => {
          console.log('Error removing outfit from server in OutfitList removeOutfit: ', err);
        });
    });
  }

  scrollLeft() {
    this.setState({
      showScrollRight: true,
    });
    const car = document.getElementById('outfits');
    const remainingSpace = car.scrollWidth - car.clientWidth;
    car.scrollLeft = car.scrollLeft - 315;
    if (car.scrollLeft <= remainingSpace - 315) {
      this.setState({
        showScrollRight: false,
      });
    }
  }

  scrollRight() {
    this.setState({
      showScrollLeft: true,
    });
    const car = document.getElementById('outfits');
    const remainingSpace = car.scrollWidth - car.clientWidth;
    car.scrollLeft = car.scrollLeft + 315;
    if (car.scrollLeft >= remainingSpace - 315) {
      this.setState({
        showScrollRight: false,
      });
    }
  }

  overflow() {
    const car = document.getElementById('outfits');
    if (car) {
      const isOverflowing = car.scrollWidth > car.clientWidth;
      this.setState({
        showScrollRight: isOverflowing,
      });
    }
  }


  // NEEDS A BETTER + SIGN
  render() {
    const { outfits, showScrollLeft, showScrollRight, loaded } = this.state;
    const { updateProduct, parentId, outfitClicks } = this.props;
    return (
      <>
        {showScrollRight ? (
            <RightButtonWrap>
              <RightButton onClick={this.scrollRight} aria-label="Scroll Right">
                &#8250;
              </RightButton>
            </RightButtonWrap>
        ) : null }
        <ListWrap id="outfits">
          <CardWrap id="addOutfit" onClick={this.addOutfit} aria-label="Add to outfit list">
            <AddOutfitContent>
               + Add To Your Outfit
            </AddOutfitContent>
          </CardWrap>
          {loaded ? (
              <div>
                {outfits.map((outfit, idx) => {
                  return (
                  <OutfitSlide
                    key={idx}
                    outfit={outfit}
                    updateProduct={updateProduct}
                    removeOutfit={this.removeOutfit}
                    parentId={parentId}
                    rating={2.6}
                    outfitClicks={outfitClicks}
                  />
                  );
                })}
              </div>
            ) : null }
        </ListWrap>
        {showScrollLeft
          ? (
            <LeftButtonWrap>
              <LeftButton onClick={this.scrollLeft} aria-label="Scroll Left">
                &#8249;
              </LeftButton>
            </LeftButtonWrap>
          ) : null}
      </>
    );
  }
};

OutfitList.propTypes = {
  parentId: PropTypes.number,
  updateProduct: PropTypes.func,
  outfitClicks: PropTypes.func
}

const ListWrap = styled.div`
display: flex;
justify-content: flex-start;
overflow: scroll;
idx: relative;
height: 420px;
margin: 0px;
padding: 0px;
transitions: .5s;
scroll-behavior: smooth;
`;

const CardWrap = styled.div`
height: 400px;
width: 275px;
idx: relative;
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

const LeftButton = styled.button`
  idx: absolute;
  left: 2%;
  top: 25%;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 10;
  font-size: 40px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const LeftButtonWrap = styled.div`
  idx: absolute;
  left: 1%;
  top: 0px;
  padding-left: 60px;
  height: 89%;
  border: none;
  cursor: pointer;
  z-index: 0;
  outline: 0;
`;

const RightButton = styled.button`
  idx: absolute;
  right: 2%;
  top: 25%;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 10;
  font-size: 40px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const RightButtonWrap = styled.div`
  idx: absolute;
  right: -1%;
  top: 0px;
  padding-left: 60px;
  height: 89%;
  border: none;
  cursor: pointer;
  z-index: 1;
  outline: 0;
`;

const BorderDiv = styled.div`
border-bottom: 2px solid grey;
align: center;
width: 90%;
margin-top: 0px;
margin-left: 5%;
margin-right: 5%;
idx: relative;
bottom: 0px;
`;

const AddOutfitContent = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 3px;
  background: rgba(255,255,255,0.1);
  box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
  &:hover {
    background: linear-gradient(180deg, hsl(190,45%,95%), hsl(240,60%,100%));
  }
`;

export default OutfitList;
