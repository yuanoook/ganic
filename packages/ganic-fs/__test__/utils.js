const fs = require('fs');
const exec = x => typeof x === 'function' ? x() : x;
const oneSecond = () => new Promise(resolve => setTimeout(resolve, 1000));

const expectTry = async (fn, timeout = 10, failMsg) => {
  do {
    try {
      expect(fn()).toEqual(true);
      break;
    } catch (e) {
      timeout--;
    }
    await oneSecond();
  } while (timeout > 1);

  await oneSecond();
  if (!fn()) {
    expect(exec(failMsg)).toEqual(null);
  }
};

const expectFile = async (path, timeout = 10) => {
  await expectTry(
    () => fs.existsSync(exec(path)),
    timeout,
    () => `Cannot find ${exec(path)}`,
  );
};

module.exports = {
  expectTry,
  expectFile,
};
