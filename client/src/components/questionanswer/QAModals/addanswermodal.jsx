import React from "react";
import axios from 'axios';
import Photobar from '../Photobar/photobar.jsx';



class SubmitPhotoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: this.props.show}
  }

  render() {

    if (!this.state.show) {
      return null;
    }

    // changed enctype to encType based on warning.  was working with enctype
    return (
      <form method='POST' action='http://127.0.0.1:3000/qa/uploadphoto' encType='multipart/form-data'>
        <label htmlFor='answerpic'>Upload your photos!</label><br></br>
        <input type="file" name='answerpic' onChange={this.props.onChangeHandler} multiple></input>
        <input type="submit" value='Submit Photo'></input>
      </form>
    )
  }
}


class UploadPhotos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      max: 5,
      showUploadForm: true,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }


  onChangeHandler (e) {
    // console.log('photo load handler fired');
    // console.log(e.target.files);

    var formData = new FormData();

    formData.append("answerpic", e.target.files[0]);
    axios.post('http://localhost:3000/qa/uploadphoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
      // console.log('returned hyperlink', response.data)
      let newarray = this.state.photos;
      newarray.push(response.data);

      // max photos can be 5 before the button disappears
      if (this.state.photos.length < 5) {
        this.setState({photos: newarray});
      } else {
        this.setState({showUploadForm: false});
      }
    });
  }

  render() {

    return (
      <div>
        <Photobar photos={this.state.photos}/>
        <SubmitPhotoForm show={this.state.showUploadForm} key={this.state.showUploadForm} onChangeHandler={this.onChangeHandler.bind(this)}/>
      </div>
    )
  }
}





class AddAnswerModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      qid: this.props.qid,
      nickname: 'Example: jack543!',
      email: 'Example: jack@email.com',
      answerbody: '',
      validated: false,
      firstclicknickname: true,
      firstclickemail: true,
      show: this.props.show,
      nicknameIsInvalid: false,
      emailIsInvalid: false,
      answerbodyIsInvalid: false,
      emailFormatValid: true,
    };
  }

  closeButtonHandler (e) {
    //close the window when the button is clicked
    this.setState({show: false});
  }


  checkInput() {

    this.setState({
      nicknameIsInvalid: !this.state.nickname,
      emailIsInvalid: !this.state.email,
      answerbodyIsInvalid: !this.state.answerbody,
    });


    let validateTest = this.state.nickname && this.state.email && this.state.answerbody;

    if (validateTest) {
      const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

      let emailtest = false;
      if (this.state.email.match(regex)) {
        emailtest = true;
      }

      validateTest = validateTest && emailtest;
      this.setState({emailFormatValid: emailtest});
    }

    return validateTest;

    //this.setState({validated : validateTest});
  }


  submitHandler(e) {
    e.preventDefault();

    // all validations must pass
    if (this.checkInput()) {
      axios.post(`http://localhost:3000/qa/questions/${this.state.qid}/answers`, {
        nickname: this.state.nickname,
        email: this.state.email,
        answerbody: this.state.answerbody
      })
      .then((response) => {
        //console.log('answer submitted returned with', response.data);
        this.props.closeModal();

      })
      .catch((err) => {
        //console.log('error in submitting answer', err);
      })
    }
    else {
      //console.log('error data not validated');
    }
  }


  changeHandler(e) {
     this.setState({[e.target.name]: e.target.value});
     // console.log(`change handler fired! value: ${e.target.value}`);

  }

  clickHandlerNickname(e) {
    if (this.state.firstclicknickname) {
      this.setState({
        nickname: '',
        firstclicknickname: false
      });
    }
  }

  clickHandlerEmail(e) {
    if (this.state.firstclickemail) {
      this.setState({
        email: '',
        firstclickemail: false
      });
    }
  }

  render() {

    if (!this.state.show) {
      return null;
    }

    let alertstyle = {
      color: 'red',
    };

    let emailAlertMessage = <div></div>

    if (!this.state.emailFormatValid) {
      emailAlertMessage = <div style={alertstyle}>You must enter a properly formatted e-mail address</div>
    }

    // no email message takes priority over improperly formatted email address
    if (this.state.emailIsInvalid) {
      emailAlertMessage = <div style={alertstyle}>You must enter an e-mail address</div>
    }

    return (
        <div className='qa_modal' >

          <div className='modal-content-a'>

            <div className='modal-header-a'>
              <div className='modal-title-a'>Submit your answer: </div> <br></br>
              <div>{this.props.productName} : {this.props.question_body} </div>
            </div>
            <br></br>

            <div className='modal-body-a'>

              <form className='SubmitAnswer' onSubmit={this.submitHandler.bind(this)}>
                <div>your answer </div>

                {this.state.answerbodyIsInvalid ?  <div style={alertstyle}>You must enter an answer</div> : <div></div>}

                <textarea aria-label="textarea" rows='10' cols='50' name='answerbody' onChange={this.changeHandler.bind(this)}>
                </textarea>

                <div>What is your Nickname? </div>

                {this.state.nicknameIsInvalid ?  <div style={alertstyle}>You must enter a Nickname</div> : <div></div>}

                <input type='text' onClick={this.clickHandlerNickname.bind(this)} maxLength='60' name='nickname' value={this.state.nickname}onChange={this.changeHandler.bind(this)}></input>
                <br></br>

                <div>Your E-mail</div>

                {emailAlertMessage}

                <input type='text' onClick={this.clickHandlerEmail.bind(this)} maxLength='60' name='email' value={this.state.email} onChange={this.changeHandler.bind(this)}></input>
                <br></br>
                <br></br>
                <input type='submit' value='submit answer'></input>

            </form>
            <br></br>
            </div>

            <div className='uploadphoto'>
              <UploadPhotos/>
            </div>

          </div>
        </div>
    )
  }
}





class AnswerModalType2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 0,
      body: '',
      name: '',
      email: '',
      photos: [],
      characteristics: {},
      reviewBodyRemaining: 50,
      uniqueDivID: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }


  openModal() {
    let modal = document.getElementById(this.state.uniqueDivID);
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.getElementById(this.state.uniqueDivID);
    modal.style.display = "none";
  }

  componentDidMount() {

    let newUniqueID = "add_a" + this.props.question_id.toString();

    this.setState({uniqueDivID: newUniqueID});

  }



  render() {

    //console.log('call: ', this.props.question_id);

    let newUniqueID = "add_a" + this.props.question_id.toString();
  
    return(
      <div className="qa_inline">
        <div className="qa_inline" onClick={this.openModal}>|<u>Add Answer</u> </div>
        <div id={newUniqueID} className="modal">
          <div className="modal-content-addAnswer">
            <span className="close-addAnswer" onClick={this.closeModal}>&times;</span>

              <AddAnswerModal qid={this.props.question_id} show={true} closeModal={this.closeModal} key={this.state.showAModal} productName={this.props.productName} question_body={this.props.question_body}/>
            
          </div>
        </div>
      </div>

    )
  }
}


export {AnswerModalType2, AddAnswerModal}



/* this is the original call of addanswermodal */
/* {<AddAnswerModal qid={this.state.question_id} show={this.state.showAModal} key={this.state.showAModal} product_name={'passed in data:'} question_body={this.props.question.question_body}/>} */


