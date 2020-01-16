<p align="center"><a href="https://ganicjs.com" target="_blank" rel="noopener noreferrer"><img width="100" src="website/favicon.png?raw=true" alt="Ganic logo"></a></p>
<h1 align="center">Ganic</h1>
<h2 align="center">Organic Programming</h2>

App is a living matter. Ganic helps you manage your Apps organically.

If you practiced React, you know how to play with Ganic.

You are not limited to only **usex Hooks** in React for UI development. Ganic can work well in your old project, even backend.

It's very tiny, but very powerful.

## DEMO https://codesandbox.io/s/ganic-3hhbg
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fyuanoook%2Fganic.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fyuanoook%2Fganic?ref=badge_shield)


## Get started [read more ↗](./readme/how-to-use-ganic.md)
### 1. Install
```bash
npm install ganic
npm install ganic-dom
npm install ganic-usex
```
### 2. Config babel to support JSX
```.babelrc
"plugins": [
  [
    "@babel/plugin-transform-react-jsx",
    {
      "pragma": "Ganic.createElement",
      "pragmaFrag": "Ganic.Fragment",
    }
  ],
  ...
```
### 3. Write your code
```javascript
  import Ganic from 'ganic';
  import GanicDOM from 'ganic-dom';
  import { useState } from 'ganic-usex';
  const App = ({ initState }) => {
    const [state, setState] = useState(initState);
    // ...
    return <div>{ state }</div>;
  }
  GanicDOM.render(<App initState={0}/>, document.getElementById('app'));
```

## Articles
[Think in Ganic ↗](./readme/think-in-ganic.md)

[GanicUseX APIs ↗](./readme/ganic-usex.md)

## Ganic's Family History

Ganic was originally designed to separate Hooks feature from React. Its outside looks very same with React*, but the inside was totally different. It's designed to be extendable.

From Ganic, with only two public apis `create`, and `attach`.

Everyone can design any **usex Hooks** with `attach` api. We also provide some basic ones in GanicUseX, which was build from one `attach`.

GanicTree is the basic package, for us to build renderer (like GanicDOM) for any platform you like. Most likely, it's suitable to solve any UI rendering issue. But it also could be used anywhere you want (I still have no idea).

GanicDOM, the first renderer based on GanicTree, has 100% capacity to power any website. Please check the showcases on https://ganicjs.com (it works on IE9).


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fyuanoook%2Fganic.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fyuanoook%2Fganic?ref=badge_large)