const checkAsyncExpectation = ({organ, expectation, done, mockFn}) => {
  const checkExpectation = () => {
    expect(mockFn.mock.calls).toEqual(expectation);
    done();
  };

  let count = 0;
  organ.addListener(r => {
    mockFn(r);
    if (expectation.length === ++count) {
      checkExpectation();
      organ.vanish();
    }
  });
};

module.exports = {
  checkAsyncExpectation,
};
