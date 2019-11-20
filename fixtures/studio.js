window.studio = (() => {
  const {
    useMemo,
    useState,
    useOrgan,
    useInterval,
    useTimeout,
    useThrottle,
    useDebounce
  } = GanicUseX;

  const {
    Button,
    useSetter,
    usePositiveNumberSetter,
    xAcceleratorsOrganism,
    useSuperLongList,
    buttonStyle
  } = window.utils;

  const Counter = () => {
    const [count, setCount] = useState(0);

    const [interval, setInterval] = useState(100);
    useInterval(useSetter(setCount, n => n + 1), interval);
    useTimeout(useSetter(setInterval, null), 3000);

    const [x, accelerators] = useOrgan(xAcceleratorsOrganism, 50);
    const minus = usePositiveNumberSetter(setCount, n => n - x, x);
    const plus = useSetter(setCount, n => n + x, x);
    const ui = useMemo(
      () => [
        {
          organism: 'h3',
          props: {
            children: 'Adjust Items'
          }
        },
        {
          organism: Button,
          props: {
            onPress: minus,
            style: buttonStyle,
            children: `-${x}`
          }
        },
        {
          organism: Button,
          props: {
            onPress: plus,
            style: buttonStyle,
            children: `+${x}`
          }
        },
        {
          organism: 'h3',
          props: {
            children: 'Accelerator'
          }
        },
        accelerators
      ],
      x
    );
    return [count, ui];
  };

  const LazyUpdate = count => [
    {
      organism: 'h3',
      props: {
        children: 'Lazy Update'
      }
    },
    {
      organism: 'p',
      props: {
        children: [
          'Throttle 1000ms: ',
          useThrottle(count, 1000)
        ]
      }
    },
    {
      organism: 'p',
      props: {
        children: [
          'Throttle 2000ms: ',
          useThrottle(count, 2000)
        ]
      }
    },
    {
      organism: 'p',
      props: {
        children: [
          'Throttle 3000ms: ',
          useThrottle(count, 3000)
        ]
      }
    },
  ];

  return {
    Counter,
    LazyUpdate,
    useSuperLongList,
  };
})();
