import React from 'react';
import ReactDOM from 'react-dom';


class Characteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: {}
    };
    //this.binds go here
    this.onChange = this.onChange.bind(this);
  }

  //functions will go here

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    let id = this.props.chars[name].id
    let item = {[id]: value};
    this.setState({
      characteristics: item
    });
    console.log('this is the current state: ', this.state);
  }



  render() {
    return(
        <table className="add-review">
          <tbody>
            <tr className={this.props.chars.Size ? null : "product-hidden"}>
              <th colSpan="2">Size</th>
            </tr>
            <tr className={this.props.chars.Size ? null : "product-hidden"}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr onChange={this.onChange} className={this.props.chars.Size ? null : "product-hidden"}>
              <td><label htmlFor="size1"><input type="radio" id="size1" name="Size" value="1"/></label></td>
              <td><label htmlFor="size2"><input type="radio" id="size2" name="Size" value="2"/></label></td>
              <td><label htmlFor="size3"><input type="radio" id="size3" name="Size" value="3"/></label></td>
              <td><label htmlFor="size4"><input type="radio" id="size4" name="Size" value="4"/></label></td>
              <td><label htmlFor="size5"><input type="radio" id="size5" name="Size" value="5"/></label></td>
            </tr>
            <tr className={this.props.chars.Size ? null : "product-hidden"}>
              <td>A size too small</td>
              <td>1/2 too big</td>
              <td>Perfect</td>
              <td>A little too big</td>
              <td>Way too big</td>
            </tr>
            <tr className={this.props.chars.Width ? null : "product-hidden"}>
              <th colSpan="2">Width</th>
            </tr>
            <tr className={this.props.chars.Width ? null : "product-hidden"}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr onChange={this.onChange} className={this.props.chars.Width ? null : "product-hidden"}>
              <td><label htmlFor="width1"><input type="radio" id="width1" name="Width" value="1"/></label></td>
              <td><label htmlFor="width2"><input type="radio" id="width2" name="Width" value="2"/></label></td>
              <td><label htmlFor="width3"><input type="radio" id="width3" name="Width" value="3"/></label></td>
              <td><label htmlFor="width4"><input type="radio" id="width4" name="Width" value="4"/></label></td>
              <td><label htmlFor="width5"><input type="radio" id="width5" name="Width" value="5"/></label></td>
            </tr>
            <tr className={this.props.chars.Width ? null : "product-hidden"}>
              <td>Too narrow</td>
              <td>Slightly narrow</td>
              <td>Perfect</td>
              <td>Slightly wide</td>
              <td>Too wide</td>
            </tr>
            <tr className={this.props.chars.Comfort ? null : "product-hidden"}>
              <th colSpan="2">Comfort</th>
            </tr>
            <tr className={this.props.chars.Comfort ? null : "product-hidden"}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr onChange={this.onChange} className={this.props.chars.Comfort ? null : "product-hidden"}>
              <td><label htmlFor="comfort1"><input type="radio" id="comfort1" name="Comfort" value="1"/></label></td>
              <td><label htmlFor="comfort2"><input type="radio" id="comfort2" name="Comfort" value="2"/></label></td>
              <td><label htmlFor="comfort3"><input type="radio" id="comfort3" name="Comfort" value="3"/></label></td>
              <td><label htmlFor="comfort4"><input type="radio" id="comfort4" name="Comfort" value="4"/></label></td>
              <td><label htmlFor="comfort5"><input type="radio" id="comfort5" name="Comfort" value="5"/></label></td>
            </tr>
            <tr className={this.props.chars.Comfort ? null : "product-hidden"}>
              <td>Uncomfortable</td>
              <td>Slightly uncomfortable</td>
              <td>Ok</td>
              <td>Comfortable</td>
              <td>Perfect</td>
            </tr>
            <tr className={this.props.chars.Quality ? null : "product-hidden"}>
              <th colSpan="2">Quality</th>
            </tr>
            <tr className={this.props.chars.Quality ? null : "product-hidden"}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr onChange={this.onChange} className={this.props.chars.Quality ? null : "product-hidden"}>
              <td><label htmlFor="quality1"><input type="radio" id="quality1" name="Quality" value="1"/></label></td>
              <td><label htmlFor="quality2"><input type="radio" id="quality2" name="Quality" value="2"/></label></td>
              <td><label htmlFor="quality3"><input type="radio" id="quality3" name="Quality" value="3"/></label></td>
              <td><label htmlFor="quality4"><input type="radio" id="quality4" name="Quality" value="4"/></label></td>
              <td><label htmlFor="quality5"><input type="radio" id="quality5" name="Quality" value="5"/></label></td>
            </tr>
            <tr className={this.props.chars.Quality ? null : "product-hidden"}>
              <td>Poor</td>
              <td>Below Average</td>
              <td>What I expected</td>
              <td>Pretty great</td>
              <td>Perfect</td>
            </tr>
            <tr className={this.props.chars.Length ? null : "product-hidden"}>
              <th colSpan="2">Length</th>
            </tr>
            <tr className={this.props.chars.Length ? null : "product-hidden"}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr onChange={this.onChange} className={this.props.chars.Length ? null : "product-hidden"}>
              <td><label htmlFor="length1"><input type="radio" id="length1" name="Length" value="1"/></label></td>
              <td><label htmlFor="length2"><input type="radio" id="length2" name="Length" value="2"/></label></td>
              <td><label htmlFor="length3"><input type="radio" id="length3" name="Length" value="3"/></label></td>
              <td><label htmlFor="length4"><input type="radio" id="length4" name="Length" value="4"/></label></td>
              <td><label htmlFor="length5"><input type="radio" id="length5" name="Length" value="5"/></label></td>
            </tr>
            <tr className={this.props.chars.Length ? null : "product-hidden"}>
              <td>Runs short</td>
              <td>Runs slightly short</td>
              <td>Perfect</td>
              <td>Runs slighlty long</td>
              <td>Runs long</td>
            </tr>
            <tr className={this.props.chars.Fit ? null : "product-hidden"}>
              <th colSpan="2">Fit</th>
            </tr>
            <tr className={this.props.chars.Fit ? null : "product-hidden"}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr onChange={this.onChange} className={this.props.chars.Fit ? null : "product-hidden"}>
              <td><label htmlFor="fit1"><input type="radio" id="fit1" name="fit" value="1"/></label></td>
              <td><label htmlFor="fit2"><input type="radio" id="fit2" name="fit" value="2"/></label></td>
              <td><label htmlFor="fit3"><input type="radio" id="fit3" name="fit" value="3"/></label></td>
              <td><label htmlFor="fit4"><input type="radio" id="fit4" name="fit" value="4"/></label></td>
              <td><label htmlFor="fit5"><input type="radio" id="fit5" name="fit" value="5"/></label></td>
            </tr>
            <tr className={this.props.chars.Fit ? null : "product-hidden"}>
              <td>Runs tight</td>
              <td>Runs slightly tight</td>
              <td>Perfect</td>
              <td>Runs slighlty long</td>
              <td>Runs long</td>
            </tr>
          </tbody>
        </table>

    )
  }
}

export default Characteristics;


// characteristics: {
//   "id something": "number",
//   "id something": "number",
// }