const fs = require('fs');

const oneSecond = () => new Promise(resolve => setTimeout(resolve, 1000));

const expectTry = async (fn, timeout = 10) => {
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
  expect(fn()).toEqual(true);
}

const expectFile = async (path, timeout = 10) => {
  await expectTry(() => fs.existsSync(path), timeout)
}

module.exports = {
  expectTry,
  expectFile
};
