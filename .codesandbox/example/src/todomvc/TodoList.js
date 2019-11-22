/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import useInput from "../shared/useInput";
import useFilter from "./useFilter";
import useList from "./useList";

const TodoList = props => {
  const [text, Input, setText] = useInput("", "ganic_todo_list__input");
  const [filter, filterUI] = useFilter();
  const {
    list,
    addItem,
    clearCompleted,
    allDone,
    toggleAll,
    leftItems,
    listUI
  } = useList(filter);

  return (
    <div {...props}>
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <Input
            value={text}
            onEnter={e => {
              if (!e.target.value.trim()) {
                return;
              }
              addItem(e.target.value);
              setText("");
            }}
            class="new-todo"
            placeholder="What needs to be done?"
          />
        </header>
        <section
          class="main"
          style={{ display: list.length ? "block" : "none" }}
        >
          <input
            onClick={toggleAll}
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            checked={allDone}
          />
          <label for="toggle-all">Mark all as complete</label>
          <ul class="todo-list">{listUI}</ul>
        </section>
        <footer
          class="footer"
          style={{ display: list.length ? "block" : "none" }}
        >
          <span class="todo-count">
            <strong>{leftItems.length}</strong> item left
          </span>
          {filterUI}
          <button
            class="clear-completed"
            style={{
              display: list.length === leftItems.length ? "none" : "block"
            }}
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a target="_blank" href="https://yuanoook.com">Rango Yuan</a>
        </p>
        <p>
          Part of <a target="_blank" href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};

export default TodoList;
