/* eslint-disable no-unused-vars */

import Ganic from "ganic";

const Report = () => {
  const name = localStorage['bsc-personal-info-name']

  return <div>
    亲爱的 {name}，<br/>

    你是一位，

    你的动机类型倾向于，

    你拥有快节奏的行为风格，

    在情绪表达方面，

    在人际交往中，

    在工作选择方面，

    你的毕生功课
  </div>
}

export default Report;