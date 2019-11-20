/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import GanicDOM from "ganic-dom";
import { useOrgan } from "ganic-usex";
import { Counter, LazyUpdate, useSuperLongList } from "./studio";

const App = () => {
  const [count, counterUI] = useOrgan(Counter);
  const list = useSuperLongList(count, 500, 125);
  const lazyUpdateUI = useOrgan(LazyUpdate, count);

  return (
    <>
      {list}
      {counterUI}
      {lazyUpdateUI}
    </>
  );
};

GanicDOM.render(<App />, document.getElementById("app"));
