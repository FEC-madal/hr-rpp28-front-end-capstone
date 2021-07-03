import React from 'react';
import axios from 'axios';


class AddQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: 'Example: jackson11!',
      email: 'Why did you like the product or not?',
      question: '',
      validated: false,
      firstclicknickname: true,
      firstclickemail: true,
      show: this.props.show,
      nicknameIsInvalid: false,
      emailIsInvalid: false,
      questionbodyIsInvalid: false,
      emailFormatValid: true,
    };
  }

  closeButtonHandler (e) {
    // close the window when the button is clicked
    this.setState({show: false});
  }

  checkInput() {


    this.setState({
      nicknameIsInvalid: !this.state.nickname,
      emailIsInvalid: !this.state.email,
      questionbodyIsInvalid: !this.state.question,
    });


    let validateTest = this.state.nickname && this.state.email && this.state.question;
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
  }


  submitHandler(e) {
    e.preventDefault();


    if (this.checkInput()) {
      axios.post(`http://localhost:3000/qa/questions/`, {
        nickname: this.state.nickname,
        email: this.state.email,
        question: this.state.question,
        product_id: this.props.currentProduct,
      })
        .then((response) => {
          console.log('question submitted returned with', response);
          this.props.closeModal();
        })
        .catch((err) => {
          console.log('error in submitting question', err);
        });
    }
    else {
      // console.log('error data not validated');
    }
  }

  changeHandler(e) {
    this.setState({[e.target.name]: e.target.value });
    // console.log(`change handler fired! value: ${e.target.value}`);
  }

  clickHandlerNickname(e) {
    if (this.state.firstclicknickname) {
      this.setState({
        nickname: '',
        firstclicknickname: false,
      });
    }
  }

  clickHandlerEmail(e) {
    if (this.state.firstclickemail) {
      this.setState({
        email: '',
        firstclickemail: false,
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
        <div className='qa_modal'>
          <div className='modal-content-q'>

            <div className='modal-header-q'>
              <div className='modal-title-q'>Ask Your Question</div> <br></br>
            </div>

            {this.state.questionbodyIsInvalid ?  <div style={alertstyle}>You must enter a question</div> : <div></div>}

            <div className='modal-body-q'>

              {/* <form className='InputQuestion' method='POST' action='http://localhost:3000/qa/questions'> */}

              <form className='InputQuestion' onSubmit={this.submitHandler.bind(this)}>
                <textarea aria-label="textarea" rows='10' cols='50' name='question' onChange={this.changeHandler.bind(this)}>
                </textarea>
                <br></br>

                <div>What is your Nickname? </div>
                {this.state.nicknameIsInvalid ?  <div style={alertstyle}>You must enter a Nickname</div> : <div></div>}

                <input type='text' onClick={this.clickHandlerNickname.bind(this)} maxLength='60' name='nickname' value={this.state.nickname}onChange={this.changeHandler.bind(this)}></input>

                <br></br>
                <div>Your E-mail</div>
                {emailAlertMessage}
                <input type='text' onClick={this.clickHandlerEmail.bind(this)} maxLength='60' name='email' value={this.state.email} onChange={this.changeHandler.bind(this)}></input>
                <br></br>
                <br></br>
                <input type='submit' value='submit question'></input>

            </form>
            </div>

            <div className='modal-footer-q'>
              <br></br>
              <button className="button_q" onClick={this.closeButtonHandler.bind(this)}>Close</button>
            </div>
          </div>
        </div>
    );
  }
}



class QuestionModalType2 extends React.Component {
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
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    let modal = document.getElementById("add_q");
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.getElementById("add_q");
    modal.style.display = "none";
  }

  render() {
    
    return(
      <span>

        <div className="qa_buttonbar" onClick={this.openModal}>
          ADD A QUESTION +
        </div> 
      

        <div id="add_q" className="modal">
          <div className="modal-content-addQuestion">
            <span className="close-addQuestion" onClick={this.closeModal}>&times;</span>
            <AddQuestionModal show={true} currentProduct={this.props.currentProduct} closeModal={this.closeModal}/> 
          </div>
        </div>
      </span>

    )
  }
}


export {QuestionModalType2, AddQuestionModal}