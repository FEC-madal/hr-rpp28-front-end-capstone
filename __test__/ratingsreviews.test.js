import React from 'react';
import {shallow} from 'enzyme';
import RatingsReviews from '../client/src/components/reviews/ratingsreviews';

test('Text inside Ratingsreviews', () => {

  const wrapper = shallow(<RatingsReviews/>);

  expect(wrapper.text()).toEqual('sort will go here<IRT />MORE REVIEWS');

});