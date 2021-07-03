import React from 'react';
import axios from 'axios';
import {AddQuestionModal, QuestionModalType2} from './QAModals/addquestionmodal.jsx';
import SearchQuestionBar from './SearchQuestionBar/searchquestionbar.jsx';
import SingleQuestionAnswer from './SingleQuestionAnswer/singlequestionanswer.jsx';



function AdditionalQuestionBar(props) {

  let moreAnsweredQuestions = moreAnsweredQuestions = <input type='button' value='More Answered Questions' onClick={props.moreAnsweredQuestions}></input>;

  if (props.totallength <= props.defaultlength) {
    moreAnsweredQuestions = <p>No More Questions to Show</p>

  }

  var boxStyle = {
    //this style controls the padding for the More Answered Questions Window
    height: '40px',
    padding: '20px',
  }

  return (
    <div style={boxStyle}>
      <div className="qa_buttonwrapper" >
        <div onClick={props.moreAnsweredQuestions}>
              MORE ANSWERED QUESTIONS
        </div>
        <div>
          <QuestionModalType2 currentProduct={props.currentProduct}/>
        </div>
      </div>
    </div>
  )
}


class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: { results: []},
      product_id: '',
      showQModal: false,
      defaultlength: 4,
      searchTerm: '', // represents the current search term
      sortedQuestionList: { results: []}, // sorted question list is a reduced question list size that is rendered based on the search bar
    }
  }


  sortBySearch(searchTerm) {

    // if the search term is blank, we end early, not reducing the search at all.
    // .match automatically turns a string into a regex

    if ((searchTerm === '') || (!searchTerm)) {
      this.setState({sortedQuestionList : this.state.questions});
    } else {

      let listLimitBySearch = [];

      for (var i = 0; i < this.state.questions.results.length; i++) {
        let answers = JSON.stringify(this.state.questions.results[i].answers);

        if ((this.state.questions.results[i].question_body).match(searchTerm) ||
            (this.state.questions.results[i].question_date).match(searchTerm) ||
            (this.state.questions.results[i].asker_name).match(searchTerm) ||
            (answers.match(searchTerm))) {
              //only push in if there is a regex match of the search term
              listLimitBySearch.push(this.state.questions.results[i]);
            }
      }
      //once we create the reduced list, we setState and render off the reduced list
      this.setState({sortedQuestionList: {
        searchTerm: searchTerm,
        product_id: this.state.product_id,
        results: listLimitBySearch,}
      });
    }
  }

  reloadQuestionAnswer() {
    axios.get(`http://localhost:3000/qa/questions/`, {params: {product_id: this.props.currentProduct}})
    .then((response) => {
      this.setState({
        product_id: response.data.product_id,
        questions: response.data,
        sortedQuestionList: response.data,
      });
    })
    .catch(err => {
      console.log('error in reloadQuestionAnswer of questionanswer');
    });
  }

  componentDidMount() {
    // this is equivalent to http://.../?product_id=xxxxx
    axios.get(`http://localhost:3000/qa/questions/`, {params: {product_id: this.props.currentProduct}})
      .then((response) => {
        //console.log('this is the axios data upon load up', response.data);
        this.setState({
          product_id: this.props.currentProduct,
          questions: response.data,
          sortedQuestionList: response.data,
        });

      })
      .catch(err => {
        console.log('error in componentdidmount of questionanswer');
      });

  }

  showQModalHandler() {
    this.setState({showQModal: !this.state.showQModal});
  }

  loadMoreQuestions() {
    this.setState({defaultlength: this.state.defaultlength + 2 });
  }

  render () {
    
    let questionlist = this.state.sortedQuestionList.results.slice(0, this.state.defaultlength).map((question) => {
      return <tr key={question.question_id + 'tr'}><SingleQuestionAnswer question={question} key={question.question_id} refresh={this.reloadQuestionAnswer.bind(this)} productName={this.props.productName}/></tr>});

    // let questionlist = this.state.questions.results.slice(0, this.state.defaultlength).map((question) => {
    //   return <tr><td><SingleQuestionAnswer question={question} key={question.question_id} reloadQuestionAnswer={this.reloadQuestionAnswer.bind(this)}/></td></tr>
    // });

    var styleOBJ = {
      //this used to control the windowspace of additional question load
      //height:'40vw', 
      overflow:'auto',
      width: '90vw',
      border: '1px solid black',
    };

    return (
      <div> 
        <div className="sticky"><SearchQuestionBar sortBySearch={this.sortBySearch.bind(this)}/></div>
        <div style={styleOBJ}>
          <table className='qa_mastertable'>
            <thead>
                <tr key={11}>
                  <th align='left'>      
                  </th>
                </tr>
            </thead>
            <tbody>
            {questionlist}
            </tbody>
          </table>
        </div>
        <AdditionalQuestionBar currentProduct={this.props.currentProduct} totallength={this.state.questions.results.length} defaultlength={this.state.defaultlength} addQuestionButton={this.showQModalHandler.bind(this)} moreAnsweredQuestions={this.loadMoreQuestions.bind(this)}/>
    </div>
    )
  }
}

export {QuestionAnswer, AdditionalQuestionBar};



