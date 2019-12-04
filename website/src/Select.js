/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import useStorage from './shared/useStorage';
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
const Option = ({value, select}) => (
  <option
    selected={value === select}
    value={value}>
      {
        capitalize(value)
      }
  </option>
);

export default options => {
  const [select, setSelect] = useStorage('ganic_codesandbox__demo_select', options[0]);
  const optionsUI = options.map(option => <Option value={option} key={option} select={select} />);
  const selectUI = (
    <select
      style={{fontSize: '20px', marginTop: '-40px'}}
      onChange={e => setSelect(e.target.value)}
    >
      { optionsUI }
    </select>
  );
  return [select, selectUI];
}
