const Ganic = require('ganic');
const {create, getUpdatingOrgan, getGivingParasite, getAllGivingParasites} = Ganic;
const {useOrgan, usePromise, useState, useTimeout} = require('../index');

describe('useOrgan & usePromise', () => {
  it('should not report Error calling attach after useOrgan', () => {
    let organ0, organ1, organ2, organ3;
    const organism = () => {
      organ0 = getUpdatingOrgan();
      useOrgan(() => {
        organ1 = getUpdatingOrgan();
        useOrgan(() => {
          organ2 = getUpdatingOrgan();
          useOrgan(() => {
            organ3 = getUpdatingOrgan();
          });
        });
      });
    };

    const organ = create({organism});
    expect(getUpdatingOrgan()).toBe(null);

    expect(organ0).not.toBe(organ1);
    expect(organ1).not.toBe(organ2);
    expect(organ2).not.toBe(organ3);

    organ.vanish();
    expect(organ0.organism).toBe(null);
    expect(organ1.organism).toBe(null);
    expect(organ2.organism).toBe(null);
    expect(organ3.organism).toBe(null);
  });

  it('should allow nested parasites in nested organs', done => {
    let parasiteBOut, parasiteBIn;
    const checkExpectation = () => {
      const updatingParasites = getAllGivingParasites();
      expect(updatingParasites.length).toBe(2);
      expect(updatingParasites[0]).toBe(parasiteBIn);
      expect(updatingParasites[1]).toBe(parasiteBOut);
      done();
    };
    const organismB = () => {
      const [b, setB] = useState(0);
      useTimeout(() => setB(1), 30);
      if (b === 1) {
        parasiteBIn = getGivingParasite();
      }
      return b;
    };
    const organism = () => {
      const givenB = useOrgan(organismB);
      if (givenB === 1) {
        parasiteBOut = getGivingParasite();
        checkExpectation();
      }
    };
    create({organism});
  });

  it('should use the data from organ rightly with useOrgan', () => {
    const mockFn = jest.fn();
    let lastSetX;
    const organism = () => {
      const y = useOrgan(() => {
        const [x, setX] = useState(1);
        lastSetX = setX;
        return x;
      });
      return y;
    };
    const organ = create({organism});

    organ.addListener(mockFn);
    lastSetX(2);
    expect(mockFn.mock.calls).toEqual([
      [1],
      [2],
    ]);
  });

  it('should get promise', done => {
    const mockFn = jest.fn();
    const checkExpectation = () => setTimeout(() => {
      expect(mockFn.mock.calls).toEqual([
        [undefined],
        [1],
      ]);
      done();
    });

    const organism = () => usePromise(() => new Promise(
      resolve => setTimeout(() => {
          resolve(1);
          checkExpectation();
      })),
    );

    create({organism}).addListener(mockFn);
  });
});
