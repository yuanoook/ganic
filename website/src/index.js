/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import GanicDOM from 'ganic-dom';
import GanicDomAir from 'ganic-dom-air';
import { useOrgan } from 'ganic-usex';
import Select from './Select';
import TodoList from './todomvc/TodoList';
import CounterApp from './counter/index';
import Benchmark from './benchmark/index';
import Watch from './watch/index';
import Followers from './followers/index';
import Flocking from './flocking/index';
import DoublePendulum from './doublependulum/index';
import TheHorseInMotion from './thehorseinmotion/index';
import Fps from './components/Fps';
import DocInfo from './components/DocInfo';
import Speech2Text from './speech2text/index';

const options = {
  todolist: <TodoList/>,
  benchmark: <Benchmark/>,
  counter: <CounterApp/>,
  doublePendulum: <DoublePendulum/>,
  flocking: <Flocking/>,
  followers: <Followers/>,
  theHorseInMotion: <TheHorseInMotion/>,
  speech2Text: <Speech2Text/>,
  watch: <Watch/>,
};
const optionKeys = Object.keys(options);

const Stats = () => (<div style={{
  position: 'fixed',
  top: 0,
  right: 0,
  textAlign: 'right',
  minWidth: '100px'
}}>
  <Fps style={{display: 'block'}}/>
  <DocInfo style={{margin: '5px'}}/>
</div>);

const App = () => {
  const [select, selectUI] = useOrgan(Select, optionKeys);

  return <>
    <div style={{marginBottom: '10px'}}>{ selectUI }</div>
    <Stats/>
    { options[select] }
  </>;
};

GanicDOM.render(<App />, document.getElementById('app'), GanicDomAir);
