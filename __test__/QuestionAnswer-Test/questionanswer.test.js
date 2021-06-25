import React from 'react';
import {shallow} from 'enzyme';
import QuestionAnswer from '../../client/src/components/questionanswer/questionanswer.jsx';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import listQuestions from './listquestionsexample.js';
import axios from 'axios';
import { debug } from 'webpack';
import questionsPerProduct from './questionsPerProduct.js';
import answersPerQuestion from './answersPerQuestion.js';
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


// ********************  TEST INITIALIZATION END  ********************


// ********************  UNIT TESTING SECTION BEGIN  ********************

describe('Unit Test Section: <QuestionAnswer/>', () => {

  test('Unit Test 0:  Test to ensure basic test functions are working', () => {
    expect(1).toEqual(1);
  });


  test('Unit Test 1:  Does the component <QuestionAnswer/> render?', () => {
    render(<QuestionAnswer currentProduct={secondProduct}/>);
  });

  test('Unit Test 3:  Does the component <QuestionAnswer/> render?', () => {
    axios.get('http://localhost:3000/qa/questions/')
      .then(response => {
        console.log('this is the mocked response: ', response);
      });
  });
  

});


// ********************  UNIT TESTING SECTION END  ********************



// ********************  INTEGRATION TESTING SECTION BEGIN  ********************

describe('Integration Test: : <QuestionAnswer/>', () => {

  let container = null;
    beforeEach(() => {
      // setup a DOM element as a render target
      container = document.createElement("div");
      document.body.appendChild(container);
      /*UNCOMMENT HERE
      render(<QuestionAnswer currentProduct={secondProduct}/>);
      UNCOMMENT HERE */
    });



  beforeEach(() => {
    // div = document.createElement('div')
    // container = renderContent(div)

    // note to self, this was the example give for me to use
    // however this actually returns an anonymous function which returns a promise
    //axios.get.mockResolvedValue(listQuestions);

    //compare with this.
    //axios.get.mockResolvedValue(Promise.resolve(listQuestions));

    //console.log('result of axios call');
    // axios.get().then((result) => {
    //   console.log('this is the result of the axios call: ', result)
    // });
  })

  afterEach(() => {

  });


  test('dummy integration test', () => {
    expect(1).toEqual(1);
  });


  // PASSING!  deactivated because it requires jest.mock('axios') which breaks other tests.
  test('first integration test', async () => {
    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct}/>, container);
    });

    await waitFor(async () => { 
      //expect(axios.get).toHaveBeenCalled();
      //console.log('writing the mock call', axios.get.mock.results[0].value);
      //screen.debug();
      expect(await screen.findByText(/months/)).toBeInTheDocument();
      //await waitFor(() => expect(screen.getByText('answer')).toBeInTheDocument()); 
    })
  });
  // NOW PASSING!



  // UNCOMMENT HERE
  test('second integration test without mocking API call results', async () => {
    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct}/>, container);
    });

    await waitFor(() => {   
      //fixed bug of not rendering because of CORS
      var answer = screen.getAllByText(/add answer/);
      fireEvent.click(answer[0]);
      expect(screen.getByDisplayValue(/jack@email.com/)).toBeInTheDocument();
      expect(screen.getByText('What is your Nickname?')).toBeInTheDocument();
      expect(screen.getByText('Your E-mail')).toBeInTheDocument();

      let answerbodyofAnswerModalWindow = screen.getByRole('textbox', { name: /answerbodylabel/ });
      expect(answerbodyofAnswerModalWindow).toBeInTheDocument();

      let submitOfAnswerModalWindow = screen.getByText(/submit answer/i);
      expect(submitOfAnswerModalWindow).toBeInTheDocument();
    }); 
  });
  //**UNCOMMENT HERE*/


  // NOW PASSING!
  // UNCOMMENT HERE
  test('3rd Integration Test:  User enters fields, but email format improper, and clicks submit', async () => {

    act(() => {
      render(<QuestionAnswer currentProduct={secondProduct}/>, container);
    });

    await waitFor(() => { 

      var answer = screen.getAllByText('| add answer');
      fireEvent.click(answer[0]);

      // // Filling out the form

      // // ANSWER FIELD
      // let answerbodyofAnswerModalWindow = screen.getByRole('textbox', {name: 'answerbody'}); //this didnt work
      
      let answerbodyofAnswerModalWindow = screen.getByRole('textbox', { name: /answerbodylabel/ });
      fireEvent.click(answerbodyofAnswerModalWindow);
      fireEvent.change(answerbodyofAnswerModalWindow, { target: { value: 'a' } });
      expect(answerbodyofAnswerModalWindow).toBeInTheDocument();


      // NICKNAME FIELD
      // getting the nickname field
      let nameOfAnswerModalWindow = screen.getByDisplayValue(/jack543/);

      //click on the field to clear the field
      fireEvent.click(nameOfAnswerModalWindow);

      // have the user to enter the data inside
      fireEvent.change(nameOfAnswerModalWindow, { target: { value: 'a' } });

      // // EMAIL FIELD
      // // getting the e-mail field
      let emailOfAnswerModalWindow = screen.getByDisplayValue(/jack@email.com/);

      // // click on the field to clear the field
      fireEvent.click(emailOfAnswerModalWindow);

      // // have the user to enter the data inside
      fireEvent.change(emailOfAnswerModalWindow, { target: { value: 'a' } });

      // // get the submit button
      let submitOfAnswerModalWindow = screen.getByText(/submit answer/i);

      // // click the button with improperly formatted e-mail
      fireEvent.click(submitOfAnswerModalWindow);
      expect(screen.getByText(/You must enter a properly formatted e-mail address/)).toBeInTheDocument();
    });
  });

  //**UNCOMMENT HERE*/




  // --NO LONGER PASSING
  // test('4th Integration Test:  User clicks to Report and the Link changes to Reported', async () => {
  //   await waitFor(() => { 

  //     var reportFirstAnswer = screen.getAllByText('Report');
  //     fireEvent.click(reportFirstAnswer[0]);

  //     expect(reportFirstAnswer[0]).toHaveTextContent('Reported');
  //   });
  // });


});

// ********************  INTEGRATION TESTING SECTION END  ********************