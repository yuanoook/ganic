/* eslint-disable no-unused-vars */
import Ganic from 'ganic';
import chunk from 'lodash.chunk';
import { useCallback } from 'ganic-usex';
import useStore from './useStore';

const biX = <i class="bi bi-x"></i>;

const Row = ({ selected, item, dispatch }) => {
  const select = useCallback(() => dispatch({ type: 'SELECT', id: item.id }));
    const remove = useCallback(() => dispatch({ type: 'REMOVE', id: item.id }));

  return (<li class={
    selected
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action'
    }>
    <div class="row">
      <div class="col-2">{item.id}</div>
      <div class="col-8"><a onClick={select}>{item.label}</a></div>
      <div class="col-2"><a onClick={remove}>{biX}</a></div>
    </div>
  </li>);
};

const RowsGroup = ({ selected, items, dispatch }) => {
  const rows = items.map(item =>
    <Row key={item.id} item={item} selected={selected === item.id} dispatch={dispatch} />,
  );
  return <div class="container">
    <ul class="list-group">{rows}</ul>
  </div>;
};

const Button = ({ id, cb, title }) => (
  <div class="col-sm-6 smallpad" style={{marginBottom: '10px'}}>
    <button type="button" class="btn btn-primary btn-block" id={id} onClick={cb}>{title}</button>
  </div>
);

const Jumbotron = ({ dispatch }) => (
  <div class="jumbotron">
    <h1>Ganic keyed</h1>
    <div class="row">
      <Button id="run" title="Create 1,000 rows" cb={() => dispatch({ type: 'RUN' })} />
      <Button id="runlots" title="Create 10,000 rows" cb={() => dispatch({ type: 'RUN_LOTS' })} />
      <Button id="add" title="Append 1,000 rows" cb={() => dispatch({ type: 'ADD' })} />
      <Button id="update" title="Update every 10th row" cb={() => dispatch({ type: 'UPDATE' })} />
      <Button id="clear" title="Clear" cb={() => dispatch({ type: 'CLEAR' })} />
      <Button id="swaprows" title="Swap Rows" cb={() => dispatch({ type: 'SWAP_ROWS' })} />
    </div>
  </div>
);

const Benchmark = props => {
  const [state, dispatch] = useStore();
  const groups = chunk(state.data, 100);
  const groupsUI = groups.map((items, index) =>
    <RowsGroup key={index} items={items} selected={state.selected} dispatch={dispatch} />,
  );
  return (
    <div {...props}>
      <Jumbotron dispatch={dispatch} />
      <div class="test-data">
        {groupsUI}
      </div>
    </div>
  );
};

export default Benchmark;
