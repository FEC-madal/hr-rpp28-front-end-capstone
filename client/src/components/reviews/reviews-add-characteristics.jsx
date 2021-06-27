import React from 'react';
import ReactDOM from 'react-dom';


class Characteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: {},
      Size: 0,
      Width: 0,
      Comfort: 0,
      Quality: 0,
      Length: 0,
      Fit: 0
    };
    //this.binds go here
    this.onChange = this.onChange.bind(this);
  }

  //functions will go here

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({
      [name]: value
    });
    let id = this.props.chars[name].id
    let charSelection = {[id]: value};
    this.setState({
      characteristics: charSelection
    });
    this.props.updateChars(this.state.characteristics)
  }



  render() {
    return(
      <div className="reviews-add-chars-container">
        <div className={this.props.chars.Size ? "reviews-add-eachchars-holder" : "product-hidden"}>
          <div><b>Size</b></div>
          <div className="reviews-add-eachchars-selection">
            <p className="reviews-add-eachchars-selection-alignleft">Current Selection</p>
            <p className={(this.state.Size === 0) ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>None Selected</p>
            <p className={(this.state.Size === "1") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>A size too small</p>
            <p className={(this.state.Size === "2") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>1/2 too big</p>
            <p className={(this.state.Size === "3") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Perfect</p>
            <p className={(this.state.Size === "4") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>A little too big</p>
            <p className={(this.state.Size === "5") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Way too big</p>
          </div>
          <div className="reviews-add-eachchars-radio" onChange={this.onChange}>
            <label htmlFor="size1"><input type="radio" id="size1" name="Size" value="1"/></label>
            <label htmlFor="size2"><input type="radio" id="size2" name="Size" value="2"/></label>
            <label htmlFor="size3"><input type="radio" id="size3" name="Size" value="3"/></label>
            <label htmlFor="size4"><input type="radio" id="size4" name="Size" value="4"/></label>
            <label htmlFor="size5"><input type="radio" id="size5" name="Size" value="5"/></label>
          </div>
          <div className="reviews-add-eachchars-text">
            <p className="reviews-add-eachchars-text-alignleft">A size too small</p>
            <p className="reviews-add-eachchars-text-alignright">Way too big</p>
          </div>
        </div>
        <div className={this.props.chars.Width ? "reviews-add-eachchars-holder" : "product-hidden"}>
          <div><b>Width</b></div>
          <div className="reviews-add-eachchars-selection">
            <p className="reviews-add-eachchars-selection-alignleft">Current Selection</p>
            <p className={(this.state.Width === 0) ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>None Selected</p>
            <p className={(this.state.Width === "1") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Too narrow</p>
            <p className={(this.state.Width === "2") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Slightly narrow</p>
            <p className={(this.state.Width === "3") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Perfect</p>
            <p className={(this.state.Width === "4") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Slightly wide</p>
            <p className={(this.state.Width === "5") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Too wide</p>
          </div>
          <div className="reviews-add-eachchars-radio" onChange={this.onChange}>
            <label htmlFor="size1"><input type="radio" id="width1" name="Width" value="1"/></label>
            <label htmlFor="size2"><input type="radio" id="width2" name="Width" value="2"/></label>
            <label htmlFor="size3"><input type="radio" id="width3" name="Width" value="3"/></label>
            <label htmlFor="size4"><input type="radio" id="width4" name="Width" value="4"/></label>
            <label htmlFor="size5"><input type="radio" id="width5" name="Width" value="5"/></label>
          </div>
          <div className="reviews-add-eachchars-text">
            <p className="reviews-add-eachchars-text-alignleft">Too narrow</p>
            <p className="reviews-add-eachchars-text-alignright">Too wide</p>
          </div>
        </div>
        <div className={this.props.chars.Comfort ? "reviews-add-eachchars-holder" : "product-hidden"}>
          <div><b>Comfort</b></div>
          <div className="reviews-add-eachchars-selection">
            <p className="reviews-add-eachchars-selection-alignleft">Current Selection</p>
            <p className={(this.state.Comfort === 0) ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>None Selected</p>
            <p className={(this.state.Comfort === "1") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Uncomfortable</p>
            <p className={(this.state.Comfort === "2") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Slightly uncomfortable</p>
            <p className={(this.state.Comfort === "3") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Ok</p>
            <p className={(this.state.Comfort === "4") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Comfortable</p>
            <p className={(this.state.Comfort === "5") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Perfect</p>
          </div>
          <div className="reviews-add-eachchars-radio" onChange={this.onChange}>
            <label htmlFor="size1"><input type="radio" id="comfort1" name="Comfort" value="1"/></label>
            <label htmlFor="size2"><input type="radio" id="comfort2" name="Comfort" value="2"/></label>
            <label htmlFor="size3"><input type="radio" id="comfort3" name="Comfort" value="3"/></label>
            <label htmlFor="size4"><input type="radio" id="comfort4" name="Comfort" value="4"/></label>
            <label htmlFor="size5"><input type="radio" id="comfort5" name="Comfort" value="5"/></label>
          </div>
          <div className="reviews-add-eachchars-text">
            <p className="reviews-add-eachchars-text-alignleft">Uncomfortable</p>
            <p className="reviews-add-eachchars-text-alignright">Perfect</p>
          </div>
        </div>
        <div className={this.props.chars.Quality ? "reviews-add-eachchars-holder" : "product-hidden"}>
          <div><b>Quality</b></div>
          <div className="reviews-add-eachchars-selection">
            <p className="reviews-add-eachchars-selection-alignleft">Current Selection</p>
            <p className={(this.state.Quality === 0) ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>None Selected</p>
            <p className={(this.state.Quality === "1") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Poor</p>
            <p className={(this.state.Quality === "2") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Below average</p>
            <p className={(this.state.Quality === "3") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>What I expected</p>
            <p className={(this.state.Quality === "4") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Pretty great</p>
            <p className={(this.state.Quality === "5") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Perfect</p>
          </div>
          <div className="reviews-add-eachchars-radio" onChange={this.onChange}>
            <label htmlFor="size1"><input type="radio" id="quality1"  name="Quality" value="1"/></label>
            <label htmlFor="size2"><input type="radio" id="quality2"  name="Quality"  value="2"/></label>
            <label htmlFor="size3"><input type="radio" id="quality3"  name="Quality"  value="3"/></label>
            <label htmlFor="size4"><input type="radio" id="quality4"  name="Quality"  value="4"/></label>
            <label htmlFor="size5"><input type="radio" id="quality5"  name="Quality"  value="5"/></label>
          </div>
          <div className="reviews-add-eachchars-text">
            <p className="reviews-add-eachchars-text-alignleft">Poor</p>
            <p className="reviews-add-eachchars-text-alignright">Perfect</p>
          </div>
        </div>
        <div className={this.props.chars.Length ? "reviews-add-eachchars-holder" : "product-hidden"}>
          <div><b>Length</b></div>
          <div className="reviews-add-eachchars-selection">
            <p className="reviews-add-eachchars-selection-alignleft">Current Selection</p>
            <p className={(this.state.Length === 0) ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>None Selected</p>
            <p className={(this.state.Length === "1") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs Short</p>
            <p className={(this.state.Length === "2") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs slightly short</p>
            <p className={(this.state.Length === "3") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Perfect</p>
            <p className={(this.state.Length === "4") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs slightly long</p>
            <p className={(this.state.Length === "5") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs Long</p>
          </div>
          <div className="reviews-add-eachchars-radio" onChange={this.onChange}>
            <label htmlFor="size1"><input type="radio" id="length1" name="Length"  value="1"/></label>
            <label htmlFor="size2"><input type="radio" id="length2" name="Length"  value="2"/></label>
            <label htmlFor="size3"><input type="radio" id="length3" name="Length"  value="3"/></label>
            <label htmlFor="size4"><input type="radio" id="length4" name="Length"  value="4"/></label>
            <label htmlFor="size5"><input type="radio" id="length5" name="Length"  value="5"/></label>
          </div>
          <div className="reviews-add-eachchars-text">
            <p className="reviews-add-eachchars-text-alignleft">Runs Short</p>
            <p className="reviews-add-eachchars-text-alignright">Runs Long</p>
          </div>
        </div>
        <div className={this.props.chars.Fit ? "reviews-add-eachchars-holder" : "product-hidden"}>
          <div><b>Fit</b></div>
          <div className="reviews-add-eachchars-selection">
            <p className="reviews-add-eachchars-selection-alignleft">Current Selection</p>
            <p className={(this.state.Fit === 0) ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>None Selected</p>
            <p className={(this.state.Fit === "1") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs tight</p>
            <p className={(this.state.Fit === "2") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs slightly tight</p>
            <p className={(this.state.Fit === "3") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Perfect</p>
            <p className={(this.state.Fit === "4") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs slightly long</p>
            <p className={(this.state.Fit === "5") ? "reviews-add-eachchars-selection-aligncenter" : "product-hidden"}>Runs long</p>
          </div>
          <div className="reviews-add-eachchars-radio" onChange={this.onChange}>
            <label htmlFor="size1"><input type="radio" id="fit1" name="Fit" value="1"/></label>
            <label htmlFor="size2"><input type="radio" id="fit2" name="Fit"  value="2"/></label>
            <label htmlFor="size3"><input type="radio" id="fit3" name="Fit"  value="3"/></label>
            <label htmlFor="size4"><input type="radio" id="fit4" name="Fit"  value="4"/></label>
            <label htmlFor="size5"><input type="radio" id="fit5" name="Fit"  value="5"/></label>
          </div>
          <div className="reviews-add-eachchars-text">
            <p className="reviews-add-eachchars-text-alignleft">Runs tight</p>
            <p className="reviews-add-eachchars-text-alignright">Runs long</p>
          </div>
        </div>
      </div>


    )
  }
}

export default Characteristics;


