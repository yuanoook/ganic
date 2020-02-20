/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import { useOrgan } from "ganic-usex";
import DocTitle from "./DocTitle";
import PersonalInfo from "./PersonalInfo";
// import Contacts from "./Contacts";
import Introduction from "./Introduction";
import TestGuide from "./TestGuide";

const BSCPersonalityReport = () => <>
  <DocTitle></DocTitle>
  <hr/>
  <PersonalInfo></PersonalInfo>
  <hr/>
  {/* <Contacts></Contacts>
  <hr/> */}
  <Introduction></Introduction>
  <hr/>
  <TestGuide></TestGuide>

  <hr/>
  {/* <MainTest>
    <ZTest></ZTest>
    <YTest></YTest>
    <XTest></XTest>
  </MainTest> */}
</>;

export default BSCPersonalityReport;
