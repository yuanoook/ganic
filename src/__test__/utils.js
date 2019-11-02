'use strict';

const getTestTimeout = done => {
  let timerCount = 0;
  const checkDone = () => --timerCount === 0 && done();
  return {
    clearTimeout: timer => (
      clearTimeout(timer),
      checkDone()
    ),
    setTimeout: (fn, delay) => (
      timerCount ++,
      setTimeout(
        () => (
          fn(),
          checkDone()
        ),
        delay)
    )
  }
}

module.exports = {
  getTestTimeout,
};
