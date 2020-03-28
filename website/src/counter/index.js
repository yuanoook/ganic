/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useOrgan } from 'ganic-usex';
import { Counter, LazyUpdate } from './studio';
import SuperLongList from './SuperLongList';

const CounterApp = () => {
  const [count, counterUI] = useOrgan(Counter);
  const lazyUpdateUI = useOrgan(LazyUpdate, count);

  return (
    <div class="counter-app">
      <div>
        <SuperLongList length={count}/>
      </div>
      <div>
        {counterUI}
        {lazyUpdateUI}
      </div>
    </div>
  );
};

export default CounterApp;
