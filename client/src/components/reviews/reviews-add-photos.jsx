import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';




class ReviewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      max: 5,
      urlHolder: '',
      urlUpload: []
    }
    //this bind here
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }


  //functions here

  onChangeHandler (e) {

    var formData = new FormData();

    formData.append("reviewphoto", e.target.files[0]);
    this.setState({
      urlHolder: formData
    });
  }

  onUpload(event) {
      let formData = this.state.urlHolder
      if (formData === '') {
        event.preventDefault();
      } else {
          axios.post('/reviews/uploadphoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          })
            .then((response) => {
              let urlArray = [... this.state.urlUpload];
              urlArray.push(response.data.Location);
              this.setState({
                urlUpload: urlArray
              });
          })
            .then(() => {
              this.setState({
                urlHolder: ''
              });
              this.props.uploadPhotos(this.state.urlUpload);
          });
      }

    event.preventDefault();
  }



  render() {
    let allPhotos = this.state.urlUpload
    let photos = allPhotos.map((item, index) => {
        return (
          <li key={index}><img src={item} alt="this your uploaded photo"></img></li>
        )
      });
    return (
      <div>
          <form onSubmit={this.onUpload} encType="multipart/form-data">
                  <input type="file" accept="image/*" name="photo" onChange={this.onChangeHandler} />
                  <input className={(this.state.urlUpload.length === 5) ? "product-hidden" : null} type="submit" value="upload"/>
          </form>
          <ul>{photos}</ul>
      </div>
    )
  }
}

export default ReviewPhotos;





