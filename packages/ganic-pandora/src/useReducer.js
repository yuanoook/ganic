const { useCallback, useState } = require('ganic-usex');

const useReducer = (reducer, initState) => {
  const [state, setState] = useState(initState);
  const dispatch = useCallback(action => setState(s => reducer(s, action)));
  return [state, dispatch];
};

module.exports = useReducer;
