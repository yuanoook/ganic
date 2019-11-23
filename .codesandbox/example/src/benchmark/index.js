/* eslint-disable no-unused-vars */
import Ganic from 'ganic';
import { useCallback } from "ganic-usex";
import useStore from './useStore';

const GlyphIcon = <span className="glyphicon glyphicon-remove" aria-hidden="true">X</span>;

const Row = ({ selected, item, dispatch }) => {
  const select = useCallback(() => dispatch({ type: 'SELECT', id: item.id })),
    remove = useCallback(() => dispatch({ type: 'REMOVE', id: item.id }));

  return (<tr className={selected ? "danger" : ""}>
    <td className="col-md-1">{item.id}</td>
    <td className="col-md-4"><a onClick={select}>{item.label}</a></td>
    <td className="col-md-1"><a onClick={remove}>{GlyphIcon}</a></td>
    <td className="col-md-6"></td>
  </tr>);
};

const Button = ({ id, cb, title }) => (
  <div className="col-sm-6 smallpad">
    <button type="button" className="btn btn-primary btn-block" id={id} onClick={cb}>{title}</button>
  </div>
);

const Jumbotron = ({ dispatch }) => (
  <div className="jumbotron">
    <div className="row">
      <div className="col-md-6">
        <h1>Ganic UseX keyed</h1>
      </div>
      <div className="col-md-6">
        <div className="row">
          <Button id="run" title="Create 1,000 rows" cb={() => dispatch({ type: 'RUN' })} />
          <Button id="runlots" title="Create 10,000 rows" cb={() => dispatch({ type: 'RUN_LOTS' })} />
          <Button id="add" title="Append 1,000 rows" cb={() => dispatch({ type: 'ADD' })} />
          <Button id="update" title="Update every 10th row" cb={() => dispatch({ type: 'UPDATE' })} />
          <Button id="clear" title="Clear" cb={() => dispatch({ type: 'CLEAR' })} />
          <Button id="swaprows" title="Swap Rows" cb={() => dispatch({ type: 'SWAP_ROWS' })} />
        </div>
      </div>
    </div>
  </div>
);

const Benchmark = () => {
  const [state, dispatch] = useStore();

  return (<div className="container">
    <Jumbotron dispatch={dispatch} />
    <table className="table table-hover table-striped test-data"><tbody>
      {state.data.map(item => (
        <Row key={item.id} item={item} selected={state.selected === item.id} dispatch={dispatch} />
      ))}
    </tbody></table>
    <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
  </div>);
}

export default Benchmark;
