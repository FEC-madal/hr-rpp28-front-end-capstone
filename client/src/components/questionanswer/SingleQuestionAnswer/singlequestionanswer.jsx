import React from 'react';
import SingleAnswerBar from './singleanswerbar.jsx';
import SingleQuestionBar from './singlequestionbar.jsx';
import {AddAnswerModal, AnswerModalType2} from '../QAModals/addanswermodal.jsx';



class SingleQuestionAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      defaultlength: 2,
      showAModal: false,
      question_id: '',
    };
  }

  sortIncomingAnswers() {

    let nonSellerArray = [];
    let SellerArray = [];
    let objectOfAnswers = this.props.question.answers;
    let ArrayOfKeys = Object.keys(this.props.question.answers);

    if (ArrayOfKeys.length === 0) {
      return [];
    }

    for (var i = 0; i < ArrayOfKeys.length; i++) {


      if (!objectOfAnswers[ArrayOfKeys[i]].answerer_name) {
        // console.log('this was the length that caused the error: ', ArrayOfKeys.length);
      }

      if (objectOfAnswers[ArrayOfKeys[i]].answerer_name === "Seller") {
        SellerArray.push(objectOfAnswers[ArrayOfKeys[i]]);
      } else {
        nonSellerArray.push(objectOfAnswers[ArrayOfKeys[i]]);
      }
    }

    // sorted from highest to lowest

    nonSellerArray.sort((a, b) => b.helpfulness - a.helpfulness);
    SellerArray.sort((a, b) => b.helpfulness - a.helpfulness);

    let sortedArrayOfAnswers = [];

    // console.log('nonsellerarray: ', nonSellerArray);
    // console.log('Sellerarray: ', SellerArray);

    sortedArrayOfAnswers = SellerArray.concat(nonSellerArray);
    // console.log('final array length: ', sortedArrayOfAnswers.length);

    return sortedArrayOfAnswers;
  }

  componentDidMount() {
    //let sortedArrayOfAnswers = this.sortIncomingAnswers();

    this.setState({
      answers: this.props.question.answers,
      question_id: this.props.question.question_id,
    });

  }

  showAModalHandler() {
    // console.log('Event handler clicked for Show Modal Answer Window!');
    // console.log('passing this into props', this.state.showAModal);
    this.setState({showAModal: !this.state.showAModal});
  }


  loadMoreAnswers() {
    this.setState({ defaultlength: (this.state.defaultlength + 2) });
    // console.log('load more answers event handler triggered!', this.state.defaultlength);
  }

  render() {

    let sortedAnswers = this.sortIncomingAnswers();

    let answerBars = sortedAnswers.slice(0, this.state.defaultlength).map(key => {
      if (key.answerer_name === 'Seller') {
        return <div className='Seller' key={key.id+'div'}>⍟⍟★★Seller's Response★★⍟⍟ <SingleAnswerBar answer={key} key={key.id} refresh={this.props.refresh}/></div>
      } else {
        return <SingleAnswerBar answer={key} key={key.id} refresh={this.props.refresh}/>
      }
    });

    let seeMoreAnswers =  <div onClick={this.loadMoreAnswers.bind(this)}> See more answers </div>

    if (Object.keys(this.props.question.answers).length <= this.state.defaultlength) {
      seeMoreAnswers = null;
    }

    // let answerBars = Object.keys(this.props.question.answers).slice(0, this.state.defaultlength).map(key =>
    //   <tr><SingleAnswerBar answer = {this.props.question.answers[key]} reloadQuestionAnswer={this.props.reloadQuestionAnswer}/></tr>);

    
    return (
      <td>
        <br></br>
        <div className='singlequestionbar'>
        <SingleQuestionBar question={this.props.question} AModalHandler={this.showAModalHandler.bind(this)} refresh={this.props.refresh} productName={this.props.productName}/>
        </div>
        {answerBars}
          {seeMoreAnswers}
            {<AddAnswerModal qid={this.state.question_id} show={this.state.showAModal} key={this.state.showAModal} product_name={'passed in data:'} question_body={this.props.question.question_body}/>}
      </td>
    )
  }
}

export default SingleQuestionAnswer;

//Note to self:
// in the questions get response, for each question there is a field called answers.
// the answers field in the question object is an object of objects.
