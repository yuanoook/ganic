# GanicUseX APIs

### useRef()
```javascript
/**
 * useRef to always get the same one object, in different update.
 */

const = { create } = require('ganic');
const = { useRef } = require('ganic-usex');
const organism = props => {
  const ref = useRef();
  ref.current = props;
  return ref;
};
const organ = create({organism, props: 0});

organ.addListener(res => console.log(res));
organ.receive(1);
organ.receive(2); 

// you'll get
// > {current: 0}
// > {current: 1}
// > {current: 2}
// > 

/**
 * When an organ receives new props,
 * Ganic will call organism Function again,
 * but you'll always get the same one object from useRef.
 */
```

### useMemo(function, dependencies)
```javascript
const = { create } = require('ganic');
const = { useMemo } = require('ganic-usex');
const times2 = n => {
  console.log('in times2');
  return n * 2;
};
const organism = props => {
  const res = useMemo(times2, props.b);
  console.log('in organism');
  return res;
};
const organ = create({organism, props: {a: 0, b: 1}});

organ.addListener(res => console.log(res));
organ.receive({a: 1, b: 1});
organ.receive({a: 2, b: 1}); 

// you'll get
// > "in times2"
// > "in organism"
// > "in organism"
// > "in organism"

/**
 * When an organ receives new props,
 * Ganic will call organism Function again,
 * if useMemo dependencies did not change (shallowEqual),
 * useMemo won't call the its function again,
 * you'll always get the same one result from useMemo.
 */
```

### const [state, setState] = useState(initState|dependencies);
```javascript
const = { create } = require('ganic');
const = { useState } = require('ganic-usex');
const organism = props => {
  const [state, setState] = useState(props.b);
  return state;
};
const organ = create({organism, props: {a: 0, b: 1}});

organ.addListener(res => console.log(res));
organ.receive({a: 0, b: 1});
organ.receive({a: 0, b: 1}); 

// you'll get
// > 1
// > 1
// > 1
//

/**
 * When an organ receives new props,
 * Ganic will call organism Function again,
 * if useState dependencies did not change (shallowEqual),
 * you'll get the same sate, and setState.
 * 
 * You call setState to udpate the state,
 * Ganic will automatically set it rightly.
 */
```

... To explain ...
### useEffect
### useTimeout
### useInterval
### useDebounce
### useThrottle
