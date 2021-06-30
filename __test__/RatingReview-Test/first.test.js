import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { debug } from 'webpack';
import RatingsReviews from '../../client/src/components/reviews/reviews-list';
import Breakdown from '../../client/src/components/reviews/breakdown';
import IRT from '../../client/src/components/reviews/reviews-irt';
import MoreReviews from '../../client/src/components/reviews/morereviews';
import ReviewBody from '../../client/src/components/reviews/review-body';
import ReviewPhotos from '../../client/src/components/reviews/reviewphotos';
import StarRating from '../../client/src/components/reviews/starsrating';
import Breakdownnum from '../../client/src/components/reviews/breakdown-number.jsx';
import Breakdownproduct from '../../client/src/components/reviews/breakdown-product.jsx';
import Breakdownrating from '../../client/src/components/reviews/breakdown-rating.jsx';
import Chars from '../../client/src/components/reviews/reviews-add-characteristics.jsx';
import Addreview from '../../client/src/components/reviews/reviews-add.jsx';
import Sort from '../../client/src/components/reviews/reviews-sorted.jsx';
import Reviews from '../../client/src/components/reviews/reviews.jsx';
import Meta from './meta-mockdata.js'
import ReviewMock from './reviews-mockdata.js'


// ********************  TEST INITIALIZATION BEGIN  ********************

require("babel-polyfill");

describe('Renders the review componenet', () => {

  test('renders reviews component', () => {
    render(<Reviews />);
  });

});

describe('Renders the breakdown component', () => {

  test('renders reviews component', () => {
    render(<Breakdown starSort={() => {}} rating={Meta.ratings} recommendations={Meta.recommended} totalRatings={4} characteristics={Meta.characteristics} starFilter={[]} />);
  });

  test('should render the average component', () => {
    render(<Breakdownnum ratings={Meta.ratings} recommendations={Meta.recommended} />)
    expect(screen.getByText(/% of reviews recommend this product/)).toBeInTheDocument();

  });



});


// describe('Renders the reviewlist component', () => {

//   test('renders reviews component', () => {
//     render(<RatingsReviews starSort={() => {}} rating={Meta.ratings} recommendations={Meta.recommended} totalRatings={4} characteristics={Meta.characteristics} starFilter={[]} />);
//   });
// });
