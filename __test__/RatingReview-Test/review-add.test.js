import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { debug } from 'webpack';
import Chars from '../../client/src/components/reviews/reviews-add-characteristics.jsx';
import Addreview from '../../client/src/components/reviews/reviews-add.jsx';
import Addphoto from '../../client/src/components/reviews/reviews-add-photos.jsx';
import Meta from './meta-mockdata.js'
import ReviewMock from './reviews-mockdata.js'


// ********************  TEST INITIALIZATION BEGIN  ********************

require("babel-polyfill");

describe('Renders the addreview componenet', () => {

  test('renders addreview component', () => {
    render(<Addreview product_id={Meta.product_id} chars={Meta.characteristics} productName={"onsie"}/>);
  });

});

describe('Renders the characteristics componenet', () => {

  test('renders characteristics component', () => {
    render(<Chars chars={Meta.characteristics} updateChars={() => {}}/>);
    expect(screen.getByText(/Size/)).toBeInTheDocument();
  });
});

describe('Renders the characteristics componenet', () => {

  test('renders characteristics component', () => {
    render(<Addphoto uploadPhotos={() => {}}/>);
  });
});