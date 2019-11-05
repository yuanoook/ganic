'use strict';

const { create, attach } = require('../Ganic');

const useOrgan = (organism, props) => {
  attach((deps, give, {handover: organ}) => {
    if (!organ) {
      organ = create({organism, deps}).addListener(give);
    } else {
      organ.receive(deps);
    }

    return ({down}) => {
      if (down) {
        organ.shutdown();
        return;
      }
      return organ;
    };
  }, props);
};

const promiseParasitism = ({promiseFn, props}, give) => {
  let promising = true;

  promiseFn(props).then(res => {
    if (!promising) {
      return;
    }
    give(res);
  }).catch(error => {
    if (!promising) {
      return;
    }
    give(error);
  });

  return () => {
    promising = false;
  };
};

const usePromise = (promiseFn, props) => {
  return attach(promiseParasitism, {promiseFn, props});
};

module.exports = {
  useOrgan,
  usePromise,
};
