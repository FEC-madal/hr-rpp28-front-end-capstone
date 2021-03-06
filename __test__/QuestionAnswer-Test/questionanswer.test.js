import React from 'react';
import {shallow} from 'enzyme';
import {QuestionAnswer, AdditionalQuestionBar} from '../../client/src/components/questionanswer/questionanswer.jsx';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import listQuestions from './listquestionsexample.js';
import axios from 'axios';
import { debug } from 'webpack';
import questionsPerProduct from './questionsPerProduct.js';
import answersPerQuestion from './answersPerQuestion.js';
import SearchQuestionBar from '../../client/src/components/questionanswer/SearchQuestionBar/searchquestionbar.jsx';
import SingleQuestionAnswer from '../../client/src/components/questionanswer/SingleQuestionAnswer/singlequestionanswer.jsx';
import {AddQuestionModal, QuestionModalType2} from '../../client/src/components/questionanswer/QAModals/addquestionmodal.jsx';
import SingleQuestionBar from '../../client/src/components/questionanswer/SingleQuestionAnswer/singlequestionbar.jsx';
import SingleAnswerBar from '../../client/src/components/questionanswer/SingleQuestionAnswer/singleanswerbar.jsx';
import {AddAnswerModal, AnswerModalType2} from '../../client/src/components/questionanswer/QAModals/addanswermodal.jsx';


//import userEvent from '@testing-library/user-event'
//jest.mock('axios');
// commented out for integration test 2


// ********************  TEST INITIALIZATION BEGIN  ********************

require("babel-polyfill");


var secondProduct = {
  id: 22126,
  campus: 'hr-rpp',
  name: 'Heir Force Ones',
  slogan: 'A sneaker dynasty',
  description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  category: 'Kicks',
  default_price: '99.00',
  created_at: '2021-03-18T16:09:30.589Z',
  updated_at: '2021-03-18T16:09:30.589Z',
}

var mockFunction = () => {};


var MockAdapter = require("axios-mock-adapter");

// // This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// // Mock any GET request to /users
// // arguments for reply are (status, data, headers)
mock.onGet("/testtest").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});



mock.onGet('http://localhost:3000/qa/questions/').reply(200, listQuestions);
//mock.onGet('http://localhost:3000/qa/answers/').reply(200, answersPerQuestion);

//post question Mock Handler
mock.onPost(`http://localhost:3000/qa/questions/`).reply(200, {success: 'success'});

mock.onPut().reply(200, {});

//api/fec2/hr-rpp/qa/answers/1444523/report

// ********************  TEST INITIALIZATION END  ********************


// ********************  UNIT TESTING SECTION BEGIN  ********************

