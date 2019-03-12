import Logger from './Logger';

describe('Utils::Logger', () => {
  describe('console', () => {
    it('should log to console', () => {
      expect.assertions(2);
      const arg1 = 'foo';
      const arg2 = 'bar';

      const logger = new Logger({
        console: {
          log: (actualArg1, actualArg2) => {
            expect(actualArg1).toEqual(actualArg1);
            expect(actualArg2).toEqual(actualArg2);
          },
        },
      });
      logger.log(arg1, arg2);
    });

    it('should error to console', () => {
      expect.assertions(2);
      const arg1 = 'foo';
      const arg2 = 'bar';
      const logger = new Logger({
        console: {
          error: (actualArg1, actualArg2) => {
            expect(actualArg1).toEqual(actualArg1);
            expect(actualArg2).toEqual(actualArg2);
          },
        },
      });
      logger.error(arg1, arg2);
    });
  });

  describe('disable', () => {
    it('should not log', () => {
      expect.assertions(1);
      const mockConsole = {
        log: () => {
          throw new Error('logged, but shouldn\'t have!');
        },
      };
      const logger = new Logger({ console: mockConsole });
      logger.disable();
      logger.log('foo');
      logger.enable();
      mockConsole.log = (actualArg1) => {
        expect(actualArg1).toEqual('foo');
      };
      logger.log('foo');
    });
  });
});
