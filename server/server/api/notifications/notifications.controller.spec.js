const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expected = require('./notifications-feed-aggregated-test');
const controller = require('./notifications.controller');

const { expect } = chai;
chai.use(sinonChai);

describe('Controllers::Notifications', () => {
  describe('GET /', () => {
    it('should aggregate the notifications feed', () => {
      const send = sinon.spy();
      const res = { send };
      controller.index({}, res);
      expect(send).to.have.been.calledWith(expected);
    });
  });
});
