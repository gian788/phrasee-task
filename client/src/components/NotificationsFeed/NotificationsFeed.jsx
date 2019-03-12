import React from 'react';
import { PENDING, REJECTED } from '../../constants/storeObjectStatuses';
import { stateFetchedArray } from '../../utils/types';
import './NotificationsFeed.css';


function getUserImageUrl(userId) {
  return `http://localhost:3010/users/${userId}/image?size=100x100`;
}

// TODO: handle users without name
function getUsersNames(notification) {
  const { count, last3 } = notification;
  const names = last3.map(el => el.user.name).filter(name => name !== '').slice(0, 2);
  if (!names.length) {
    return `${count} user${count > 1 ? 's' : ''}`;
  }

  return names.join(', ') + (count - names.length ? ` and ${count - names.length} others` : '');
}

function buildNotificationElement(notification) {
  const {
    post,
    type,
    last3,
  } = notification;
  let actionName;
  if (type === 'Like') {
    actionName = 'liked';
  } else if (type === 'Comment') {
    actionName = 'commented';
  }
  return (
    <li key={`${post.id}-${type}`} className="notification-element">
      <span className="notification-element-img-container">
        <span
          style={{ background: `url(${getUserImageUrl(last3[0].user.id)})` }}
          className="notification-element-img"
        />
      </span>
      <div className="notification-element-text">
        <span className="notification-element-text-user-name">
          {getUsersNames(notification)}
        </span>
        &nbsp;
        {actionName}
        &nbsp;
        <b>your post</b>
        &nbsp;
        <span>
          &quot;
          {post.title}
          &quot;
        </span>
      </div>
    </li>
  );
}


export class NotificationsFeed extends React.Component {
  constructor() {
    super();
    this.buildStatus = this.buildStatus.bind(this);
    this.buildList = this.buildList.bind(this);
  }

  buildStatus() {
    const { notifications: { status } } = this.props;
    if (status === PENDING) {
      return (<li>Loading...</li>);
    }
    if (status === REJECTED) {
      return (<li>Ops! An error occured!</li>);
    }
    return '';
  }

  buildList() {
    const { notifications: { data } } = this.props;
    return (
      <ul className="notification-list">
        {data.map(buildNotificationElement)}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.buildStatus()}
        {this.buildList()}
      </div>
    );
  }
}


NotificationsFeed.propTypes = {
  notifications: stateFetchedArray.isRequired,
};

export default NotificationsFeed;
