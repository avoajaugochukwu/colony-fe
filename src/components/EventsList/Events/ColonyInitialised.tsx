import React from "react";

import { AllEventType } from "../../../types";

import Avatar from "../Avatar/Avatar";

import styles from "./Events.module.css";

interface ColonyInitialisedProp {
  colonyInitialized: AllEventType;
}

const ColonyInitialised: React.FC<ColonyInitialisedProp> = ({
  colonyInitialized,
}) => {
  return (
    <div className={styles.ListItemWrapper}>
      <div className={styles.ListItem}>
        <Avatar address={colonyInitialized.eventLog.address} />
        <div className={styles.ListItemDetails}>
          <p className={styles.ListItemDescription}>
            Congratulations! It's a beautiful baby colony!
          </p>
          <p className={styles.Date}>
            {colonyInitialized.parsedLog.date.displayDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColonyInitialised;
