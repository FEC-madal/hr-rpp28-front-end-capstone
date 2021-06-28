import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const Modal = (props) => {
  const { parentName, compareName, compareFeatures } = props;

  const closeWindow = (e) => {
    e.stopPropagation();
    props.close();
  };

  return (
    <ModalWrap className="modal" onClick={closeWindow}>
      <div className="modal_content" onClick={(e) => e.stop()}>
        <CloseWindowButton className="close" onClick={closeWindow}>&times;</CloseWindowButton>
      </div>
      <ModalContent>
        <ModuleTitle>Comparing</ModuleTitle>
        <CompareTitle>
          <ProductTitle>{parentName}</ProductTitle><br />
          <ProductTitle>{compareName}</ProductTitle><br />
        </CompareTitle>
        <CompareWrapper>
          {compareFeatures.map((feature, idx) => {
            if (feature) {
              if (feature[0] === '') {
                const outputFeature = feature.substring(1, feature.length - 1);
                return <CompareDiv key={idx}>{outputFeature}</CompareDiv>;
              }
              return <CompareDiv key={idx}>{feature}</CompareDiv>;
            }
            return <CompareDiv key={idx}>{feature}</CompareDiv>;
          })}
        </CompareWrapper>
      </ModalContent>
    </ModalWrap>
  );
};

// Modal.propTypes = {
//   parentName: PropTypes.string,
//   compareName: PropTypes.string,
//   compareFeatures: PropTypes.array,
//   close: PropTypes.func
// };

const CompareWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 30px;
  overflow: auto;
  justify-items: center;
  position: relative;
  z-index: 150;
`;

const CompareTitle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows:
  justify-items: center;
  align-items: center;
  font-size: 15px;
  background-color: white;
  margin-bottom: 10px;
`;

const CompareDiv = styled.div`
  text-align: center;
  font-size: 17px;
`;

const ModalContent = styled.div`
background-color: white;
width: 75%;
max-width: 600px;
height: 35%;
margin: auto;
justify-content: center;
align-items: center;
padding: 10px;
border: 1px solid black;
overflow: auto;
`;

const ModalWrap = styled.div`
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
background: rgba(0,0,0,0.55);
z-index: 1;
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
overflow: auto;
padding-top: 80px;
font-size: calc(10px + 2vmin);
color: black;
z-index: 150;
backdrop-filter: blur(8px) contrast(70%);
`;

const CloseWindowButton = styled.span`
  color: #aaaaaa;
  position: relative;
  float: right;
  font-size: 25px;
  font-weight: bold;
`;

const ProductTitle = styled.div`
  text-align: center;
  font-size: 17px;
  border-bottom: 1px solid grey;
  margin-bottom: 13px;
  font-weight: bold;
`;

const ModuleTitle = styled.div`
text-align: center;
font-size: 20px;
margin-bottom: 13px;
font-weight: bold;
`;

export default Modal;