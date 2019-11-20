window.utils = (() => {
  const { attach } = Ganic;
  const {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useInterval,
    useThrottle,
  } = GanicUseX;
  
  const mouseUpEffect = mouseup => {
    document.documentElement.addEventListener("mouseup", mouseup);
    document.documentElement.addEventListener("touchend", mouseup);
    return () => {
      document.documentElement.removeEventListener("mouseup", mouseup);
      document.documentElement.removeEventListener("touchend", mouseup);
    };
  };
  const useMouseUp = fn => useEffect(mouseUpEffect, fn);
  
  const useSetter = (set, value, deps) =>
    useCallback(() => set(value), deps);
  const usePositiveNumberSetter = (set, fn, deps) =>
    useSetter(set, n => Math.max(fn(n), 0), deps);
  
  const Button = ({ onPress, children, ...others }) => {
    const [interval, setInterval] = useState(null);
    const onMousedown = useSetter(setInterval, 50);
    useMouseUp(useSetter(setInterval, null));
    useInterval(onPress, interval);
    const props = {
      ...others,
      onMousedown,
      onTouchstart: onMousedown
    };
    return {
      organism: 'button',
      props: {
        ...props,
        children
      }
    };
  };
  
  const makeItem = i => {
    const color = `rgb(${i % 255},${(i * 2) % 255},${(i * 3) % 255})`;
    return {
      organism: 'p',
      style: { color },
      key: i
    };
  };
  
  const makeList = (start, length) => {
    const list = [];
    for (let i = 0; i < length; i++) {
      list.push(makeItem(i + start));
    }
    return list;
  };
  
  const chunkBack = (arr, size) => {
    let r = [];
    for (let i = arr.length; i > -1; i -= size)
      r.unshift(arr.slice(Math.max(i - size, 0), Math.max(0, i)));
    return r;
  };
  
  const numbersParasitism = (size, give, { handover: list = [] }) => {
    if (size > list.length) {
      list = makeList(list.length, size - list.length)
        .reverse()
        .concat(list);
    } else if (size < list.length) {
      list = list.slice(list.length - size);
    }
    give(list);
    return ({ ending = false }) => {
      if (ending) {
        list = null;
      } else {
        return list;
      }
    };
  };
  
  const buttonStyle = {
    fontSize: "30px",
    padding: "20px",
    borderRadius: "5px",
    margin: "10px",
    userSelect: "none"
  };
  
  const smallBtnStyle = {
    ...buttonStyle,
    padding: "10px"
  };
  
  const xAcceleratorsOrganism = initX => {
    let [x, setX] = useState(initX);
    const accelerators = [1, 10, 100].map(i => {
      const minusX = usePositiveNumberSetter(setX, x => x - i, i);
      const plusX = useSetter(setX, x => x + i, i);
      return [
        {
          organism: Button,
          props: {
            onPress: minusX,
            style: smallBtnStyle,
            children: `- ${i}`
          }
        },
        {
          organism: Button,
          props: {
            onPress: plusX,
            style: smallBtnStyle,
            children: `+ ${i}`
          }
        },
        {
          organism: 'br'
        }
      ];
    });
    return [x, accelerators];
  };

  const useSuperLongList = (count, chunkSize, delay) => {
    const numbers = attach(numbersParasitism, count);
    const list = useMemo(
      () =>
        chunkBack(numbers, chunkSize).map((items, index, arr) => ({
          organism: 'div',
          key: arr.length - index,
          children: items,
        })),
      useThrottle(count, delay)
    );

    return {
      organism: 'div',
      props: {
        style: {
          height: "100px",
          overflow: "auto",
          background: "lightgray"
        },
        children: [
          {
            organism: 'h2',
            props: {
              children: [
                'Super Long List (Items: ',
                count,
                ')'
              ]
            }
          },
          list
        ]
      }
    };
  };

  return {
    Button,
    useSetter,
    usePositiveNumberSetter,
    xAcceleratorsOrganism,
    useSuperLongList,
    buttonStyle
  };
})();
