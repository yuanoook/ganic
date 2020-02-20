/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import { useOrgan } from "ganic-usex";
import DocTitle from "./DocTitle";
import PersonalInfo from "./PersonalInfo";
import Introduction from "./Introduction";
import TestGuide from "./TestGuide";
import MainTest from "./MainTest";
// import Report from "./Report";

const BSCPersonalityReport = () => {
  return <>
    <DocTitle></DocTitle>
    <hr/>
    <PersonalInfo></PersonalInfo>
    <hr/>
    <Introduction></Introduction>
    <hr/>
    <TestGuide></TestGuide>
    <hr/>
    <MainTest></MainTest>

    <center><button style={{
      border: '1px solid',
      borderRadius: '10px',
      padding: '10px',
      width: '200px',
      marginBottom: '300px'
    }}>查看报告</button></center>

    {/* <Report></Report> */}
  </>
};

export default BSCPersonalityReport;