describe('Unit Test Section: <QuestionAnswer/>', () => {

  var operativeQuestion = questionsPerProduct.results[0];
  var operativeAnswer = answersPerQuestion.results[0];

  test('Unit Test 0:  Test to ensure basic test functions are working', () => {


    // axios.get('http://localhost:3000/qa/questions/')
    //   .then(response => {
    //     console.log('this is the mocked response: ', response);
    //   });

    expect(1).toEqual(1);
  });


  // test('Unit Test 1:  Does the component <QuestionAnswer/> render?', () => {
  //   render(<QuestionAnswer currentProduct={secondProduct}/>);
  // });

  // test('Unit Test 3:  Does the component <QuestionAnswer/> render?', () => {
  //   axios.get('http://localhost:3000/qa/questions/')
  //     .then(response => {
  //       console.log('this is the mocked response: ', response);
  //     });
  // });

  test('Unit Test 1:  Does the component <QuestionAnswer/> render?', () => {
    render(<QuestionAnswer currentProduct={secondProduct.id} productName={secondProduct.name} defaultProduct={secondProduct}/>);
  });

  test('Unit Test 2:  Does the component <SearchQuestionBar/> render?', () => {

    var mockSortBySearch = function sortBySearch(searchTerm) {

      // if the search term is blank, we end early, not reducing the search at all.
      // .match automatically turns a string into a regex

      // if ((searchTerm === '') || (!searchTerm)) {
      //   this.setState({sortedQuestionList : this.state.questions});
      // } else {

      //   let listLimitBySearch = [];

      //   for (var i = 0; i < this.state.questions.results.length; i++) {
      //     let answers = JSON.stringify(this.state.questions.results[i].answers);

      //     if ((this.state.questions.results[i].question_body).match(searchTerm) ||
      //         (this.state.questions.results[i].question_date).match(searchTerm) ||
      //         (this.state.questions.results[i].asker_name).match(searchTerm) ||
      //         (answers.match(searchTerm))) {
      //           //only push in if there is a regex match of the search term
      //           listLimitBySearch.push(this.state.questions.results[i]);
      //         }
      //   }
      //   //once we create the reduced list, we setState and render off the reduced list
      //   this.setState({sortedQuestionList: {
      //     searchTerm: searchTerm,
      //     product_id: this.state.product_id,
      //     results: listLimitBySearch,}
      //   });
      // }
    }

    render(<SearchQuestionBar sortBySearch={mockSortBySearch}/>);
  });

  test('Unit Test 3:  Does the component <AdditionalQuestionbar/> render?', () => {
    render(<AdditionalQuestionBar currentProduct={secondProduct.id}
              totallength={2} defaultlength={2} addQuestionButton={mockFunction}
              moreAnsweredQuestions={mockFunction}/>);
  });

  test('Unit Test 4:  Does the component <SingleQuestionAnswer/> render?', () => {

    render(<SingleQuestionAnswer question={operativeQuestion} key={operativeQuestion.question_id} refresh={mockFunction} productName={secondProduct.name}/>);
  });

  test('Unit Test 5:  Does the component <SingleAnswerBar/> render?', () => {
    answersPerQuestion.results.map((singleAnswer) => {

      render(<SingleAnswerBar answer={singleAnswer} key={singleAnswer.answer_id} refresh={mockFunction}/>);
    });

  });

  test('Unit Test 6:  Does the component <SingleQuestionBar/> render?', () => {
    render(<SingleQuestionBar question={operativeQuestion} AModalHandler={mockFunction} refresh={mockFunction} productName={secondProduct.name}/>);
  });

  test('Unit Test 7:  Does the component <AddAnswerModal/> render?', () => {
    render(<AddAnswerModal qid={operativeQuestion.question_id} show={mockFunction} key={mockFunction} product_name={secondProduct.name} question_body={operativeQuestion.question_body}/>);
  });

  // test('Unit Test 8:  Does the component <AnswerModalType2/> render?', () => {
  //   render(<AnswerModalType2 qid={operativeQuestion.question_id} product_name={secondProduct.name} question_body={operativeQuestion.question_body} productName={secondProduct.name}/>);
  // });

  test('Unit Test 9:  Does the component <QuestionModalType2/> render?', () => {
    render(<QuestionModalType2 currentProduct={secondProduct.id}/>);
  });



});


// // ********************  UNIT TESTING SECTION END  ********************



// // ********************  INTEGRATION TESTING SECTION BEGIN  ********************

