/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import useStorage from "./shared/useStorage";

export default () => {
  const [select, setSelect] = useStorage("ganic_codesandbox__demo_select", "todolist");
  return [
    select,
    <select
      style={{fontSize: "20px", marginTop: "-40px"}}
      onChange={e => setSelect(e.target.value)}>
      <option selected={select === "todolist"} value="todolist">TodoList</option>
      <option selected={select === "counter"} value="counter">Counter</option>
    </select>
  ];
}
