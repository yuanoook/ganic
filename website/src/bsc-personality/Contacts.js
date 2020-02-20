/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import useInput from '../shared/useInput';
import useInputRadios from '../shared/useInputRadios';

const Contacts = () => {
  const [phone, PhoneInput] = useInput('15313198832', 'bsc-personal-contact-phone');
  const [wechat, WechatInput] = useInput('15313198832', 'bsc-personal-contact-wechat');
  const [email, EmailInput] = useInput('yuanoook@gmail.com', 'bsc-personal-contact-email');

  return <div style="margin-top: 30px">
    为方便获取反馈，请您留下联系方式。
    <br/>
    电话：<PhoneInput type="tel" value={ phone }/>
    &nbsp; &nbsp;
    微信：<WechatInput style="max-width: 120px;" value={ wechat }/> 
    &nbsp; &nbsp;
    邮箱：<EmailInput type="email" value={ email }/>
  </div>
}

export default Contacts;
