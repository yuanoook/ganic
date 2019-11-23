/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import GanicDOM from "ganic-dom";
import { useOrgan } from "ganic-usex";
import Select from "./Select";
import TodoList from "./todomvc/TodoList";
import CounterApp from "./counter/index";
import Benchmark from "./benchmark/index";

const options = ['todolist', 'counter', 'benchmark'];
const App = () => {
  const [select, selectUI] = useOrgan(Select, options);

  return <>
    {selectUI}
    <TodoList style={{display: select === options[0] ? 'block' : 'none'}}/>
    <CounterApp style={{display: select === options[1] ? 'block' : 'none'}}/>
    <Benchmark style={{display: select === options[2] ? 'block' : 'none'}}/>
  </>
};

GanicDOM.render(<App />, document.getElementById("app"));
