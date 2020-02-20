/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import useInput from '../shared/useInput';
import useInputRadios from '../shared/useInputRadios';

const PersonalInfo = () => {
  const [name, NameInput] = useInput('袁会明', 'bsc-personal-info-name');
  const [birthmonth, BirthmonthInput] = useInput('1991-08', 'bsc-personal-info-birthmonth');
  const [gender, GenderRadios] = useInputRadios({
    male: '男',
    female: '女'
  }, 'male', 'bsc-personal-info-gender');

  return <div style="margin-top: 30px">
    姓名：<NameInput value={ name }/>
    &nbsp; &nbsp;
    性别：
    <GenderRadios value={ gender }/>
    &nbsp; &nbsp;
    生月：<BirthmonthInput type="month" value={ birthmonth }/> 
  </div>
}

export default PersonalInfo;
