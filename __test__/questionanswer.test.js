import React from 'react';
import {shallow} from 'enzyme';
import QuestionAnswer from '../client/src/components/questionanswer';

test('Text inside Question Answer', () => {

  const wrapper = shallow(<QuestionAnswer />);

  expect(wrapper.text()).toEqual('This is the Question Answer Module');

});