import React from 'react';
import ReactDOM from 'react-dom';
import Stars from './starsrating.jsx';
import Chars from './reviews-add-characteristics.jsx';
import ReviewPhotos from './reviews-add-photos.jsx';
import axios from 'axios';


class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      rating: 0,
      summary: '',
      body: '',
      recommend: [],
      name: '',
      email: '',
      photos: [],
      characteristics: {},
      reviewBodyRemaining: 50,
    };
    //this.binds go here
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chosenStars = this.chosenStars.bind(this);
    this.reviewBodyRemaining = this.reviewBodyRemaining.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.onChange = this.onChange.bind(this);
    this.characteristics = this.characteristics.bind(this);
    this.postReview = this.postReview.bind(this);
  }
  //functions should go here

  openModal() {
    let modal = document.getElementById("addReview");
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.getElementById("addReview");
    modal.style.display = "none";
  }

  onChange(event) {
    const target = event.target;
    let value = target.value;
    if (value === 'true') {
      value = true;
    }
    if (value === 'false') {
      value = false;
    }
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  chosenStars(stars) {
    this.setState({
      rating: stars
    });
  }

  characteristics(ratings) {
    const currentChars = this.state.characteristics;
    const updatedChars = Object.assign(currentChars, ratings);

    this.setState({
      characteristics: updatedChars
    });
  }

  uploadPhotos(photos) {
    this.setState({
      photos: photos
    });
  }

//I need a chars object sent over

  reviewBodyRemaining() {
    let totalChar = event.target.value.length;
    let body = event.target.value
    let min = 50;
    let remaining = (min - totalChar);
    this.setState({
      reviewBodyRemaining: remaining,
      body: body
    });
  }


  postReview(event) {

    if (this.state.rating === 0) {
      alert('You must enter the following: Overall Star Rating');
      event.preventDefault();
    } else if (this.state.body.length === 0 || this.state.body.length < 50 ) {
      alert('You must enter the following: Your review body must have more than 50 characters')
      event.preventDefault();
    } else if ((Object.keys(this.state.characteristics).length) !== Object.keys(this.props.chars).length) {
      alert('You must enter the following: Characteristics buttons')
      event.preventDefault();
    } else {
      delete this.state.reviewBodyRemaining
      axios({
        method: 'post',
        url: 'reviews/postreview',
        data: this.state
      })
        .then((response) => {
        });

    }
    event.preventDefault();
    //axios call with the post request
    // return a post successful alert and then close the window
  }



  render() {
    return(
      <span>
        <input type="button" className="morebutton" id="myBtn" onClick={this.openModal} value="Add A Review +"/>
        <div id="addReview" className="modal">
          <div className="modal-content-addReview">
            <span className="close-addReview" onClick={this.closeModal}>&times;</span>
            <form id="post" onSubmit={this.postReview}>
              <h1>Write your Review</h1>
              <p>About the {this.props.productName}</p>
              <p>Required fields are followed by <strong><abbr title="required">*</abbr></strong>.</p>
              <section>
                <h2>User Information</h2>
                <p>
                  <label htmlFor="name">
                    <span>Nick Name: </span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                  <input type="text" id="name" name="name" maxLength="60" onChange={this.onChange} placeholder="Example: jackson11!" required/>
                </p>
                <p>
                  <label htmlFor="mail">
                    <span>E-mail: </span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                  <input type="email" id="mail" name="email" maxLength="60" onChange={this.onChange} placeholder="Example: jackson11@email.com" required/>
                </p>
                <p>For authentication reasons, you will not be emailed</p>
              </section>
              <section>
                <h2>Overall Ratings</h2>
                {/* Revist to make sure I can do the stars this way */}
                <div>
                  <label htmlFor="stars">
                    <span>Star Review </span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                    <Stars starpicker={this.chosenStars} rating={this.state.rating}/>
                    <p className={(this.state.rating === 1) ? "star-definition" : "star-definition-hidden" }>Poor</p>
                    <p className={(this.state.rating === 2) ? "star-definition" : "star-definition-hidden" }>Fair</p>
                    <p className={(this.state.rating === 3) ? "star-definition" : "star-definition-hidden" }>Average</p>
                    <p className={(this.state.rating === 4) ? "star-definition" : "star-definition-hidden" }>Good</p>
                    <p className={(this.state.rating === 5) ? "star-definition" : "star-definition-hidden" }>Great</p>

                </div>
                <p>
                  <label htmlFor="recommend">
                    <span>Do you recommend this product?</span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                  <label htmlFor="yes">
                    <span>Yes</span>
                  </label>
                  <input type="radio" id="yes" name="recommend" value={true} onChange={this.onChange} required/>
                  <label htmlFor="no">
                    <span>No</span>
                  </label>
                  <input type="radio" id="no" name="recommend" value={false} onChange={this.onChange}/>
                </p>
              </section>
              <section>
                <h2>Characteristics</h2>
                <div>
                  <Chars chars={this.props.chars} updateChars={this.characteristics}/>
                </div>
              </section>
              <section>
                <h2>Review</h2>
                {/* Revist to make sure I can do the stars this way */}
                <p>
                  <label htmlFor="summary">
                    <span>Review Summary</span>
                  </label>
                  <input type="text" id="summary" name="summary" placeholder="Example: Best purchase ever!" maxLength="60"  onChange={this.onChange}/>
                </p>
                <p>
                  <label htmlFor="body">
                    <span>Review Body</span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                    <textarea id="body" name="body" rows="5" cols="50" placeholder="Why did you like the product or not?" maxLength="1000" onChange={this.reviewBodyRemaining} required></textarea>
                </p>
                <p className={this.state.reviewBodyRemaining > 0 ? null : "product-hidden"}>Minimum required characters left: {this.state.reviewBodyRemaining}</p>
                <p className={this.state.reviewBodyRemaining <= 0 ? null :  "product-hidden"}>Minimum reached</p>
              </section>
            </form>
            <ReviewPhotos uploadPhotos={this.uploadPhotos}/>
            <input type="submit" value="Submit" form="post" onSubmit={this.postReview}></input>
          </div>
        </div>
      </span>

    )
  }
}

export default AddReview;