import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getNotifications from '../../actions/notifications';
import NotificationsFeed from '../../components/NotificationsFeed/NotificationsFeed';
import { stateFetchedArray } from '../../utils/types';

export class NotificationsFeedContainer extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getNotifications();
  }

  render() {
    const { notifications } = this.props;
    return (
      <NotificationsFeed
        notifications={notifications}
      />
    );
  }
}

const { func, shape } = PropTypes;

NotificationsFeedContainer.propTypes = {
  actions: shape({
    getNotifications: func.isRequired,
  }).isRequired,
  notifications: stateFetchedArray.isRequired,
};


function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getNotifications,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsFeedContainer);
