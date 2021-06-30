import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { debug } from 'webpack';
import RatingsReviews from '../../client/src/components/reviews/reviews-list';
import IRT from '../../client/src/components/reviews/reviews-irt';
import ReviewBody from '../../client/src/components/reviews/review-body';
import ReviewPhotos from '../../client/src/components/reviews/reviewphotos';
import StarRating from '../../client/src/components/reviews/starsrating';
import Sort from '../../client/src/components/reviews/reviews-sorted.jsx';
import Reviews from '../../client/src/components/reviews/reviews.jsx';
import Meta from './meta-mockdata.js'
import ReviewMock from './reviews-mockdata.js'


// ********************  TEST INITIALIZATION BEGIN  ********************

require("babel-polyfill");

describe('Renders the review componenet', () => {

  test('renders reviews component', () => {
    render(<Reviews reviews={ReviewMock.results} totalRatings={4} sortedReviews={() => {}} product_id={ReviewMock.product} chars={Meta.characteristics} productName={"onsie"} getReviews={() => {}} allReviews={ReviewMock.results}/>);
  });
});


describe('Renders the reviewphotos componenet', () => {

  test('renders reviewsphotos component', () => {
    render(<ReviewPhotos photos={[]}/>);
  });
});

describe('Renders the review body componenet', () => {

  test('renders review body component', () => {
    render(<ReviewBody body={ReviewMock.results[0].body}/>);
    expect(screen.getByText(/Show More/)).toBeInTheDocument();
  });
});


describe('Renders the review IRT componenet', () => {

  test('renders reviews IRT component', () => {
    render(<IRT review={ReviewMock.results[0]} getReviews={() => {}}/>);
    expect(screen.getByText(/Report/)).toBeInTheDocument();
  });
});


describe('Renders the sorted componenet', () => {

  test('renders sorted component', () => {
    render(<Sort totalRatings={4} reviews={ReviewMock.results} allReviews={ReviewMock.results} relevant={ReviewMock.results} sortedReviews={() => {}}/>);
    expect(screen.getByText(/Relevant/)).toBeInTheDocument();
  });

  test('renders sorted component', () => {
    render(<Sort totalRatings={4} reviews={ReviewMock.results} allReviews={ReviewMock.results} relevant={ReviewMock.results} sortedReviews={() => {}}/>);
    expect(screen.getByText(/Newest/)).toBeInTheDocument();
  });

  test('renders sorted component', () => {
    render(<Sort totalRatings={4} reviews={ReviewMock.results} allReviews={ReviewMock.results} relevant={ReviewMock.results} sortedReviews={() => {}}/>);
    expect(screen.getByText(/Helpful/)).toBeInTheDocument();
  });
});


