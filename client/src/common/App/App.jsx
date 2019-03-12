import { hot } from 'react-hot-loader';
import React from 'react';
import NotificationsFeed from '../../containers/NotificationsFeed/NotificationsFeed.container';
import './App.css';


export function App() {
  return (
    <div>
      <NotificationsFeed />
    </div>
  );
}

export default hot(module)(App);
