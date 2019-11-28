const { create } = require('ganic');
const {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} = require('../index');

describe('should always keep identity from parasite', () => {
  it('should only call fn while deps change with useMemo', () => {
    const times2 = n => n * 2;

    const parasitismMockFn = jest.fn();
    const times2WithMockFn = n => {
      const result = times2(n);
      parasitismMockFn(result);
      return result;
    };
    const organism = ({ count, updateIndex }) => {
      const memorizedDoubleCountResult = useMemo(times2WithMockFn, count);
      expect(memorizedDoubleCountResult).toBe(times2(count));
      return [memorizedDoubleCountResult, updateIndex];
    };

    const organismMockFn = jest.fn();
    create({ organism, props: { count: 1, updateIndex: 1 } })
      .addListener(organismMockFn)
      .receive({ count: 1, updateIndex: 2 })
      .receive({ count: 1, updateIndex: 3 })
      .receive({ count: 2, updateIndex: 4 });

    expect(parasitismMockFn.mock.calls).toEqual([[2], [4]]);

    expect(organismMockFn.mock.calls).toEqual([
      [[2, 1]],
      [[2, 2]],
      [[2, 3]],
      [[4, 4]],
    ]);
  });

  it('should always get permanent unique ref from useRef', () => {
    let lastARef;
    const organism = () => {
      const aRef = useRef();
      expect(!lastARef || lastARef === aRef).toEqual(true);
      lastARef = aRef;

      const bRef = useRef();
      expect(aRef).not.toBe(bRef);
    };

    create({ organism, props: 1 })
      .receive(2)
      .receive(3);
  });

  it('should always get permanent unique setState from useState', () => {
    let lastSetA;
    const organism = () => {
      const [, setA] = useState();
      expect(!lastSetA || lastSetA === setA).toEqual(true);
      lastSetA = setA;
      const [, setB] = useState();
      expect(setA).not.toBe(setB);
    };
    create({ organism, props: 1 })
      .receive(2)
      .receive(3);
    lastSetA(1);
  });

  it('should update useCallback, useCallback in the right way', () => {
    const plusX = ({ set, x }) => set(n => n + x);
    let lastPlus;
    let lastX;
    const App = ({ x }) => {
      const [count, setCount] = useState(0);
      const plus = useCallback(plusX, { set: setCount, x });
      expect(!lastPlus || lastX !== x || lastPlus === plus).toEqual(true);
      lastPlus = plus;
      lastX = x;
      return count;
    };
    const organ = create({ organism: App, props: { x: 1 } });
    organ
      .receive({ x: 1 })
      .receive({ x: 2 })
      .receive({ x: 3 })
      .receive({ x: 3 });

    lastPlus();
    expect(organ.result).toBe(3);

    organ.receive({ x: 10 });
    lastPlus();
    expect(organ.result).toBe(13);

    organ.vanish();
  });

  it('should setState inside useEffect without Error', () => {
    const App = () => {
      const [, setS] = useState(0);
      useEffect(() => setS(1));
    };
    create({ organism: App });
  });
});
