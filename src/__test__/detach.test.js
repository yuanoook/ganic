'use strict';

const {create, attach} = require('../Ganic');
const {useEffect} = require('../use');

describe('parasite attach & detach', () => {
  const mockFn = jest.fn();
  beforeEach(() => mockFn.mockReset());

  const parasitism = deps => {
    mockFn('attach', deps);
    return () => mockFn('detach', deps);
  };
  const attachDetachFlags = ['attach', 'detach'];
  const checkAttachDetachExpectation = expectation => {
    const expectationWithFlag = expectation.map((e, i) => [
      attachDetachFlags[i % 2],
      e,
    ]);
    expect(mockFn.mock.calls).toEqual(expectationWithFlag);
  };
  const createCheckWith3Randoms = (organism, expectation) => {
    const randoms = [0, 1, 2].map(() => Math.random());
    create({organism, props: randoms[0]}).receive(randoms[1]).receive(randoms[2]);
    const defaultExpectation = [0, 0, 1, 1, 2].map(ri => randoms[ri]);
    checkAttachDetachExpectation(expectation || defaultExpectation);
  };

  it('should attach & detach properly', () => {
    const organism = props => attach(parasitism, props);
    createCheckWith3Randoms(organism);
  });

  it('should attach & detach properly with useEffect without deps', () => {
    const organism = () => useEffect(parasitism);
    const expectation = [1, 2, 3, 4, 5];
    createCheckWith3Randoms(organism, expectation.map(i => undefined));
  });

  it('should attach & detach properly with useEffect with random deps', () => {
    const organism = props => useEffect(parasitism, props);
    createCheckWith3Randoms(organism);
  });

  it('should attach & detach properly with useEffect with random deps', () => {
    const organism = props => useEffect(parasitism, props);
    const depsList = [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
    const organ = create({organism, props: 0});
    depsList.forEach(deps => organ.receive(deps));
    checkAttachDetachExpectation([0, 0, 1, 1, 2]);
  });
});