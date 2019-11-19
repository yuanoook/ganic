/* eslint-disable no-sequences */

const getAllTimeout = done => {
  let timerCount = 0;
  const checkDone = () => --timerCount === 0 && done();
  return {
    setTimeout: (fn, delay) => (
      timerCount++,
      setTimeout(() => {
          fn();
          checkDone();
      }, delay)
    ),

    /**
     *  Don't call clearTimeout right after setTimeout,
     *  Otherwise, you'll get done called immediately
     * */
    clearTimeout: timer => {
      let result;
      if (timer) {
        result = clearTimeout(timer);
        checkDone();
      }
      return result;
    },
  };
};

module.exports = {
  getAllTimeout,
};
