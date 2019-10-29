const { live, take } = require('./ganic')

let sync = x => x;

let organFn = props => {
  let a = sync(props.a)
  let b = sync(props.b)

  let c = take(props.c).install((deps, give) => {
    let delay = deps.delay
    if (!delay) return

    let timer = setInterval(() => {
      give(num => {
        return num + 1
      });
    }, delay)

    console.log('install: ', delay)
    return () => {
      console.log('uninstall: ', delay)
      clearInterval(timer);
    }
  }).firstGive(0)

  return `${a} ${b} ${c}`;
}

let initProps = {
  a: 1,
  b: 2,
  c: {
    delay: 1000
  }
}

let organ = live(organFn, initProps).onExcrete(r => {
  console.log('ex: ', r)
})

let updateProps = props => {
  let newProps = {...organ.props, ...props}
  live(organFn, newProps)
}

setTimeout(() => {
  updateProps({c: { delay: 2000 }})
}, 5100);

setTimeout(() => {
  updateProps({c: { delay: 500 }})
}, 10100);

setTimeout(() => {
  updateProps({a: 3})
}, 14100);

setTimeout(() => {
  updateProps({b: 3})
}, 17000);
