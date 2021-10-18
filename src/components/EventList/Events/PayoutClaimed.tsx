import React, { CSSProperties } from "react";

import { AllEventType } from "../../../types";

// import { getIcon } from '../../../utils';

interface PayoutClaimedProp {
  payoutClaimed: AllEventType;
}

const PayoutClaimed: React.FC<PayoutClaimedProp> = ({ payoutClaimed }) => {
  // console.log(payoutClaimed)
  // const avatar = getIcon(payoutClaimed.eventLog.address)
// console.log(avatar)
//   const imageStyle: CSSProperties = avatar
//     ? {
//         backgroundImage: `url(${avatar})`,
//         // if using a blockie, do pixelated image scaling
//         // imageRendering: avatarURL ? undefined : 'pixelated',
//       }
//     : {};


  return <div>
    
    <p>
      User {payoutClaimed.parsedLog.userAddress} claimed 
      {payoutClaimed.parsedLog.convertedAmount} 
      {payoutClaimed.parsedLog.tokenSymbol} payout 
      from pot {payoutClaimed.parsedLog.newFundingPotId}
    </p>
    <p className="date">{payoutClaimed.parsedLog.date.displayDate}</p>
  </div>;
};

export default PayoutClaimed;
