<p align="center"><a href="https://ganicjs.com" target="_blank" rel="noopener noreferrer"><img width="100" src=".codesandbox/example/favicon.png?raw=true" alt="Ganic logo"></a></p>
<h1 align="center">Ganic</h1>
<h2 align="center">Organic Programming</h2>

App is a living matter. Ganic helps you manage your Apps organically.

If you practiced React, you know how to play with Ganic.

Not only does Ganic support **Functional Components, usex Hooks**, but it also enable you to **usex Hooks** wherever you could use.

You are not limited to only **usex Hooks** in React for UI development. Ganic can work well in your old project, even backend.

It's very tiny, but very powerful.

## Ganic was born to use, extend and improve easily.

Ganic was originally designed to separate Hooks feature from React. Its outside looks very same with React*, but the inside was totally different. It's designed to be extendable.

From Ganic, with only two public apis `create`, and `attach`.

Everyone can design any **usex Hooks** with `attach` api. We also provide some basic ones in GanicUseX, which was build from one `attach`.

GanicTree is the basic package, for us to build renderer (like GanicDOM) for any platform you like. Most likely, it's suitable to solve any UI rendering issue. But it also could be used anywhere you want (I still have no idea).

GanicDOM, the first renderer based on GanicTree, has 100% capacity to power any website. Please check the showcases on https://ganicjs.com (it works on IE9).

### DEMO https://codesandbox.io/s/ganic-3hhbg

## How to use?
```bash
# with npm
npm install ganic
npm install ganic-dom
npm install ganic-usex

# with yarn
yarn add ganic
yarn add ganic-dom
yarn add ganic-usex
```
```javascript
  import Ganic, {
    create,
    attach,
  } from 'ganic';
  import {
    useRef,
    useMemo,
    useCallback,
    useState,
    useEffect,

    useTimeout,
    useInterval,

    useDebounce,
    useThrottle,

    useOrgan,
    usePromise,
  } from 'ganic-usex';
  import {
    render,
  } from 'ganic-dom';

  const App = ({ initState }) => {
    const [state, setState] = useState(initState);
    ...
    return <div>{ state }</div>;
  }

  render(<App initState={0}/>, document.getElementById('app'));
```

Browser
```html
<script src="https://unpkg.com/ganic/umd/ganic.production.min.js" />
<script src="https://unpkg.com/ganic-dom/umd/ganic-dom.production.min.js" />
<script src="https://unpkg.com/ganic-usex/umd/ganic-usex.production.min.js" />

<script>
  const {create, attach} = Ganic;
  const {useState, useRef, useMemo, useCallback} = GanicUseX;
  const {render} = GanicDOM;
  
  const App = ({ initState }) => {
    const [state, setState] = useState(initState);
    ...
    return <div>{ state }</div>;
  };

  render({
    organism: App,
    props: {
      initState: 0,
    },
  }, document.getElementById('app'));
</script>
```

## Articles
[Think in Ganic](#think-in-ganic)

[Advanced Key Concepts](#advanced-key-concepts)

[Make your own useX Hooks with `attach` API](#make-your-own-usex-hooks-with-attach)

[Big Plan of Ganic](#big-plan)


## API Exmaples
### useRef()
```javascript
/**
 * useRef to always get the same one object, in different update.
 */

const = {create, useRef} = require('ganic');
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
const = {create, useMemo} = require('ganic');
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
const = {create, useState} = require('ganic');
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


# Advanced Key Concepts

... To explain ...
## Organ
## Organism Function
## Parasite
## Parasitism Function

# Make your own useX Hooks with `attach`
... To explain ...


# Think in Ganic

A component is an alive creature. It's like a biological unit. To describe a component properly in programming language is one of the biggest challenges for all of us.

Please enjoy the image!
![Quantification of Cellular Organelle Size](quantification-of-cellular-organelle-size.jpg?raw=true "Quantification of Cellular Organelle Size")
<sub>Thanks for the awesome image from https://meetings.ami.org/2018/project/quantification-of-cellular-organelle-size/</sub>

## Principles For A Component

1. A component is a child of its parent component;
2. A component has a set of children components;
3. A component contains **something** except its children.

The **something** is the root cause of our challenge.

A component does three tasks
1. Be managed as a child;
2. Manage its children components;
3. Do its **own business**.

A component is about to be unpredictable. We try to make it as predictable as possible. Data transparency makes things easy for us to develop, debug, maintain and make change.

For a component, data comes all the way, all the time. Data management and data processing are our programming life.

React Hooks is awesome. React Hooks are the things to describe a component's **own business (the something)** in a human understandable way.

With Hooks, literally we **use** everything, to manage the data income and outcome from different worlds outside of the **components tree**. We have good collection of hooks, e.g. https://github.com/streamich/react-use

I love React, and I love Hooks. I'm making Ganic, to make hooks available without React.

# All we care is CHANGE

All we care is CHANGE;

All we do is making CHANGE;

CHANGE = !shallowEqual(deps, newDeps);

NO CHANGE, NO UPDATE, NO NOTIFICATION!

We allow update secretly by **Data Smuggling**
``` javascript
// no listener will be waken up
deps.smuggler.goods = somethingFresh;
```


# Big Plan

## OrganTree
Nested, async, prioritize-able, time-slice-able tree of organSets

## OrganSet
To manage a set of organs

## OrganSet Description
Plain object structure, to create an organSet by the description
### OrganSet Description JSX parser

## Focus Point
Focus points, dynamically prioritize organs in a tree, to improve tree update performance.

## Ganic-UI
Basic text, box, image organism to manage pure UI work

## Ganic-DOM

### Ganic-DOM-Organisms
Organisms to present DOM Element in OrganSet Description

### Ganic-DOM-Parasitisms
Work inside DOM organisms, to conduct real DOM update with broswer API

### Ganic-DOM-Render
Manage a OrganSet, bring it to real UI world
