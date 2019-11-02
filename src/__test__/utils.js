'use strict';

const getAllTimeout = done => {
  let timerCount = 0;
  const checkDone = () => --timerCount === 0 && done();
  return {
    setTimeout: (fn, delay) => (
      timerCount ++,
      setTimeout(
        () => (
          fn(),
          checkDone()
        ),
        delay)
    ),

    /**
     *  Don't call clearTimeout right after setTimeout,
     *  Otherwise, you'll get done called immediately
     * */
    clearTimeout: timer => timer && (
      clearTimeout(timer),
      checkDone()
    ),
  }
}

module.exports = {
  getAllTimeout
};
