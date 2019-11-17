'use strict';

const { create, attach } = require('../Ganic');

const useOrgan = (desc, props) => {
  let organism = desc;
  if (typeof desc === 'object' && typeof desc.organism === 'function') {
    organism = desc.organism;
    props = desc.props;
  }
  return attach((deps, give, {handover: organ}) => {
    if (!organ) {
      organ = create({organism, props: deps}).addListener(give);
    } else {
      organ.receive(deps);
    }

    return ({ending}) => {
      if (ending) {
        organ.vanish();
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
