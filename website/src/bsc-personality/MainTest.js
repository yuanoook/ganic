/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import config from "./config"
import Dimension from './Dimension';

const MainTest = () => {
  const dimensions = [
    'moral',
    'drive',
    'pace'
  ].map(
    key => <Dimension key={key} {...config[key]}/>
  );

  return <div style="margin-top: 30px">
    <h1><center>正式测验</center></h1>
    { dimensions }
  </div>
}

export default MainTest;
