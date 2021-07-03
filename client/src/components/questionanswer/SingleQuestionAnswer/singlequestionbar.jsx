import React from 'react';
import axios from 'axios';
import {AnswerModalType2, AddAnswerModal} from '../QAModals/addanswermodal.jsx';


class SingleQuestionBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      userClickedHelpful: false,
    }

  }

  handleHelpful = event => {
    if (!this.state.userClickedHelpful) {

      axios.put(`http://localhost:3000/qa/questions/${this.state.question.question_id}/helpful`)
      .then((response) => {
        this.props.refresh();
        this.setState({userClickedHelpful: true});
      })
      .catch((err) => {
        console.log('error in the return of reporting question helpful', err);
      })

    }
  }

  render () {
    
    return (
      <div>

          <span key={1} className='qa_qtext'>Q: {this.state.question.question_body}</span>

          <span className="qa_barright">
            <span marginright='20px' key={2}>    Helpful?    </span>
            <span marginright='20px' key={3} onClick={this.handleHelpful.bind(this)}>  Yes({this.props.question.question_helpfulness}) </span>
            <AnswerModalType2 question_id={this.props.question.question_id} product_name={'passed in data:'} question_body={this.props.question.question_body} productName={this.props.productName}/>
          </span>
          
          {/* <span key={4} onClick={this.props.AModalHandler}>| add answer </span> */}

      </div>
    )
  }
}

export default SingleQuestionBar;