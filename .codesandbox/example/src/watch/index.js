/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import {
  useState,
  useInterval,
} from "ganic-usex";

const useTime = () => {
  const [date, setDate] = useState(() => new Date);
  useInterval(() => setDate(new Date), 500);
  return [
    date.getSeconds(),
    date.getMinutes(),
    date.getHours(),
  ];
};

const needleBaseStyle = {
  position: 'absolute',
  bottom: 0,
  left: '2.5px',
  width: '5px',
  height: '100px',
  background: 'red',
  borderRadius: '100%',
  transformOrigin: 'bottom center',
};

const watchPlateStyle = {
  margin: '50px auto',
  width: '300px',
  height: '300px',
  background: 'black',
  position: 'relative',
  borderRadius: '100%',
};

const watchCenterStyle = {
  width: 0,
  height: 0,
  position: 'absolute',
  margin: 'auto',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const Needle = ({ deg, style }) => <div style={{
  ...needleBaseStyle,
  transform: `rotate(${ deg }deg)`,
  ...style,
}}></div>;

const Second = ({ second }) => <Needle deg={second * 6}/>
const Minute = ({ minute }) => <Needle deg={minute * 6} style={{height: '70px', background: 'yellow'}}/>
const Hour = ({ hour }) => <Needle deg={(hour / 2) * 60} style={{height: '50px', background: 'white'}}/>

const Watch = props => {
  const [second, minute, hour] = useTime();

  return <div {...props}>
    <div style={watchPlateStyle}>
      <div style={watchCenterStyle}>
        <Hour hour={hour}/>
        <Minute minute={minute}/>
        <Second second={second}/>
      </div>
    </div>
  </div>
}

export default Watch;
