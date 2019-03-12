import React from 'react';
import { shallow } from 'enzyme';
import NotificationsFeed from './NotificationsFeed';
import { FULFILLED, PENDING } from '../../constants/storeObjectStatuses';

describe('<NotificationsFeed />', () => {
  it('should render an empty list when no data is loaded', () => {
    const notifications = {
      data: [],
      status: null,
    };
    const wrapper = shallow(
      <NotificationsFeed
        notifications={notifications}
      />,
    );

    expect(wrapper.find('li').length).toEqual(0);
  });

  it('should render "loading" when is fetching the feedt', () => {
    const notifications = {
      data: [],
      status: PENDING,
    };
    const wrapper = shallow(
      <NotificationsFeed
        notifications={notifications}
      />,
    );

    expect(wrapper.find('li').length).toEqual(1);
    expect(wrapper.find('li').at(0).text()).toEqual('Loading...');
  });

  it('should render the list of notifications when data is loaded', () => {
    const notifications = {
      data: [
        {
          post: { title: 'title-1' },
          count: 1,
          type: 'Comment',
          last3: [{ user: { name: 'user-1' } }],
        },
        {
          post: { title: 'title-2' },
          count: 2,
          type: 'Like',
          last3: [
            { user: { name: 'user-1' } },
            { user: { name: 'user-2' } },
          ],
        },
        {
          post: { title: 'title-3' },
          count: 4,
          type: 'Like',
          last3: [
            { user: { name: 'user-1' } },
            { user: { name: 'user-2' } },
          ],
        },
      ],
      status: FULFILLED,
    };
    const expectedText1 = 'user-1 commented your post "title-1"';
    const expectedText2 = 'user-1, user-2 liked your post "title-2"';
    const expectedText3 = 'user-1, user-2 and 2 others liked your post "title-3"';
    const wrapper = shallow(
      <NotificationsFeed
        notifications={notifications}
      />,
    );

    expect(wrapper.find('li').length).toEqual(3);
    expect(wrapper.find('li').at(0).text()).toEqual(expectedText1);
    expect(wrapper.find('li').at(1).text()).toEqual(expectedText2);
    expect(wrapper.find('li').at(2).text()).toEqual(expectedText3);
  });
});
