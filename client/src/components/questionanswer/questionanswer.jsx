import React from 'react';
import axios from 'axios';
import {AddQuestionModal, QuestionModalType2} from './QAModals/addquestionmodal.jsx';
import SearchQuestionBar from './SearchQuestionBar/searchquestionbar.jsx';
import SingleQuestionAnswer from './SingleQuestionAnswer/singlequestionanswer.jsx';




function AdditionalQuestionBar(props) {

  let moreAnsweredQuestions = moreAnsweredQuestions = <input type='button' value='More Answered Questions' onClick={props.moreAnsweredQuestions}></input>;

  // console.log('total: ', props.totallength);
  // console.log('default: ', props.defaultlength);

  if (props.totallength <= props.defaultlength) {
    moreAnsweredQuestions = <p>No More Questions to Show</p>

  }

  var boxStyle = {
    height: '80px',
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

      console.log('reloadQuestionAnswer being called as a this.props.refresh() for ', this.state.product_id);
      //this.forceUpdate();

    })
    .catch(err => {
      //console.log('error in loadup', err);
      this.setState({
        product_id: '22122',
      });
    });

  }

  componentDidMount() {
   // console.log('props', this.props.currentProduct.id);

    // this is equivalent to http://.../?product_id=xxxxx
    axios.get(`http://localhost:3000/qa/questions/`, {params: {product_id: this.props.currentProduct}})
      .then((response) => {
        //console.log('this is the axios data upon load up', response.data);
        this.setState({
          product_id: this.props.currentProduct,
          questions: response.data,
          sortedQuestionList: response.data,
        });

        //console.log('this.state.questions: ', this.state.questions);
      })
      .catch(err => {
        // console.log('error in loadup', err);

        // if axious fails load up a default product.
        this.setState({
          product_id: '22122',
        });
      });

  }

  showQModalHandler() {
    // console.log('passed event handler clicked for show Question Modal Window!');
    // console.log('passing this into props', this.state.showQModal);
    this.setState({showQModal: !this.state.showQModal});
    console.log('load more questions called');
  }

  loadMoreQuestions() {
    this.setState({defaultlength: this.state.defaultlength + 2 });
    
  }

  render () {
    
    
    // boolean value to determine if we showLoadMoreQuestionButton
    let showLoadMoreQuestionButton = (this.state.questions.length > this.state.defaultlength);

    let questionlist = this.state.sortedQuestionList.results.slice(0, this.state.defaultlength).map((question) => {
      return <tr key={question.question_id + 'tr'}><SingleQuestionAnswer question={question} key={question.question_id} refresh={this.reloadQuestionAnswer.bind(this)} productName={this.props.productName}/></tr>});


    // let questionlist = this.state.questions.results.slice(0, this.state.defaultlength).map((question) => {
    //   return <tr><td><SingleQuestionAnswer question={question} key={question.question_id} reloadQuestionAnswer={this.reloadQuestionAnswer.bind(this)}/></td></tr>
    // });

    var styleOBJ = {
      height:'40vw', 
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

{/* 
          <tr key={12}>
            <td>
              <AdditionalQuestionBar totallength={this.state.questions.results.length} defaultlength={this.state.defaultlength} addQuestionButton={this.showQModalHandler.bind(this)} moreAnsweredQuestions={this.loadMoreQuestions.bind(this)}/>
            </td>
          </tr> */}

          {/* <tr key={13}>
              <td>
                {AddQuestionModal show={this.state.showQModal} key={this.state.showQModal} currentProduct={this.props.currentProduct}/>}
                <QuestionModalType2 currentProduct={this.props.currentProduct}/>
              </td>
          </tr> */}
    </div>
    )
  }
}

export default QuestionAnswer;



// class AdditionalQuestionBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {

//     return (
//       <div>
//         This is the Additional Question Bar!!
//         <form name='additional'>
//           <input type='button' value='More Answered Questions' onClick={this.props.moreAnsweredQuestions}>
//           </input>
//           <input type='button' value='Add a Question +' onClick={this.props.show}>
//           </input>
//         </form>
//       </div>
//     )
//   }
// }

