/* eslint-disable no-unused-vars */
import Ganic from 'ganic';
import { useCallback } from "ganic-usex";
import useStore from './useStore';

const GlyphIcon = <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>;

const Row = ({ selected, item, dispatch }) => {
  const select = useCallback(() => dispatch({ type: 'SELECT', id: item.id })),
    remove = useCallback(() => dispatch({ type: 'REMOVE', id: item.id }));

  return (<tr class={selected ? "danger" : ""}>
    <td class="col-md-1">{item.id}</td>
    <td class="col-md-4"><a onClick={select}>{item.label}</a></td>
    <td class="col-md-1"><a onClick={remove}>{GlyphIcon}</a></td>
    <td class="col-md-6"></td>
  </tr>);
};

const Button = ({ id, cb, title }) => (
  <div class="col-sm-6 smallpad" style="margin-bottom: 10px;">
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
  const rows = state.data.map(item =>
    <Row key={item.id} item={item} selected={state.selected === item.id} dispatch={dispatch} />
  );
  return (
    <div {...props}>
      <Jumbotron dispatch={dispatch} />
      <table class="table table-hover table-striped test-data">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default Benchmark;
