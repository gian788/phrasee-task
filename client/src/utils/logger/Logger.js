export default class {
  // why console: _console:
  // https://stackoverflow.com/questions/47813168/js-default-argument-value-from-variable-why-must-identifier-be-different
  constructor({ enabled = true, console: _console = console } = {}) {
    this.enabled = enabled;
    this.console = _console;
  }

  logger(type, args) {
    if (this.enabled) {
      this.console[type](...args);
    }
  }

  log(...args) {
    this.logger('log', args);
  }

  error(...args) {
    this.logger('error', args);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}
