/* eslint-disable no-unused-vars */

import Ganic from "ganic";

const List = ({length, render, start}) => {
  let items = []
  const end = start + length;
  for (let i = start; i < end; i++) {
    const [key, item] = render(i);
    items.push(<div key={key}>{ item }</div>);
  }
  return <div>{ items }</div>;
};

const powerChunk = ({length, render, start, by}) => {
  let chunks = [];
  const end = start + length;
  const size = Math.floor(length / by);
  for(let i = start; i< end; i+=size) {
    chunks.push({
      length: Math.min(size, end-i),
      render,
      start: i,
      by
    });
  }
  return chunks;
};

const PowerList = ({length, render, start = 0, by = 3}) => {
  if (length <= by) {
    return <List length={length} render={render} start={start}/>;
  }
  const chunks = powerChunk({length, render, start, by})
    .map(chunk => <PowerList {...chunk}/>);
  return <div>{chunks}</div>;
};

export default PowerList;
