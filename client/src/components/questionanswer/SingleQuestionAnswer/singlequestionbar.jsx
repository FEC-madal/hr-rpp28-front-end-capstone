import React from 'react';
import axios from 'axios';

class SingleQuestionBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    }

  }

  handleHelpful = event => {
    axios.put(`http://localhost:3000/qa/questions/${this.state.question.question_id}/helpful`)
    .then((response) => {
      // console.log('helpful question clicked, sent to server, returned with', response);
      console.log('SingleQuestionBar helpful clicked, sent to server, returned with', response.data);
      this.props.refresh();
    })
    .catch((err) => {
      // console.log('error in the return of reporting question helpful', err);
    })
  }

  render () {
    return (
      <div>

          <span key={1} className='qa_qtext'>Q: {this.state.question.question_body}</span>
          <span key={2}>    Helpful?    </span>
          <span key={3} onClick={this.handleHelpful.bind(this)}>Yes({this.state.question.question_helpfulness}) </span>
          <span key={4} onClick={this.props.AModalHandler}>| add answer </span>

      </div>
    )
  }
}

export default SingleQuestionBar;