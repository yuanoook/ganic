/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import GanicDOM from 'ganic-dom';
import { useOrgan } from 'ganic-usex';
import Select from './Select';
import TodoList from './todomvc/TodoList';
import CounterApp from './counter/index';
import Benchmark from './benchmark/index';
import Watch from './watch/index';
import Followers from './followers/index';
import Flocking from './flocking/index';
import Fps from './fps/index';

const options = {
  flocking: <Flocking/>,
  followers: <Followers/>,
  watch: <Watch/>,
  todolist: <TodoList/>,
  counter: <CounterApp/>,
  benchmark: <Benchmark/>,
};
const optionKeys = Object.keys(options);

const App = () => {
  const [select, selectUI] = useOrgan(Select, optionKeys);

  return <>
    { selectUI }
    <Fps/>
    { options[select] }
  </>;
};

GanicDOM.render(<App />, document.getElementById('app'));
