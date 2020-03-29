import { useReducer } from 'ganic-pandora';
import buildData from './buildData';

const listReducer = (state, action) => {
  const { data, selected } = state;
  switch (action.type) {
    case 'RUN':
      return { data: buildData(1000), selected: 0 };
    case 'RUN_LOTS':
      return { data: buildData(10000), selected: 0 };
    case 'ADD':
      return { data: data.concat(buildData(1000)), selected };
    case 'UPDATE':
      const newData = data.slice(0);
      for (let i = 0; i < newData.length; i += 10) {
        const r = newData[i];
        newData[i] = { id: r.id, label: r.label + " !!!" };
      }
      return { data: newData, selected };
    case 'CLEAR':
      return { data: [], selected: 0 };
    case 'SWAP_ROWS':
      return { data: [data[0], data[998], ...data.slice(2, 998), data[1], data[999]], selected };
    case 'REMOVE':
      const idx = data.findIndex((d) => d.id === action.id);
      return { data: [...data.slice(0, idx), ...data.slice(idx + 1)], selected };
    case 'SELECT':
      return { data, selected: action.id };
  }
  return state;
}

const initState = { data: [], selected: 0 };
const useStore = () => useReducer(listReducer, initState);

export default useStore;
