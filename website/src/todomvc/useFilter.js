/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Ganic from 'ganic';
import { useMemo } from 'ganic-usex';
import { useStorage } from 'ganic-pandora';

const FilterItem = ({ key, filter, setFilter }) => (
  <li>
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        setFilter(key);
      }}
      class={{
        selected: key === filter
      }}
    >
      {key.replace(/^[a-z]/, y => y.toUpperCase())}
    </a>
  </li>
);

const useFilter = (initValue = "all") => {
  const [filter, setFilter] = useStorage("ganic_todo_list__filter", initValue);
  const Filter = useMemo(
    <ul class="filters">
      {["all", "active", "completed"].map(key => (
        <FilterItem key={key} filter={filter} setFilter={setFilter} />
      ))}
    </ul>,
    filter
  );
  return [filter, Filter];
};

export default useFilter;
