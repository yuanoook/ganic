# Get started with Ganic

## With NPM / Yarn
### 1. Install Ganic, GanicDOM, GanicUseX
```bash
# npm
npm install ganic
npm install ganic-dom
npm install ganic-usex

# or yarn
yarn add ganic
yarn add ganic-dom
yarn add ganic-usex
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

Check example on codesandbox https://codesandbox.io/s/ganic-3hhbg

## With Browser
```html
<script src="https://unpkg.com/ganic/umd/ganic.production.min.js" />
<script src="https://unpkg.com/ganic-dom/umd/ganic-dom.production.min.js" />
<script src="https://unpkg.com/ganic-usex/umd/ganic-usex.production.min.js" />

<script>
  // Ganic, GanicDOM, GanicUseX
  const {useState, useRef, useMemo, useCallback} = GanicUseX;
  const {render} = GanicDOM;
  
  const App = ({ initState }) => {
    const [state, setState] = useState(initState);
    // ...
    return Ganic.createElement('div', null, state);
  };

  GanicDOM.render(
    Ganic.createElement(
      App,
      {
        initState: 0,
      }
    ),
    document.getElementById('app')
  );
</script>
```