import React from 'react';
import {shallow} from 'enzyme';
import RelatedItemsModule from '../client/src/components/relatedItems/relatedItemsModule.jsx';

test('Text inside RelatedItems', () => {

  const wrapper = shallow(<RelatedItemsModule/>);

  expect(wrapper.text()).toEqual('This is the Related Items Module<RelatedItemsList />This is the Outfit items list<OutfitItemsList />');

});