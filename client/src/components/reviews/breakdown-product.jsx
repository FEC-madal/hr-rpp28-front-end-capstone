import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const Product = (props) => {
  let characteristics = props.characteristics;
  let comfort;
  let quality;
  let size;
  let width;
  let fit;

  for (let key in characteristics) {
    if (key === 'Comfort') {
      comfort = Number(characteristics[key].value).toFixed(1);
    }
    if (key === 'Quality') {
      quality = Number(characteristics[key].value).toFixed(1);
    }
    if (key === 'Size') {
      size = Number(characteristics[key].value).toFixed(1);
    }
    if (key === 'Width') {
      width = Number(characteristics[key].value).toFixed(1);
    }
    if (key === 'Fit') {
      fit = Number(characteristics[key].value).toFixed(1);
    }
  }



  return (
    <div className="reviews-product-chars">
      <div className={size ? null : "product-hidden"}>
        <div>Size</div>
        <div><input type="range" id="size" name="size"
          min="1" max="5" value={size} readOnly={true}></input></div>
          <div id="textbox">
            <p className="alignleft">Too small</p>
            <p className="aligncenter">Perfect</p>
            <p className="alignright">Too large</p>
          </div>
      </div>

      <div className={width ? null : "product-hidden"}>
        <div>Width</div>
        <div><input type="range" id="width" name="width"
          min="1" max="5" value={width} readOnly={true}></input></div>
          <div id="textbox">
            <p className="alignleft">Too narrow</p>
            <p className="aligncenter">Perfect</p>
            <p className="alignright">Too wide</p>
          </div>
      </div>

      <div className={comfort ? null : "product-hidden"}>
        <div>Comfort</div>
        <div>
          <input type="range" id="comfort" name="comfort"
          min="1" max="5" value={comfort} readOnly={true}></input></div>
          <div id="textbox">
            <p className="alignleft">Uncomfortable</p>
            <p className="aligncenter">Ok</p>
            <p className="alignright">Perfect</p>
          </div>
      </div>

      <div className={quality ? null : "product-hidden"}>
        <div>Quality</div>
        <div><input type="range" id="quality" name="quality"
          min="1" max="5" value={quality} readOnly={true}></input></div>
          <div id="textbox">
            <p className="alignleft">Poor</p>
            <p className="aligncenter">What I expected</p>
            <p className="alignright">Perfect</p>
          </div>
      </div>

      <div className={length ? null : "product-hidden"}>
        <div>Length</div>
        <div><input type="range" id="length" name="length"
          min="1" max="5" value={length} readOnly={true}></input></div>
          <div id="textbox">
            <p className="alignleft">Runs short</p>
            <p className="aligncenter">Perfect</p>
            <p className="alignright">Runs long</p>
          </div>
      </div>

      <div className={fit ? null : "product-hidden"}>
        <div>Fit</div>
        <div><input type="range" id="fit" name="fit"
          min="1" max="5" value={fit} readOnly={true}></input></div>
          <div id="textbox">
            <p className="alignleft">Runs tight</p>
            <p className="aligncenter">Perfect</p>
            <p className="alignright">Runs long</p>
          </div>
      </div>

    </div>
  )
};

export default Product;