/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import { useRef, useCallback, useOrgan } from "ganic-usex";
import useStorage from "../shared/useStorage";
import useInput from "../shared/useInput";

const Item = ({ id, title, done, editing, removeItem, updateItem }) => {
  const [text, Input] = useInput(title);
  const inputRef = useRef();
  const saveItem = e => {
    if (!text.trim()) {
      e.target.focus();
      return;
    }
    updateItem(id, {
      editing: false,
      title: text
    });
  };
  const editItem = () => {
    updateItem(id, { editing: true });
    inputRef.current.focus();
  };
  return (
    <li class={`${editing ? "editing" : ""} ${done ? "completed" : ""}`}>
      <div class="view">
        <input
          onClick={() => updateItem(id, { done: true })}
          class="toggle"
          type="checkbox"
          checked={done}
        />
        <label onDblClick={editItem}>{title}</label>
        <button class="destroy" onClick={() => removeItem(id)} />
      </div>
      <Input
        class="edit"
        ref={inputRef}
        value={text}
        onEnter={saveItem}
        onBlur={saveItem}
      />
    </li>
  );
};

const newItem = text => ({
  id: Math.random(),
  title: text,
  done: false,
  editing: false
});

const List = filter => {
  const [list, setList] = useStorage("ganic_todo_list__list", []);
  const allDone = !list.find(item => !item.done);
  const addItem = useCallback(text =>
    setList(list => [newItem(text), ...list])
  );
  const removeItem = useCallback(id =>
    setList(list => list.filter(item => item.id !== id))
  );
  const clearCompleted = useCallback(() =>
    setList(list => list.filter(item => !item.done))
  );
  const updateItem = useCallback((id, payload) =>
    setList(list =>
      list.map(item =>
        item.id === id ? Object.assign({}, item, payload) : item
      )
    )
  );

  const toggleAll = useCallback(
    () =>
      setList(list =>
        list.map(item => ({
          ...item,
          done: !allDone
        }))
      ),
    allDone
  );

  const leftItems = list.filter(item => !item.done);

  const filteredList =
    filter === "all"
      ? list
      : filter === "active"
      ? leftItems
      : list.filter(item => !leftItems.includes(item));

  const listUI = filteredList.map(item => (
    <Item
      {...item}
      key={item.id}
      updateItem={updateItem}
      removeItem={removeItem}
    />
  ));

  return {
    list,
    addItem,
    clearCompleted,
    allDone,
    toggleAll,
    leftItems,
    listUI
  };
};

const useList = filter => useOrgan(List, filter);

export default useList;
