
const Ganic = require('../../../index');
const {render} = Ganic;

describe('dom organism style', () => {
  it('should call dom parasitism minimum times with style change', () => {
    const mockFn = jest.fn();
    const envRoot = document.createElement('div');
    const App = ({n}) => {
      return <div style={{testStyle: n}}/>;
    };
    const tree = render({organDesc: <App n={1} />, envRoot});
    const appNode = tree.trunkNode.firstChild;
    const divParasites = appNode.firstChild.organ.parasites;
    const divParasite = divParasites[divParasites.length - 1];
    const inspectDetach = (parasite, fn) => {
      const originalToDetach = divParasite.toDetach.bind(parasite);
      parasite.toDetach = (...args) => {
        fn(...args);
        originalToDetach(...args);
      };
    };

    inspectDetach(divParasite, mockFn);
    appNode.organ.receive({n: 1, x: 1});
    expect(mockFn.mock.calls.length).toBe(0);

    appNode.organ.receive({n: 1, x: 2});
    expect(mockFn.mock.calls.length).toBe(0);

    appNode.organ.receive({n: 3});
    expect(mockFn.mock.calls.length).toBe(1);

    inspectDetach(divParasite, mockFn);
    tree.vanish();
    expect(mockFn.mock.calls.length).toBe(2);

    expect(mockFn.mock.calls).toEqual([
      [{ending: false}],
      [{ending: true}],
    ]);
  });
});
