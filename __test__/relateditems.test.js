import React from 'react';
import {shallow} from 'enzyme';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { debug } from 'webpack';
import RelatedMain from '../client/src/components/relatedItems/RelatedMain.jsx';
import RelatedItemsList from '../client/src/components/relatedItems/RelatedItemsList.jsx';
import RelatedItemSlide from '../client/src/components/relatedItems/RelatedItemSlide.jsx';
import OutfitList from '../client/src/components/relatedItems/OutfitList.jsx';
import OutfitSlide from '../client/src/components/relatedItems/OutfitSlide.jsx';
import Modal from '../client/src/components/relatedItems/Modal.jsx';

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

// mock.onGet('http://localhost:3000/qa/questions/').reply(200, listQuestions);
//mock.onGet('http://localhost:3000/qa/answers/').reply(200, answersPerQuestion);

mock.onPut().reply(200, {});

// May need a beforeEach func

describe('Unit Test Section: <RelatedMain>', () => {

  test('Unit Test 0:  Test to ensure basic test functions are working', () => {
    expect(1).toEqual(1);
  });

  test('Unit Test 1:  Does the component <RelatedMain/> render?', () => {
    render(<RelatedMain
      productId={22122}
      relatedItems={[]}
      ratings={{}}
      updateProduct={() => {}}
    />);

    let RelatedItemsTitle = screen.getByText('Related items you may also like');
    expect(RelatedItemsTitle).toBeInTheDocument();

    let OutfitListTitle = screen.getByText('Your Outfit');
    expect(OutfitListTitle).toBeInTheDocument();
  });
});

describe('Unit Test Section: <RelatedItemsList>', () => {
  test('Unit Test 2:  Does the component <RelatedItemsList/> render?', () => {
    render(<RelatedItemsList
      productId={22122}
      relatedItems={[]}
      ratings={{}}
      updateProduct={() => {}}
    />);
  });
});

describe('Unit Test Section: <RelatedItemSlide>', () => {
  test('Unit Test 3:  Does the component <RelatedItemSlide/> render?', () => {
    render(<RelatedItemSlide
      key={22122}
      productId={22122}
      parentId={22134}
      parentInfo={{}}
      updateProduct={() => {}}
      rating={2}
    />);
  });
});

describe('Unit Test Section: <OutfitList>', () => {
  test('Unit Test 4:  Does the component <OutfitList> render?', () => {
    render(<OutfitList
      parentId={22122}
      updateProduct={() => {}}
    />);
  });
});

describe('Unit Test Section: <OutfitSlide>', () => {
  test('Unit Test 5:  Does the component <OutfitSlide> render?', () => {
    render(<OutfitSlide
      key={22122}
      outfit={{}}
      updateProduct={() => {}}
      removeOutfit={() => {}}
      parentId={12345}
      rating={2.6}
    />);
  });
});

// describe('Unit Test Section <Modal>', () => {
//   test('Unit Test 6: Does the component <Modal> render?', () => {
//     render(<Modal

//     />);
//   });
// });
