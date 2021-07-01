import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { debug } from 'webpack';
import Breakdown from '../../client/src/components/reviews/breakdown';
import Breakdownnum from '../../client/src/components/reviews/breakdown-number.jsx';
import Breakdownproduct from '../../client/src/components/reviews/breakdown-product.jsx';
import Breakdownrating from '../../client/src/components/reviews/breakdown-rating.jsx';
import Meta from './meta-mockdata.js'
import ReviewMock from './reviews-mockdata.js'




// ********************  TEST INITIALIZATION BEGIN  ********************

require("babel-polyfill");


describe('Renders the breakdown component', () => {

  test('renders reviews component', () => {
    render(<Breakdown starSort={() => {}} rating={Meta.ratings} recommendations={Meta.recommended} totalRatings={4} characteristics={Meta.characteristics} starFilter={[]} />);
  });

  test('should render the average component', () => {
    render(<Breakdownnum ratings={Meta.ratings} recommendations={Meta.recommended} />)
    expect(screen.getByText(/% of reviews recommend this product/)).toBeInTheDocument();

  });

  test('should render the breakdown ratings component', () => {
    render(<Breakdownrating ratings={Meta.ratings} totalRatings={4} starSort={() => {}} starFilter={[]}/>)
    expect(screen.getByText(/Star Filters Applied:/)).toBeInTheDocument();

  });

  test('should render the breakdown ratings component', () => {
    render(<Breakdownrating ratings={Meta.ratings} totalRatings={4} starSort={() => {}} starFilter={[]}/>)
    expect(screen.getByText(/5 Star/)).toBeInTheDocument();

  });

  test('should render the breakdown ratings component', () => {
    render(<Breakdownrating ratings={Meta.ratings} totalRatings={4} starSort={() => {}} starFilter={[]}/>)
    expect(screen.getByText(/4 Star/)).toBeInTheDocument();

  });

  test('should render the breakdown ratings component', () => {
    render(<Breakdownrating ratings={Meta.ratings} totalRatings={4} starSort={() => {}} starFilter={[]}/>)
    expect(screen.getByText(/3 Star/)).toBeInTheDocument();

  });

  test('should render the breakdown ratings component', () => {
    render(<Breakdownrating ratings={Meta.ratings} totalRatings={4} starSort={() => {}} starFilter={[]}/>)
    expect(screen.getByText(/2 Star/)).toBeInTheDocument();

  });

  test('should render the breakdown ratings component', () => {
    render(<Breakdownrating ratings={Meta.ratings} totalRatings={4} starSort={() => {}} starFilter={[]}/>)
    expect(screen.getByText(/1 Star/)).toBeInTheDocument();

  });

});