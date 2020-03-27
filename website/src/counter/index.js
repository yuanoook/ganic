/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useOrgan } from 'ganic-usex';
import { Counter, LazyUpdate, useSuperLongList } from './studio';

const CounterApp = props => {
  const [count, counterUI] = useOrgan(Counter);
  const list = useSuperLongList(count);
  const lazyUpdateUI = useOrgan(LazyUpdate, count);

  return (
    <div class="counter-app">
      <div {...props}>
        {list}
        {counterUI}
        {lazyUpdateUI}
      </div>
    </div>
  );
};

export default CounterApp;
