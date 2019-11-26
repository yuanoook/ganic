/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import GanicDOM from "ganic-dom";
import { useOrgan } from "ganic-usex";
import Select from "./Select";
import TodoList from "./todomvc/TodoList";
import CounterApp from "./counter/index";
import Benchmark from "./benchmark/index";
import Watch from './watch';

const options = ['watch', 'todolist', 'counter', 'benchmark'];
const App = () => {
  const [select, selectUI] = useOrgan(Select, options);

  return <>
    {selectUI}
    <Watch style={{display: select === options[0] ? 'block' : 'none'}}/>
    <TodoList style={{display: select === options[1] ? 'block' : 'none'}}/>
    <CounterApp style={{display: select === options[2] ? 'block' : 'none'}}/>
    <Benchmark style={{display: select === options[3] ? 'block' : 'none'}}/>
  </>
};

GanicDOM.render(<App />, document.getElementById("app"));
