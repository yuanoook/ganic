import Ganic from 'ganic';
import { red2green } from '../shared/hslColor';
import { keepInRange } from '../shared/utils';

const barStyle = {
  width: 140,
  height: 14,
  background: 'lightgray',
  display: 'inline-block',
  verticalAlign: 'middle',
  overflow: 'hidden',
  position: 'relative',
  marginRight: 10,
};

const textStyle = {
  fontSize: '.7em',
  position: 'absolute',
  height: '100%',
  top: '-.2em',
};

const prefixStyle = {
  ... textStyle,
  left: '.5em',
};

const postfixStyle = {
  ... textStyle,
  right: '.5em',
};

const mergeStyle = (style, toMerge) => toMerge ? ({...style, ...toMerge}) : style;

const Progress = ({ value, prefix, postfix, style }) => (
  <div style={mergeStyle(barStyle, style)}>
    { prefix && <span style={prefixStyle}>{ prefix }</span> }
    <div style={{
      width: `${ keepInRange(value, 0, 100) }%`,
      height: '100%',
      background: red2green(value),
    }}></div>
    { postfix && <span style={postfixStyle}>{ postfix }</span> }
  </div>
);

export default Progress;