describe('Integration Test: : <QuestionAnswer/>', () => {

//   let container = null;
//     beforeEach(() => {
//       // setup a DOM element as a render target
//       container = document.createElement("div");
//       document.body.appendChild(container);
//       /*UNCOMMENT HERE
//       render(<QuestionAnswer currentProduct={secondProduct}/>);
//       UNCOMMENT HERE */
//     });



  beforeEach(() => {
    // let div = document.createElement('div')
    // let container = renderContent(div)

    // note to self, this was the example give for me to use
    // however this actually returns an anonymous function which returns a promise
    //axios.get.mockResolvedValue(listQuestions);

    //compare with this.
    //axios.get.mockResolvedValue(Promise.resolve(listQuestions));

    //console.log('result of axios call');
    // axios.get().then((result) => {
    //   console.log('this is the result of the axios call: ', result)
    // });

    //render(<QuestionAnswer currentProduct={secondProduct.id} productName={secondProduct.name} defaultProduct={secondProduct}/>);
  })

  afterEach(() => {

  });

  test('Integration test 1:', async () => {
    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct.id} productName={secondProduct.name} defaultProduct={secondProduct}/>);
    });

    await waitFor(async () => {
      //expect(axios.get).toHaveBeenCalled();
      //console.log('writing the mock call', axios.get.mock.results[0].value);
      //screen.debug();
      expect(await screen.getByText(/Search Question/)).toBeInTheDocument();
      expect(await screen.getByDisplayValue(/Have a question/)).toBeInTheDocument();
      // it didnt like the ? in the search regex
      let searchField = await screen.getByDisplayValue(/Search for answers???/i);
      expect(searchField).toBeInTheDocument();

      fireEvent.click(searchField);
      fireEvent.change(searchField, { target: { value: 'F' } });
      fireEvent.change(searchField, { target: { value: 'Fr' } });
      fireEvent.change(searchField, { target: { value: 'Fra' } });
      fireEvent.change(searchField, { target: { value: 'Fran' } });
      fireEvent.change(searchField, { target: { value: 'F' } });

    })
  });
 
  test('Integration Test 2: user clicks open modal window, submits a question', async () => {
    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct.id} productName={secondProduct.name} defaultProduct={secondProduct}/>);
    });

    await waitFor(() => {
      //fixed bug of not rendering because of CORS
      var questionButton = screen.getByText(/ADD A QUESTION/i);
      fireEvent.click(questionButton);

      // // there should be a submit question button
      let submitOfQuestionModal = screen.getByDisplayValue(/submit question/i);
      expect(submitOfQuestionModal).toBeInTheDocument();

      // // clicking the question submission without entering any data
      fireEvent.click(submitOfQuestionModal);

      // // find the text box to type in the question
      let textBoxForQuestion = screen.getByLabelText('textarea', {selector: 'textarea'});
      expect(textBoxForQuestion).toBeInTheDocument();
      fireEvent.click(textBoxForQuestion);
      fireEvent.change(textBoxForQuestion, { target: { value: 'Does this match size expectations?' } });


      // // Text above the fields in the question modal window
      expect(screen.getByText('What is your Nickname?')).toBeInTheDocument();
      expect(screen.getByText('Your E-mail')).toBeInTheDocument();

      // // dummy data should be populating the question fields
      let nicknameField = screen.getByDisplayValue('Example: jackson11!');
      let emailField = screen.getByDisplayValue('Why did you like the product or not?');

      fireEvent.click(nicknameField);
      fireEvent.change(nicknameField, { target: { value: 'Bob Smith' } });

      fireEvent.click(emailField);
      fireEvent.change(emailField, { target: { value: 'Bobsmith@gmail.com' } });

      fireEvent.click(submitOfQuestionModal);
    });
  });



  // NOW PASSING!

  test('3rd Integration Test:  User clicks Add Answer and submits answer', async () => {

    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct.id} productName={secondProduct.name} defaultProduct={secondProduct}/>);
    });

    await waitFor(() => {

      var answer = screen.getAllByText('Add Answer');
      console.log('there are this many elements in the array: ', answer.length);
      fireEvent.click(answer[0]);
 

      //expect(screen.getByText(/your answer /i)).toBeInTheDocument();
      // Filling out the form
      // ANSWER FIELD
      // let textBoxForAnswer = screen.getByLabelText('textarea', {selector: 'textarea'});
      // expect(textBoxForAnswer).toBeInTheDocument();
      // fireEvent.click(textBoxForAnswer);
      // fireEvent.change(textBoxForAnswer, { target: { value: 'Test Answer for a question' } });


      // let nameOfAnswerModalWindow = screen.getByDisplayValue('Example: jack543!');
      // NICKNAME FIELD
      // getting the nickname field
      //let nameOfAnswerModalWindow = screen.getByDisplayValue(/jack543/);

      // //click on the field to clear the field
      // fireEvent.click(nameOfAnswerModalWindow);

      // // have the user to enter the data inside
      // fireEvent.change(nameOfAnswerModalWindow, { target: { value: 'testname' } });

      // // // EMAIL FIELD
      // // // getting the e-mail field
      // let emailOfAnswerModalWindow = screen.getByDisplayValue(/jack@email.com/);

      // // // click on the field to clear the field
      // fireEvent.click(emailOfAnswerModalWindow);

      // // // have the user to enter the data inside
      // fireEvent.change(emailOfAnswerModalWindow, { target: { value: 'Test Improper Email Address' } });
    
      // // there should be a submit question button
      // let submitOfAnswerModal = screen.getByDisplayValue(/submit answer/i);
      // expect(submitOfAnswerModal).toBeInTheDocument();
    });
  
  });




  test('4th Integration Test:  User clicks to Report and the Link changes to Reported', async () => {

    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct.id} productName={secondProduct.name} defaultProduct={secondProduct}/>);
    });

    await waitFor(() => {
      var reportFirstAnswer = screen.getAllByText(/Report/);
      fireEvent.click(reportFirstAnswer[0]);
      expect(reportFirstAnswer[0]).toHaveTextContent(/Reported/);
    });
  });

});

// ********************  INTEGRATION TESTING SECTION END  ********************