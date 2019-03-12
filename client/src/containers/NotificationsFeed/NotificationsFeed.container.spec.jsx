import React from 'react';
import { shallow } from 'enzyme';
import NotificationsFeed from '../../components/NotificationsFeed/NotificationsFeed';
import { NotificationsFeedContainer } from './NotificationsFeed.container';

describe('<NotificationsFeedContainer />', () => {
  const notifications = {
    data: [],
    status: null,
  };
  const actions = {
    getNotifications: jest.fn(),
  };

  it('should have the right component with props', () => {
    const wrapper = shallow(
      <NotificationsFeedContainer
        notifications={notifications}
        actions={actions}
      />,
    );
    const feed = wrapper.find(NotificationsFeed);

    expect(feed.length).toEqual(1);
    expect(feed.prop('notifications')).toEqual(notifications);
    expect(actions.getNotifications).toBeCalled();
  });
});
