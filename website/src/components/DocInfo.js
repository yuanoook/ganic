/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useDocument } from 'ganic-pandora';

const DocInfo = props => {
  const { count } = useDocument();
  return <div style={{
    display: 'inline-block',
    fontSize: '0.7em',
    ...props && props.style
  }}>
    <b>All Elements: { count }</b>
  </div>;
}

export default DocInfo;
