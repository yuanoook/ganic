import { useCallback, useInitialState } from 'ganic-usex';

// todo: move useReducer to ganic-usex
const useReducer = (reducer, initState) => {
  const [state, setState] = useInitialState(initState);
  const dispatch = useCallback(action => setState(s => reducer(s, action)));
  return [state, dispatch];
}

export default useReducer;
