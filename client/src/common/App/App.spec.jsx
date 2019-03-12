import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import NotificationsFeed from '../../containers/NotificationsFeed/NotificationsFeed.container';


describe('App', () => {
  it('render "Container"', () => {
    const tree = shallow(<App />);
    expect(tree.find(NotificationsFeed).length).toEqual(1);
  });
});
