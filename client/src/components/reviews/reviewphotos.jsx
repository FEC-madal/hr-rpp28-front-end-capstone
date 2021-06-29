import React from 'react';
import ReactDOM from 'react-dom';


class ReviewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photos: []
    }
    //this.bind here
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
   }
//functions here
  openModal(event) {

    let modal = document.getElementById("myModal");
    let img = event;
    let modalImg = document.getElementById("img01");

    modal.style.display = "block";
    modalImg.src = img;
  }

  closeModal() {
    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }


  render() {
    let allPhotos = this.props.photos
    let photos = allPhotos.map((item, index) => {
      return (
        <li key={index}><img id="myImg" src={item.url} onClick={() => {this.openModal(event.target.src)}} alt="this is a blown up version of the photo"></img>
          <div id="myModal" className="modal">
            <span className="close" onClick={this.closeModal}>&times;</span>
            <img className="modal-content" id="img01" alt="this is a blown up version of the photo"></img>
            <div id="caption"></div>
          </div>


        </li>

      )
    })
    return(
      <ul>{photos}</ul>

    );
  }
}

export default ReviewPhotos;






// const ReviewPhotos = (props) => {
//   const photoArray = props.photos;
//   const photos = photoArray.map((item, index) => {
//     return (
//       <div key={index} className="thumbnail" style={{backgroundImage: `url(${item.url})`}}></div>
//     )
//   });


//   return (
//     <span>
//       {photos}
//     </span>

//   )
// };

// export default ReviewPhotos;