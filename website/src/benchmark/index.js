/* eslint-disable no-unused-vars */
import Ganic from 'ganic';
import chunk from 'lodash.chunk';
import { useCallback } from "ganic-usex";
import useStore from './useStore';

const GlyphIcon = <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>;

const Row = ({ selected, item, dispatch }) => {
  const select = useCallback(() => dispatch({ type: 'SELECT', id: item.id })),
    remove = useCallback(() => dispatch({ type: 'REMOVE', id: item.id }));

  return (<tr class={selected ? "danger" : ""}>
    <td class="col-1">{item.id}</td>
    <td class="col-4"><a onClick={select}>{item.label}</a></td>
    <td class="col-1"><a onClick={remove}>{GlyphIcon}</a></td>
    <td class="col-6"></td>
  </tr>);
};

const RowsGroup = ({ selected, items, dispatch }) => {
  const rows = items.map(item =>
    <Row key={item.id} item={item} selected={selected === item.id} dispatch={dispatch} />
  );
  return <tbody>{rows}</tbody>
}

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
  const groupsUI = groups.map(items =>
    <RowsGroup key={items[0].id} items={items} selected={state.selected} dispatch={dispatch} />
  );
  return (
    <div {...props}>
      <Jumbotron dispatch={dispatch} />
      <table class="table table-hover table-striped test-data">
        {groupsUI}
      </table>
    </div>
  );
}

export default Benchmark;
