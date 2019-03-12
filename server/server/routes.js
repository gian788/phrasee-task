/* eslint-disable global-require */
module.exports = (app) => {
  app.use('/notifications/', require('./api/notifications'));
};
