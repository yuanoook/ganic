/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import GanicDOM from "ganic-dom";
import { useOrgan } from "ganic-usex";
import Select from "./Select";
import TodoList from "./todomvc/TodoList";
import CounterApp from "./counter/index";

const App = () => {
  const [select, selectUI] = useOrgan(Select);

  return <>
    {selectUI}
    <TodoList style={{display: select === 'todolist' ? 'block' : 'none'}}/>
    <CounterApp style={{display: select === 'counter' ? 'block' : 'none'}}/>
  </>
};

GanicDOM.render(<App />, document.getElementById("app"));
