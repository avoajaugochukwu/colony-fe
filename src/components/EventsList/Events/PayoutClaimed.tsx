import React from "react";

import { AllEventType } from "../../../types";

import Avatar from "../Avatar/Avatar";

import styles from "./Events.module.css";

interface PayoutClaimedProp {
  payoutClaimed: AllEventType;
}

const PayoutClaimed: React.FC<PayoutClaimedProp> = ({ payoutClaimed }) => {
  return (
    <div className={styles.ListItemWrapper}>
      <div className={styles.ListItem}>
        <Avatar address={payoutClaimed.eventLog.address} />
        <div className={styles.ListItemDetails}>
          <p className={styles.ListItemDescription}>
            User{" "}
            <span className={styles.Bold}>
              {payoutClaimed.parsedLog.userAddress}
            </span>{" "}
            claimed{" "}
            <span className={styles.Bold}>
              {payoutClaimed.parsedLog.convertedAmount}
            </span>{" "}
            <span className={styles.Bold}>
              {payoutClaimed.parsedLog.tokenSymbol}
            </span>{" "}
            payout from pot{" "}
            <span className={styles.Bold}>
              {payoutClaimed.parsedLog.newFundingPotId}
            </span>
            .
          </p>
          <p className={styles.Date}>
            {payoutClaimed.parsedLog.date.displayDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayoutClaimed;
