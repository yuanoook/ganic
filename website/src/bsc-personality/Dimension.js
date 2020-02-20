/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import TestItem from './TestItem';

const Dimension = ({
  rawData,
  name,
  key,
}) => {
  const items = rawData.split('\n').map(x => x.trim())
  .filter(x => x)
  .map(x => x.split(' '))
  .map(([left, right], index) =>
    <div
      class="bsc-dimension-item"
      style={{
        display: 'flex',
        marginBottom: `${20 * (0 + ((index+1) % 5 === 0) ? 1 : 0)}px`
      }}>
      <div style="width: 30px; padding: 3px 5px 0px;">{index + 1}</div>
      <TestItem
        style={{
          width: '100%',
          textAlign: 'center',
          border: 0
        }}
        key={left}
        name={`${key}-${index}`}
        left={left}
        right={right}
      />
    </div>
  );

  return <fieldset style="margin-bottom: 30px;">
    <legend>{name}</legend>
    { items }
  </fieldset>
}

export default Dimension;
