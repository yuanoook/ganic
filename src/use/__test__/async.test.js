'use strict';

const {create, vanish} = require('../../Ganic');
const {getUpdatingOrgan} = require('../../moirai/Lakhesis');
const {useOrgan, usePromise} = require('..');

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
    expect(getUpdatingOrgan()).toBe(undefined);

    expect(organ0).not.toBe(organ1);
    expect(organ1).not.toBe(organ2);
    expect(organ2).not.toBe(organ3);

    vanish(organ);
    expect(organ0.organism).toBe(null);
    expect(organ1.organism).toBe(null);
    expect(organ2.organism).toBe(null);
    expect(organ3.organism).toBe(null);
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
