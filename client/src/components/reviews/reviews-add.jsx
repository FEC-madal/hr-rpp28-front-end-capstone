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
      product_id: 0,
      rating: 0,
      summary: '',
      body: '',
      recommend: '',
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

  chosenStars(stars) {
    console.log('you chose: ', stars);
    this.setState({
      rating: stars
    });
  }

  uploadPhotos(photos) {
    this.setState({
      photos: photos
    });
    console.log('this is state: ', this.state.photos);
  }



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

  render() {
    return(
      <span>
        <button id="myBtn" onClick={this.openModal}>Add A Review +</button>
        <div id="addReview" className="modal">
          <div className="modal-content-addReview">
            <span className="close-addReview" onClick={this.closeModal}>&times;</span>
            <form>
              <h1>Write your Review</h1>
              <p>About the Product Name here</p>
              <p>Required fields are followed by <strong><abbr title="required">*</abbr></strong>.</p>
              <section>
                <h2>User Information</h2>
                <p>
                  <label htmlFor="name">
                    <span>Nick Name: </span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                  <input type="text" id="name" name="username" />
                </p>
                <p>
                  <label htmlFor="mail">
                    <span>E-mail: </span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                  <input type="email" id="mail" name="usermail" />
                </p>
              </section>
              <section>
                <h2>Overall Ratings</h2>
                {/* Revist to make sure I can do the stars this way */}
                <p>
                  <label htmlFor="stars">
                    <span>Star Review </span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                    <Stars starpicker={this.chosenStars} rating={this.state.rating} />

                </p>
                <p>
                  <label htmlFor="recommend">
                    <span>Do you recommend this product?</span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                  <label htmlFor="yes">
                    <span>Yes</span>
                  </label>
                  <input type="radio" id="yes" name="recommend" />
                  <label htmlFor="no">
                    <span>No</span>
                  </label>
                  <input type="radio" id="no" name="recommend" />
                </p>
              </section>
              <section>
                <h2>Characteristics</h2>
                <div>
                  <Chars />
                </div>
              </section>
              <section>
                <h2>Review</h2>
                {/* Revist to make sure I can do the stars this way */}
                <p>
                  <label htmlFor="summary">
                    <span>Review Summary</span>
                  </label>
                  <input type="text" id="summary" name="summary" placeholder="Example: Best purchase ever!" />
                </p>
                <p>
                  <label htmlFor="body">
                    <span>Review Body</span>
                    <strong><abbr title="required">*</abbr></strong>
                  </label>
                    <textarea id="body" name="body" rows="5" cols="50" placeholder="Why did you like the product or not?" onChange={this.reviewBodyRemaining}></textarea>
                </p>
                <p className={this.state.reviewBodyRemaining > 0 ? null : "product-hidden"}>Minimum required characters left: {this.state.reviewBodyRemaining}</p>
                <p className={this.state.reviewBodyRemaining <= 0 ? null :  "product-hidden"}>Minimum reached</p>
              </section>
            </form>
            <ReviewPhotos uploadPhotos={this.uploadPhotos}/>
            <input type="submit" value="Submit"></input>
          </div>
        </div>
      </span>

    )
  }
}

export default AddReview;