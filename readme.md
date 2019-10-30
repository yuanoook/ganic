# Ganic
A cool organic programming javascript library

# Parasitism function
```javascript
  let intervalParasitism = (deps, give) => {
    let delay = deps.delay
    if (!delay) return

    let timer = setInterval(() => {
      give(num => {
        return num + 1
      });
    }, delay)

    return () => {
      clearInterval(timer);
    }
  }
```

# Organism function
```javascript
  let intervalOrganism = props => {
    let a = sync(props.a)
    let b = sync(props.b)
    let c = take(props.c).attach(intervalParasitism).firstGive(0)
    let d = take().attach({da: 1}).firstGive()
    return `${a} ${b} ${c} ${JSON.stringify(d)}`;
  }
```

# Live the organism
```javascript
  let initProps = {
    a: 1,
    b: 2,
    c: {
      delay: 1000
    }
  }

  let organ = live(intervalOrganism, initProps).onExcrete(r => {
    console.log('ex: ', r)
  })
```

# Todo

Test Cover, re-arrange test cases

Nested async time-slice-able organs

Focus Points, In and Out




